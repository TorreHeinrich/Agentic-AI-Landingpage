import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Building2, MessageSquare, X, Check, Trash2, CalendarRange } from 'lucide-react';

interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  notes?: string;
  createdAt: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [selectedService, setSelectedService] = useState('Agentic AI Erstgespräch (30 Min)');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTab, setCurrentTab] = useState<'book' | 'my-bookings'>('book');

  // Generate nearest 14 days for appointment selection
  const [availableDates, setAvailableDates] = useState<{ label: string; value: string; isWeekend: boolean }[]>([]);

  useEffect(() => {
    // Generate dates dynamically starting from 2026-06-05
    const list = [];
    const baseDate = new Date(); // Fallback to now, but we can set 2026-06-05 specifically
    baseDate.setFullYear(2026, 5, 5); // Month is 5 (June is index 5)

    for (let i = 1; i <= 14; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const formattedValue = d.toISOString().split('T')[0];
      const formattedLabel = d.toLocaleDateString('de-DE', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
      });
      list.push({ label: formattedLabel, value: formattedValue, isWeekend });
    }
    setAvailableDates(list);
    // Auto select first workday
    const firstWorkday = list.find(item => !item.isWeekend);
    if (firstWorkday) setSelectedDate(firstWorkday.value);

    // Load existing bookings from localStorage
    const saved = localStorage.getItem('torre_ehlers_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing bookings', e);
      }
    }
  }, []);

  const timeSlots = [
    '09:30', '10:30', '11:30', '13:00', '14:00', '15:00', '16:30'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !email) {
      return;
    }

    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      name,
      email,
      company,
      notes,
      createdAt: new Date().toISOString(),
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('torre_ehlers_bookings', JSON.stringify(updatedBookings));

    setShowSuccess(true);
    // Reset fields except contact info for convenience
    setNotes('');
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentTab('my-bookings');
    }, 2500);
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('torre_ehlers_bookings', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-bg/85 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      />

      {/* Content Container */}
      <div className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-brand-bg/60">
          <div>
            <h3 className="text-xl font-headline font-bold text-gradient">Session buchen</h3>
            <p className="text-xs text-on-surface-variant">Sichern Sie sich Ihren exklusiven Beratungstermin</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs switcher */}
        <div className="flex border-b border-white/10 p-2 gap-2 bg-[#121212]">
          <button
            onClick={() => setCurrentTab('book')}
            className={`flex-1 py-2.5 text-xs font-headline font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              currentTab === 'book' 
                ? 'bg-brand-primary text-black font-bold shadow-lg shadow-brand-primary/20' 
                : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
            }`}
          >
            <CalendarRange size={15} />
            Termin vereinbaren
          </button>
          <button
            onClick={() => setCurrentTab('my-bookings')}
            className={`flex-1 py-2.5 text-xs font-headline font-semibold rounded-lg flex items-center justify-center gap-2 transition-all relative ${
              currentTab === 'my-bookings' 
                ? 'bg-brand-primary text-black font-bold shadow-lg shadow-brand-primary/20' 
                : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
            }`}
          >
            <Clock size={15} />
            Meine Buchungen
            {bookings.length > 0 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand-secondary text-brand-bg text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {bookings.length}
              </span>
            )}
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-brand-secondary/20 rounded-full flex items-center justify-center mb-6 border border-brand-secondary/45 text-brand-secondary">
                <Check size={36} className="stroke-[3]" />
              </div>
              <h4 className="text-2xl font-headline font-bold text-white mb-2">Termin erfolgreich angefragt!</h4>
              <p className="text-sm text-on-surface-variant max-w-md">
                Vielen Dank! Ihre Anfrage für das <span className="text-brand-secondary font-semibold">{selectedService}</span> am {availableDates.find(d => d.value === selectedDate)?.label || selectedDate} um {selectedTime} Uhr wurde für Torre Ehlers registriert.
              </p>
              <div className="mt-8 text-xs text-brand-secondary/80 animate-pulse font-mono">
                Weiterleitung zur Übersicht...
              </div>
            </div>
          ) : currentTab === 'book' ? (
            <form onSubmit={handleBooking} className="space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-headline font-bold tracking-wider text-brand-primary-light uppercase mb-2">
                  1. Fokusbereich & Beratungstyp
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Agentic AI Erstgespräch (30 Min)',
                    'Multi-Agenten Blueprint (60 Min)',
                    'Multimodale Content-Pipeline (45 Min)',
                    'Enterprise Tech-Stack Audit (60 Min)'
                  ].map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setSelectedService(srv)}
                      className={`p-3 text-left text-xs rounded-lg border transition-all flex items-center justify-between ${
                        selectedService === srv
                          ? 'border-brand-secondary bg-brand-secondary/15 text-white font-semibold'
                          : 'border-white/5 bg-[#141414] text-on-surface-variant hover:border-white/10 hover:text-white'
                      }`}
                    >
                      <span>{srv}</span>
                      {selectedService === srv && (
                        <div className="w-4 h-4 bg-brand-secondary rounded-full flex items-center justify-center text-brand-bg">
                          <Check size={10} className="stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date selection Grid */}
              <div>
                <label className="block text-xs font-headline font-bold tracking-wider text-brand-primary-light uppercase mb-2">
                  2. Datum auswählen
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {availableDates.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      disabled={item.isWeekend}
                      onClick={() => {
                        setSelectedDate(item.value);
                        setSelectedTime(''); // Reset time on date change
                      }}
                      className={`py-2 px-1 text-center rounded-lg transition-all flex flex-col items-center justify-center border text-xs relative ${
                        item.isWeekend 
                          ? 'border-transparent bg-transparent opacity-30 cursor-not-allowed'
                          : selectedDate === item.value
                            ? 'border-brand-primary bg-brand-primary/25 text-white font-bold'
                            : 'border-white/5 bg-[#141414] text-on-surface-variant hover:border-white/15 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-tight block opacity-60">
                        {item.label.split(',')[0]}
                      </span>
                      <span className="text-base font-headline font-bold mt-0.5">
                        {item.label.split(',')[1]?.trim().split('.')[0] || item.label}
                      </span>
                      <span className="text-[9px] block opacity-50">
                        {item.label.split(',')[1]?.trim().split('.')[1] || ''}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selection */}
              <div>
                <label className="block text-xs font-headline font-bold tracking-wider text-brand-primary-light uppercase mb-2">
                  3. Uhrzeit auswählen ({availableDates.find(d => d.value === selectedDate)?.label || 'Datum wählen'})
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 text-xs rounded-lg transition-all border ${
                        selectedTime === time
                          ? 'border-brand-secondary bg-brand-secondary/20 text-white font-semibold'
                          : 'border-white/5 bg-[#141414] text-on-surface-variant hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {time} Uhr
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-headline font-bold tracking-wider text-brand-primary-light uppercase">
                  4. Kontaktdaten hinterlegen
                </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                    <input
                      type="text"
                      required
                      placeholder="Ihr Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#141414] border border-white/5 rounded-lg py-2.5 pl-9 pr-4 text-xs text-white placeholder-on-surface-variant/50 focus:outline-none focus:border-brand-primary focus:bg-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                    <input
                      type="email"
                      required
                      placeholder="E-Mail-Adresse *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#141414] border border-white/5 rounded-lg py-2.5 pl-9 pr-4 text-xs text-white placeholder-on-surface-variant/50 focus:outline-none focus:border-brand-primary focus:bg-[#1a1a1a] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="relative">
                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                    <input
                      type="text"
                      placeholder="Unternehmen / Organisation (optional)"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#141414] border border-white/5 rounded-lg py-2.5 pl-9 pr-4 text-xs text-white placeholder-on-surface-variant/50 focus:outline-none focus:border-brand-primary focus:bg-[#1a1a1a] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare size={14} className="absolute left-3 top-3 text-on-surface-variant/60" />
                    <textarea
                      placeholder="Gibt es spezifische Workflows oder Herausforderungen, die wir besprechen sollen? (optional)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full bg-[#141414] border border-white/5 rounded-lg p-2.5 pl-9 text-xs text-white placeholder-on-surface-variant/50 focus:outline-none focus:border-brand-primary focus:bg-[#1a1a1a] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action area */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || !name || !email}
                  className="w-full py-3.5 bg-brand-primary text-black font-headline text-xs font-extrabold rounded-lg hover:bg-brand-primary-light active:scale-98 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider"
                >
                  Terminanfrage abschicken
                </button>
                <p className="text-[10px] text-center text-on-surface-variant/60 mt-2">
                  * Erforderliche Felder. Nach Absenden erhalten Sie eine Simulation der Termineintragung.
                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-12 text-on-surface-variant/80">
                  <Calendar size={48} className="mx-auto mb-4 opacity-30 text-brand-primary-light" />
                  <p className="text-sm font-headline font-semibold">Bisher keine Termine gebucht</p>
                  <p className="text-xs max-w-sm mx-auto mt-2 opacity-70">
                    Wählen Sie den Reiter "Termin vereinbaren", um Ihr erstes Strategiegespräch mit Torre Ehlers einzutragen.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs font-headline font-bold text-brand-primary-light tracking-wide uppercase">
                    Aktive Anfragen ({bookings.length})
                  </div>
                  {bookings.map((b) => (
                    <div 
                      key={b.id}
                      className="p-4 bg-[#141414] border border-white/5 rounded-xl flex items-start justify-between gap-4 hover:border-white/10 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white font-headline">
                          {b.service}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-on-surface-variant font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} className="text-brand-secondary" />
                            {b.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-brand-secondary" />
                            {b.time} Uhr
                          </span>
                        </div>
                        <div className="text-[11px] text-on-surface-variant/85 pt-1">
                          <span className="font-semibold text-white/90">{b.name}</span>
                          {b.company && ` • ${b.company}`}
                          {b.email && ` (${b.email})`}
                        </div>
                        {b.notes && (
                          <div className="bg-[#0e0e0e] p-2 rounded text-[10px] text-on-surface-variant/70 border border-white/5 italic max-w-lg mt-2">
                            "{b.notes}"
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => deleteBooking(b.id)}
                        className="p-1 px-1.5 md:p-2 text-on-surface-variant hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0"
                        title="Termin absagen"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="p-3 bg-brand-secondary/5 rounded-xl border border-brand-secondary/10 flex items-center gap-3 text-xs text-brand-secondary">
                    <Check size={16} className="flex-shrink-0" />
                    <span>In einer produktiven Version würde dieser Termin direkt mit Torre Ehlers' Google Calendar synchronisiert.</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
