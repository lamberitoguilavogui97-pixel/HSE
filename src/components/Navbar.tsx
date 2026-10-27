import React from 'react';
import { ShieldCheck, HardHat, Phone, Sparkles, Building2, TrendingUp, BookOpen, MapPin } from 'lucide-react';

interface NavbarProps {
  activeTab: 'client-view' | 'cockpit' | 'ai-tools' | 'diagnostic';
  setActiveTab: (tab: 'client-view' | 'cockpit' | 'ai-tools' | 'diagnostic') => void;
  onOpenCorridorMap: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenCorridorMap }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
      {/* Top micro-bar */}
      <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-semibold flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span>CORRIDOR MINIER SIMANDOU (GUINÉE) • ACCOMPAGNEMENT À LA CONFORMITÉ AUX EXIGENCES HSE DES DONNEURS D'ORDRE</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <a
            href="tel:+224624405552"
            className="flex items-center gap-1 hover:text-slate-800 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> Hotline : +224 624405552
          </a>
          <span className="hidden md:inline text-slate-700">|</span>
          <span className="hidden md:flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Morebaya • Beyla
          </span>
          <button 
            onClick={onOpenCorridorMap}
            className="underline hover:text-slate-800 transition-colors cursor-pointer"
          >
            Carte Tracé 650 km
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('client-view')}>
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 shadow-sm font-bold">
              <HardHat className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white font-heading">
                  SIMADOU <span className="text-amber-400">SAFE MINE</span> HSE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-slate-800 text-amber-300 border border-amber-500/30 rounded">
                  Guinée
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Cabinet Conseil &amp; Solutions PME Corridor Minier
              </p>
            </div>
          </div>

          {/* Nav buttons */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('client-view')}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'client-view'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Offre &amp; Tarifs PME</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'diagnostic'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Diagnostic Express</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-tools')}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ai-tools'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Générateur HSE</span>
              <span className="md:hidden">IA HSE</span>
            </button>

            <button
              onClick={() => setActiveTab('cockpit')}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'cockpit'
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/50'
                  : 'text-emerald-400 hover:text-white hover:bg-slate-800 border border-emerald-500/30'
              }`}
              title="Accéder au Cockpit de Gestion et Outils de Prospection (Objectif 20 000 $/mois)"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Cockpit Cabinet (20k$)</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
