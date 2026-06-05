import { X } from 'lucide-react';

interface InfoModalProps {
  type: 'impressum' | 'datenschutz' | null;
  onClose: () => void;
}

export default function InfoModal({ type, onClose }: InfoModalProps) {
  if (!type) return null;

  const isImpressum = type === 'impressum';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-headline font-bold text-gradient">
            {isImpressum ? 'Impressum' : 'Datenschutzerklärung'}
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-on-surface-variant leading-relaxed">
          {isImpressum ? (
            <>
              <section className="space-y-1">
                <h4 className="font-bold text-white text-sm">Angaben gemäß § 5 TMG</h4>
                <p>Torre Ehlers</p>
                <p>Agentic AI Expert & Consultant</p>
                <p>Musterstraße 42</p>
                <p>10115 Berlin</p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-white text-sm">Kontakt</h4>
                <p>Telefon: +49 (0) 123 456789</p>
                <p>E-Mail: kontakt@torre-ehlers.de</p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-white text-sm">Umsatzsteuer-ID</h4>
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                <p>DE 999 999 999</p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white text-sm">Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h4>
                <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h4 className="font-bold text-white text-sm">1. Datenschutz auf einen Blick</h4>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white text-sm">2. Datenerfassung auf dieser Website</h4>
                <p>
                  <strong>Wie erfassen wir Ihre Daten?</strong>
                  <br />
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in unser Buchungsformular eingeben.
                  <br /><br />
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
                <p>
                  <strong>Wofür nutzen wir Ihre Daten?</strong>
                  <br />
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Ihre Buchungsdaten werden ausschließlich lokal verarbeitet (bzw. im localStorage Ihres Browsers gespeichert).
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-white text-sm">3. Ihre Rechte</h4>
                <p>
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-brand-bg/40 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-headline text-xs rounded-lg transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
