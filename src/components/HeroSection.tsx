import React from 'react';
import { ShieldAlert, Award, CheckCircle2, ArrowRight, Truck, HardHat, Utensils, Shield, Wrench, FileCheck2, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onStartDiagnostic: () => void;
  onExplorePricing: () => void;
  onOpenCockpit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartDiagnostic,
  onExplorePricing,
  onOpenCockpit
}) => {
  return (
    <div className="relative bg-slate-900 border-b border-slate-800 text-white overflow-hidden">
      {/* Background industrial pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Core Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Accompagnement à la conformité aux exigences HSE des donneurs d'ordre du corridor Simandou</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-heading">
              Sécurisez vos contrats PME sur le{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                Corridor Minier Simandou
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Le cabinet HSE dédié aux <strong>PME sous-traitantes guinéennes</strong> (Transport lourd, BTP &amp; Voie ferrée, Restauration de camp, Gardiennage, Engins de terrassement). Évitez les arrêts de chantier, les pénalités et les suspensions de badges d'accès.
            </p>

            {/* Target Industries Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-200">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Transport &amp; Convois</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-200">
                <HardHat className="w-4 h-4 text-amber-400 shrink-0" />
                <span>BTP &amp; Génie Civil</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-200">
                <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Catering &amp; Bases-Vie</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-200">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sécurité &amp; Gardiennage</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-200">
                <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Location d’Engins Lourds</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-200">
                <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Audits &amp; Pré-qualification</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onStartDiagnostic}
                className="px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Diagnostic de Conformité Express (Gratuit)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExplorePricing}
                className="px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm transition-all border border-slate-700 cursor-pointer"
              >
                Grille Tarifaire (Dès 1 200 $/mois)
              </button>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400 border-t border-slate-800">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Interventions sur site en 24h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>15% de remise pour engagement 12 mois</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Audit initial 100% remboursable</span>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Business Card & Key Stats */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700 p-6 shadow-xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Modèle Économique &amp; Objectif
                  </span>
                  <div className="text-2xl font-extrabold text-white font-heading">
                    20 000 $ <span className="text-sm font-normal text-slate-400">/ mois</span>
                  </div>
                </div>
                <button
                  onClick={onOpenCockpit}
                  className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded hover:bg-emerald-500/30 transition-colors cursor-pointer"
                >
                  Ouvrir le Cockpit →
                </button>
              </div>

              {/* 3 Revenue streams */}
              <div className="space-y-3 py-4">
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-200">1. Assistance HSE externalisée</span>
                    <span className="font-bold text-amber-400">12 500 $</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">5 clients sous forfaits Standard × 2 500 $/mois</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-200">2. Formations certifiantes terrain</span>
                    <span className="font-bold text-amber-400">6 000 $</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">2 sessions mensuelles × 20 personnes × 150 $</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-200">3. Documents &amp; Audits initiaux</span>
                    <span className="font-bold text-amber-400">1 500 $</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">2 missions ponctuelles / mois × 750 $</p>
                </div>
              </div>

              {/* Ramp-up & Delegating */}
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-300">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Montée en puissance &amp; Délégation (6 à 12 mois)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Recrutement stratégique de <strong>1 à 2 techniciens HSE juniors</strong> pour assurer les causeries et inspections quotidiennes sur les bases de Morebaya, Mamou et Beyla.
                </p>
              </div>

              {/* Quick geography tag */}
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Tracé ferroviaire CTG 650 km
                </span>
                <span className="text-slate-300">Bases : Forécariah, Mamou, Beyla</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
