import { useState, useEffect } from 'react';
import { 
  Network, 
  Cpu, 
  Video, 
  Layers, 
  Building2, 
  Terminal, 
  Rocket, 
  CheckCircle2, 
  Calendar, 
  Cloud, 
  Shield, 
  TrendingUp, 
  Code2, 
  ChevronRight, 
  ArrowRight, 
  Zap, 
  Linkedin, 
  Github, 
  Play, 
  RefreshCw, 
  Award,
  Sparkles
} from 'lucide-react';
import NetworkCanvas from './components/NetworkCanvas';
import BookingModal from './components/BookingModal';
import InfoModal from './components/InfoModal';

// Mock logs for our interactive agent simulator
const AGENT_SIMULATIONS = {
  scout: {
    name: "Autonome Markt-Analyse",
    role: "Lead Generation & Trend Scout",
    icon: Cpu,
    efficiency: "99.4%",
    status: "active",
    logs: [
      "[INFO] Starte Marktanalyst-Agent v4.2...",
      "[SCOUT] Durchsuche europäische Startup-Datenbanken nach Ineffizienzen...",
      "[SCOUT] 12 relevante Leads im Bereich Medienproduktion identifiziert.",
      "[LLM] Berechne Automatisierungspotenzial für Lead #3...",
      "[LLM] Generiere personalisierte Ansprache basierend auf Tech-Stack...",
      "[SCOUT] Schreibe qualifizierte Opportunities in lokales CRM-System...",
      "[INFO] Task erfolgreich abgeschlossen. Schlafe für 15 Min."
    ]
  },
  synthesizer: {
    name: "Medien-Synthese",
    role: "Multimodale Video- & Asset Pipeline",
    icon: Video,
    efficiency: "99.8%",
    status: "active",
    logs: [
      "[INFO] Initialisiere Mediensynthese Engine...",
      "[SYNTH] Lese Rohdaten aus Kampagnen-Briefing...",
      "[AI] Generiere Bild-Prompts für Midjourney-Schnittstelle...",
      "[AI] Render-Vorgang für 4K-Marketing-Banner gestartet...",
      "[SYNTH] Synchronisiere generierte Audiotrack-Hüllkurven...",
      "[SYNTH] Führe Upscaling durch (SDR auf HDR60)...",
      "[INFO] Output-Asset bereitgestellt: synthetic_ad_v2.mp4"
    ]
  },
  auditor: {
    name: "Alignment-Auditor",
    role: "EU AI Act Compliance & Guardrails",
    icon: Layers,
    efficiency: "100.0%",
    status: "idle",
    logs: [
      "[INFO] Lade Compliance-Regelwerk (Stand EU AI Act 2026)...",
      "[AUDIT] Untersuche generierte Marketing-Texte auf Bias...",
      "[GUARD] Warnung: Phrase 'unbegrenzte Garantie' korrigiert zu 'geprüfter Standard'...",
      "[AUDIT] Berechne Halluzinations-Score (Score: 0.02 - Ausgezeichnet)...",
      "[AUDIT] Erstelle automatischen Compliance-Prüfbericht...",
      "[INFO] Freigabe erteilt für Enterprise-Deployment."
    ]
  }
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeLegalType, setActiveLegalType] = useState<'impressum' | 'datenschutz' | null>(null);
  
  // Interactive Agent Simulator States
  const [selectedAgentKey, setSelectedAgentKey] = useState<'scout' | 'synthesizer' | 'auditor'>('scout');
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);

  // Scroll effect style for navbar
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger typewriter effect for logs
  useEffect(() => {
    const activeSimulation = AGENT_SIMULATIONS[selectedAgentKey];
    setSimulatedLogs([activeSimulation.logs[0]]);
    setLogIndex(1);
    setIsSimulating(true);
  }, [selectedAgentKey]);

  useEffect(() => {
    if (!isSimulating) return;
    const activeSimulation = AGENT_SIMULATIONS[selectedAgentKey];
    if (logIndex >= activeSimulation.logs.length) {
      setIsSimulating(false);
      return;
    }

    const timer = setTimeout(() => {
      setSimulatedLogs(prev => [...prev, activeSimulation.logs[logIndex]]);
      setLogIndex(prev => prev + 1);
    }, 1200 + Math.random() * 800);

    return () => clearTimeout(timer);
  }, [logIndex, isSimulating, selectedAgentKey]);

  const restartSimulation = () => {
    setLogIndex(0);
    setSimulatedLogs([]);
    setIsSimulating(true);
  };

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-fg selection:bg-brand-primary-light/20 relative font-sans antialiased overflow-x-hidden border-t-4 border-brand-primary">
      
      {/* Background cyber grid */}
      <div className="fixed inset-0 grid-bg z-[-1] pointer-events-none" />

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3.5 bg-brand-bg/85 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'py-5 bg-transparent border-b border-white/5'
      }`}>
        <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-9 h-9 border-2 border-brand-primary rounded-full flex items-center justify-center text-brand-primary font-serif italic text-base font-bold group-hover:scale-105 transition-transform duration-300">
              T
            </div>
            <span className="text-lg font-headline font-extrabold tracking-tight text-white group-hover:text-brand-primary transition-colors">
              Torre Ehlers
            </span>
          </a>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-9">
            <button 
              onClick={() => scrollToSection('expertise')} 
              className="text-xs font-headline font-semibold text-on-surface-variant hover:text-brand-primary transition-colors uppercase tracking-wide cursor-pointer"
            >
              Expertise
            </button>
            <button 
              onClick={() => scrollToSection('relevanz')} 
              className="text-xs font-headline font-semibold text-on-surface-variant hover:text-brand-primary transition-colors uppercase tracking-wide cursor-pointer"
            >
              Relevanz
            </button>
            <button 
              onClick={() => scrollToSection('innovation')} 
              className="text-xs font-headline font-semibold text-on-surface-variant hover:text-brand-primary transition-colors uppercase tracking-wide cursor-pointer"
            >
              Innovation
            </button>
            <button 
              onClick={() => scrollToSection('kontakt')} 
              className="text-xs font-headline font-semibold text-on-surface-variant hover:text-brand-primary transition-colors uppercase tracking-wide cursor-pointer"
            >
              Kontakt
            </button>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-light text-black font-headline text-xs font-bold rounded-full hover:scale-103 hover:shadow-lg hover:shadow-brand-primary/25 active:scale-95 transition-all cursor-pointer"
            >
              Termin buchen
            </button>
          </div>

        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-36 md:pt-48 pb-20 md:pb-28 px-6 overflow-hidden">
        
        {/* Animated fluid canvas backdrop */}
        <NetworkCanvas />

        {/* Ambient neon backdrop light overlay */}
        <div className="hero-glow pointer-events-none" />

        <div className="max-w-[1240px] mx-auto relative z-10 text-center">
          
          {/* Status availability badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border-white/10 mb-8 animate-fade-in shadow-inner">
            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
            <span className="text-[10px] font-headline font-extrabold text-brand-secondary uppercase tracking-widest">
              Available for Q3 / Q4 2026
            </span>
          </div>

          {/* Main Title display */}
          <h1 className="text-4xl md:text-[56px] font-serif italic font-normal leading-tight mb-7 tracking-tight">
            <span className="text-gradient font-serif italic">Die Ära der statischen KI ist vorbei.</span>
            <br />
            <span className="text-white mt-3 block font-headline font-black not-italic text-3xl md:text-[52px]">Willkommen bei Agentic AI.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm md:text-base text-on-surface-variant/90 mb-11 leading-relaxed font-normal">
            Autonome Multi-Agenten-Systeme &amp; multimodale Medienproduktion für Enterprise-Prozesse.
            Konzipiert, implementiert und nahtlos integriert von Torre Ehlers.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="group relative px-7 py-3.5 bg-brand-primary hover:bg-brand-primary-light text-black font-headline text-xs font-extrabold rounded-lg overflow-hidden transition-all shadow-xl shadow-brand-primary/10 hover:shadow-brand-primary/20 hover:scale-102 flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>Jetzt Gespräch vereinbaren</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('expertise')}
              className="px-7 py-3.5 border border-white/15 text-white/90 hover:text-white font-headline text-xs font-semibold rounded-lg hover:bg-white/5 hover:border-white/25 transition-all w-full sm:w-auto cursor-pointer"
            >
              Expertise ansehen
            </button>
          </div>

        </div>
      </header>

      {/* CORE STATEMENT QUOTE SECTION */}
      <section className="py-20 px-6 bg-brand-surface-low/30 relative border-y border-white/5">
        <div className="max-w-[1240px] mx-auto text-center">
          
          {/* Tag Badges */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-14">
            <span className="flex items-center gap-2 px-3.5 py-1.5 glass-card rounded-full text-xs text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              AI Consultant
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 glass-card rounded-full text-xs text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
              Agentic AI Expert
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 glass-card rounded-full text-xs text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-tertiary" />
              Multimodal Content Creator
            </span>
          </div>

          {/* Quote Block */}
          <blockquote className="max-w-4xl mx-auto font-serif text-lg sm:text-2xl md:text-3xl leading-relaxed text-white italic font-medium">
            "Während der Markt noch versucht, generative KI in isolierte Workflows zu pressen, verschiebt sich der Fokus längst von <span className="text-brand-primary font-semibold font-serif">'KI als Werkzeug'</span> zu <span className="text-brand-secondary font-semibold font-serif">'KI als autonome Belegschaft'</span>."
          </blockquote>

        </div>
      </section>

      {/* EXPERTISE GRID SECTION */}
      <section className="py-24 px-6 relative" id="expertise">
        <div className="max-w-[1240px] mx-auto">
          
          {/* Header intro */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[10px] font-headline font-extrabold text-brand-primary tracking-widest uppercase mb-3 block">
                Fokusbereiche
              </span>
              <h2 className="text-2xl md:text-3xl font-headline font-black text-white">
                Kern-Expertise für das Agentic Age
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-on-surface-variant/80 leading-relaxed font-normal">
              Spezialisierte Dienstleistungen zur Implementierung von autonom agierenden Systemen und intelligenten Workflows in bestehenden Unternehmensstrukturen.
            </p>
          </div>

          {/* Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="glass-card p-8 rounded-2xl group relative hover:border-brand-primary/45 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-7 border border-brand-primary/20 group-hover:bg-brand-primary/20 transition-all text-brand-primary-light">
                  <Cpu size={22} />
                </div>
                <h3 className="text-base sm:text-lg font-headline font-extrabold text-white mb-3">
                  Agentic AI &amp; Autonome Workflows
                </h3>
                <p className="text-xs text-on-surface-variant/85 leading-relaxed mb-6">
                  Design und Implementierung von Multi-Agenten-Systemen. Fokus auf radikale Effizienz durch selbststeuernde Task-Execution auf Enterprise-Niveau.
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/5">
                <li className="flex items-center gap-2.5 text-xs text-white/90">
                  <CheckCircle2 size={14} className="text-brand-secondary flex-shrink-0" />
                  <span>Auto-GPT Architectures</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs text-white/90">
                  <CheckCircle2 size={14} className="text-brand-secondary flex-shrink-0" />
                  <span>LangChain / CrewAI Flows</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-8 rounded-2xl group relative hover:border-brand-secondary/45 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-brand-secondary/15 rounded-xl flex items-center justify-center mb-7 border border-brand-secondary/20 group-hover:bg-brand-secondary/25 transition-all text-brand-secondary">
                  <Video size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-headline font-extrabold text-white mb-3">
                  Multimodale Medienproduktion
                </h3>
                <p className="text-xs text-on-surface-variant/85 leading-relaxed mb-6">
                  Orchestrierung von Bild, Ton und Text. Self-optimizing Content, der durch generative Pipelines in Echtzeit skaliert und die Produktionskosten senkt.
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/5">
                <li className="flex items-center gap-2.5 text-xs text-white/90">
                  <CheckCircle2 size={14} className="text-brand-secondary flex-shrink-0" />
                  <span>Synthetic Media Pipelines</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs text-white/90">
                  <CheckCircle2 size={14} className="text-brand-secondary flex-shrink-0" />
                  <span>Dynamic Asset Generation</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-8 rounded-2xl group relative hover:border-brand-tertiary/45 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-brand-tertiary/10 rounded-xl flex items-center justify-center mb-7 border border-brand-tertiary/20 group-hover:bg-brand-tertiary/20 transition-all text-brand-tertiary">
                  <Layers size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-headline font-extrabold text-white mb-3">
                  Strategische Beratung &amp; Transformation
                </h3>
                <p className="text-xs text-on-surface-variant/85 leading-relaxed mb-6">
                  Tech-Expertise trifft Business-Strategie. Begleitung von C-Level und Teams durch den strukturellen Wandel zur autonomen KI-Agentur.
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/5">
                <li className="flex items-center gap-2.5 text-xs text-white/90">
                  <CheckCircle2 size={14} className="text-brand-secondary flex-shrink-0" />
                  <span>AI Governance Frameworks</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs text-white/90">
                  <CheckCircle2 size={14} className="text-brand-secondary flex-shrink-0" />
                  <span>Skill-Gap Analysis &amp; Trainings</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* VALUE PROPOSITION WITH INTERACTIVE AGENT WORKSPACE PANEL */}
      <section className="py-24 px-6 bg-brand-surface-low/20 border-y border-white/5" id="relevanz">
        <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text Block */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <h2 className="text-2xl sm:text-4xl font-headline font-black text-white leading-tight">
                Sofortige Marktrelevanz &amp; Innovationsführerschaft
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-4 leading-relaxed">
                Der Wechsel zu agierenden KI-Infrastrukturen sichert Ihnen den entscheidenden Schritt Vorsprung auf dem Markt.
              </p>
            </div>

            <div className="space-y-8">
              
              {/* Item 1 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-11 h-11 glass-card rounded-full flex items-center justify-center border-brand-primary/20 text-brand-primary group-hover:border-brand-primary transition-all">
                  <Building2 size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-headline font-extrabold text-white mb-1">
                    Enterprise-Niveau
                  </h4>
                  <p className="text-xs text-on-surface-variant/85 leading-relaxed">
                    Sicherheitsfokus, absolute DSGVO-Konformität und Skalierbarkeit für komplexe Unternehmensstrukturen. Keine bloßen Spielereien, sondern hochgradig produktive Systeme.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-11 h-11 glass-card rounded-full flex items-center justify-center border-brand-secondary/20 text-brand-secondary group-hover:border-brand-secondary transition-all">
                  <Terminal size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-headline font-extrabold text-white mb-1">
                    Schnittstellen-Kompetenz
                  </h4>
                  <p className="text-xs text-on-surface-variant/85 leading-relaxed">
                    Nahtlose Integration moderner LLMs in bereits bestehende Tech-Stacks und Legacy-Software-Systeme über hochperformante API-First Strategien.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-11 h-11 glass-card rounded-full flex items-center justify-center border-brand-tertiary/20 text-brand-tertiary group-hover:border-brand-tertiary transition-all">
                  <Rocket size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-headline font-extrabold text-white mb-1">
                    Zukunftssicher
                  </h4>
                  <p className="text-xs text-on-surface-variant/85 leading-relaxed">
                    Strategischer Fokus auf Agentic AI-Trends, bevor diese den breiten Massenmarkt erreichen. Erwirtschaften Sie Ihren Wettbewerbsvorteil durch frühzeitige Adaption.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Interactive Simulator Panel */}
          <div className="w-full lg:w-1/2" id="innovation">
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
              
              {/* Graphic visual Header with image and stats overlay */}
              <div className="relative aspect-[16/10] overflow-hidden group">
                <img 
                  alt="Agentic AI Command Center Visualization" 
                  className="w-full h-full object-cover opacity-50 group-hover:scale-103 transition-transform duration-[1200ms]" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsKoyKHUR4_tSgDcENWPG53ncIy9VWBVRvM_ka18HwkEuY-UR0Yalw8LxIuCGW_4sFE9GGCKYCY6J2_Hv1AQxPYrbdhB_nGPPK9G7UPuqrr0coezLQ96AyED1qqWy0HBKXr9N3T4ZfdqkxvJ1pvNY66DIdfmuFV9THSYaMd5wJwkKewLgeWuwDxBU4w09rHHRwNCFcDtLs_pHciZwMOpUVk8H6EckhUobYixxmuQ-y4CPdXGUCZUVxWDZI6jG0D3r75t7a_psZ1EA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                
                {/* Floating live status widget */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-[#121212]/95 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg">
                    <p className="text-[10px] font-mono font-bold tracking-wider text-brand-secondary mb-1">SYSTEM STATUS</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-headline font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
                        Autonomous Agents Active
                      </span>
                      <span className="text-brand-secondary font-mono text-[11px] font-extrabold bg-brand-secondary/10 px-2 py-0.5 rounded border border-brand-secondary/20">
                        99.8% Efficiency
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Agent Console */}
              <div className="p-5 bg-[#0f0f0f] border-t border-white/5 space-y-4">
                
                {/* Switchers */}
                <div className="flex flex-col sm:flex-row gap-2 pb-2 border-b border-white/5">
                  {(Object.keys(AGENT_SIMULATIONS) as Array<keyof typeof AGENT_SIMULATIONS>).map((key) => {
                    const agent = AGENT_SIMULATIONS[key];
                    const IconComp = agent.icon;
                    const isActive = selectedAgentKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedAgentKey(key)}
                        className={`flex-1 py-2 px-3 rounded-lg text-left transition-all border flex items-center gap-2.5 ${
                          isActive 
                            ? 'bg-brand-primary/10 border-brand-primary text-white font-semibold' 
                            : 'bg-transparent border-transparent text-on-surface-variant hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <IconComp size={14} className={isActive ? 'text-brand-primary-light' : 'text-on-surface-variant'} />
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase font-bold tracking-tight block opacity-60">AGENT {key.toUpperCase()}</p>
                          <p className="text-[11px] truncate">{agent.name}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Monitor Screen */}
                <div className="bg-[#090909] rounded-lg border border-white/5 p-4 font-mono text-[11px] h-48 overflow-y-auto flex flex-col justify-between shadow-inner">
                  <div className="space-y-1.5 scrollbar-thin">
                    <p className="text-brand-tertiary"># Torre Ehlers Multi-Agent Orchestrator CLI</p>
                    {simulatedLogs.map((log, i) => {
                      let colorClass = 'text-white/80';
                      if (log.includes('[INFO]')) colorClass = 'text-brand-secondary/95';
                      if (log.includes('[SCOUT]') || log.includes('[SYNTH]') || log.includes('[AUDIT]')) colorClass = 'text-brand-primary-light';
                      if (log.includes('[LLM]') || log.includes('[AI]')) colorClass = 'text-violet-400';
                      if (log.includes('Warnung:')) colorClass = 'text-amber-400 font-semibold';
                      
                      return (
                        <p key={i} className={`leading-relaxed break-all ${colorClass}`}>
                          {log}
                        </p>
                      );
                    })}
                    {isSimulating && (
                      <div className="flex items-center gap-1 text-xs text-brand-secondary font-bold pt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-ping" />
                        <span className="animate-pulse">Agent verarbeitet...</span>
                      </div>
                    )}
                  </div>

                  {/* Actions within console */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-2 bg-[#090909]">
                    <div className="text-[10px] text-on-surface-variant/70">
                      Rolle: <span className="text-white">{AGENT_SIMULATIONS[selectedAgentKey].role}</span>
                    </div>
                    
                    <button
                      type="button"
                      onClick={restartSimulation}
                      className="p-1.5 text-[10px] text-brand-secondary hover:text-white hover:bg-white/5 rounded border border-brand-secondary/30 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw size={10} className={isSimulating ? 'animate-spin' : ''} />
                      Simulieren
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-center text-on-surface-variant/60 flex items-center justify-center gap-1.5">
                  <Sparkles size={11} className="text-brand-secondary" />
                  <span>Klicken Sie auf die Agenten, um unterschiedliche simulierte Workflows zu starten.</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* HORIZONTAL MARQUEE BANNER */}
      <div className="w-full py-5 bg-brand-secondary text-brand-bg hover:brightness-105 transition-all overflow-hidden whitespace-nowrap z-15 border-y border-brand-secondary/20 select-none">
        <div className="inline-flex gap-14 animate-marquee font-headline font-black uppercase text-xs sm:text-sm tracking-wider">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="stroke-[3]" /> 100% remote-ready
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="stroke-[3]" /> Flexibel einsetzbar (Vollzeit, Teilzeit, Strategisch)
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="stroke-[3]" /> 100% remote-ready
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="stroke-[3]" /> Flexibel einsetzbar (Vollzeit, Teilzeit, Strategisch)
          </span>
          {/* Duplicated for seamless translation cycle */}
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="stroke-[3]" /> 100% remote-ready
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="stroke-[3]" /> Flexibel einsetzbar (Vollzeit, Teilzeit, Strategisch)
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="stroke-[3]" /> 100% remote-ready
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="stroke-[3]" /> Flexibel einsetzbar (Vollzeit, Teilzeit, Strategisch)
          </span>
        </div>
      </div>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 px-6 relative" id="kontakt">
        <div className="max-w-[1000px] mx-auto text-center glass-card p-12 md:p-20 rounded-3xl border-white/5 shadow-2xl relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full filter blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/5 rounded-full filter blur-2xl pointer-events-none" />

          <h2 className="text-3xl md:text-[44px] font-headline font-black text-white leading-tight mb-5">
            Lassen Sie uns autonome Ökosysteme bauen.
          </h2>
          
          <p className="text-sm md:text-base text-on-surface-variant/90 mb-11 max-w-2xl mx-auto leading-relaxed">
            Lassen Sie uns in einem kurzen Videocall darüber sprechen, wie Agentic AI Ihre Geschäftsprozesse transformieren und die Effizienz steigern kann.
          </p>

          <button 
            onClick={() => setIsBookingOpen(true)}
            className="px-10 py-4.5 bg-brand-primary hover:bg-brand-primary-light text-black font-headline text-base font-extrabold rounded-full hover:scale-103 active:scale-97 shadow-2xl hover:shadow-brand-primary/30 transition-all uppercase tracking-wider cursor-pointer"
          >
            Termin buchen
          </button>

          {/* Subsystem logos row */}
          <div className="mt-16 flex justify-center gap-8 md:gap-11 grayscale opacity-45 group-hover:opacity-65 group-hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center gap-1" title="Sichere Cloud">
              <Cloud size={28} className="text-brand-secondary" />
              <span className="text-[9px] font-mono">Cloud native</span>
            </div>
            <div className="flex flex-col items-center gap-1" title="Sicherheit">
              <Shield size={28} className="text-brand-primary-light" />
              <span className="text-[9px] font-mono">Secured</span>
            </div>
            <div className="flex flex-col items-center gap-1" title="API First">
              <Code2 size={28} className="text-brand-tertiary" />
              <span className="text-[9px] font-mono">API-First</span>
            </div>
            <div className="flex flex-col items-center gap-1" title="Auto Scaling">
              <TrendingUp size={28} className="text-brand-secondary" />
              <span className="text-[9px] font-mono">Automated</span>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-16 px-6 border-t border-white/5 bg-brand-surface-low/10 z-10 relative">
        <div className="max-w-[1240px] mx-auto flex flex-col items-center justify-between text-center gap-8">
          
          <div className="text-xl font-headline font-extrabold tracking-tighter text-brand-primary brightness-110">
            Torre Ehlers
          </div>

          {/* External profiles and legal anchors */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-9 text-[11px] font-headline font-semibold text-on-surface-variant uppercase tracking-wider select-none">
            <button 
              onClick={() => setActiveLegalType('impressum')}
              className="hover:text-brand-secondary transition-colors cursor-pointer"
            >
              Impressum
            </button>
            <button 
              onClick={() => setActiveLegalType('datenschutz')}
              className="hover:text-brand-secondary transition-colors cursor-pointer"
            >
              Datenschutz
            </button>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 hover:text-brand-secondary transition-colors"
            >
              <Linkedin size={11} /> LinkedIn
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 hover:text-brand-secondary transition-colors"
            >
              <Github size={11} /> GitHub
            </a>
          </div>

          <p className="text-[11px] text-on-surface-variant/50 max-w-md font-normal leading-relaxed">
            © 2026 Torre Ehlers — Agentic AI Expert. Alle Rechte vorbehalten. 
            <br />
            Konzipiert für maximale Enterprise-Performance.
          </p>

        </div>
      </footer>

      {/* INTERACTIVE POPUP MODALS */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

      <InfoModal 
        type={activeLegalType} 
        onClose={() => setActiveLegalType(null)} 
      />

    </div>
  );
}
