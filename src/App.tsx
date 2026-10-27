import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PricingCalculator } from './components/PricingCalculator';
import { BusinessPlanSimulator } from './components/BusinessPlanSimulator';
import { ProspectingHub } from './components/ProspectingHub';
import { CallScriptRunner } from './components/CallScriptRunner';
import { AuditSimulator } from './components/AuditSimulator';
import { AiHseGenerator } from './components/AiHseGenerator';
import { CorridorMapModal } from './components/CorridorMapModal';
import { Footer } from './components/Footer';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { PmeProspect } from './types';
import { INITIAL_PMES } from './data/mockPmes';
import { TrendingUp, MessageSquare, Phone, ShieldCheck, CheckCircle2, Building2, HardHat, Award, Sparkles, AlertTriangle, BarChart3 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'client-view' | 'cockpit' | 'ai-tools' | 'diagnostic'>('client-view');
  const [cockpitSubTab, setCockpitSubTab] = useState<'metrics' | 'simulator' | 'prospecting' | 'call-script'>('metrics');
  const [selectedProspectForCall, setSelectedProspectForCall] = useState<PmeProspect>(INITIAL_PMES[0]);
  const [isCorridorMapOpen, setIsCorridorMapOpen] = useState<boolean>(false);

  const handleLaunchCallWithPme = (pme: PmeProspect) => {
    setSelectedProspectForCall(pme);
    setActiveTab('cockpit');
    setCockpitSubTab('call-script');
  };

  const handleAuditBooked = (date: string, pmeId: string) => {
    // You can trigger an alert or state notification
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCorridorMap={() => setIsCorridorMapOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB 1: CLIENT-FACING PORTAL (Vitrine PME & Tarifs) */}
        {activeTab === 'client-view' && (
          <div>
            <HeroSection
              onStartDiagnostic={() => setActiveTab('diagnostic')}
              onExplorePricing={() => {
                const el = document.getElementById('tarifs');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCockpit={() => setActiveTab('cockpit')}
            />

            {/* Value Proposition & Differentiators */}
            <div className="py-12 bg-slate-900 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    Pourquoi les PME du Corridor Choisissent Simadou Safe Mine HSE ?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Les multinationales minières ne transigent jamais sur la sécurité. Nous transformons votre conformité en avantage concurrentiel.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white">Zéro Arrêt de Chantier</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Nos consultants inspectent vos engins et postes de travail avant le passage des inspecteurs de mine. Chaque anomalie est corrigée sur-le-champ.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white">Conformité aux Exigences Donneurs d'Ordre</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Fiches de causeries signées, registres VGP, habilitations chauffeurs et plans HSE validés au format exact attendu par les donneurs d'ordre.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white">Délégation Terrain &amp; Économie Réelle</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Plutôt que d'embaucher un cadre HSE senior difficile à recruter, bénéficiez d'une équipe complète d'ingénieurs et techniciens pour une fraction du coût.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <PricingCalculator onOpenAuditRequest={() => setActiveTab('diagnostic')} />

            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-10 text-slate-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black font-heading tracking-tight">
                    Une inspection client programmée sur votre chantier cette semaine ?
                  </h3>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    Notre équipe intervient sous 24h sur les bases de Forécariah, Morebaya, Mamou et Beyla.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab('diagnostic')}
                    className="px-6 py-3 rounded-xl bg-slate-950 text-white hover:bg-slate-900 font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-all"
                  >
                    Faire le Diagnostic Flash
                  </button>
                  <button
                    onClick={() => setActiveTab('cockpit')}
                    className="px-5 py-3 rounded-xl bg-white/30 text-slate-950 hover:bg-white/40 font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
                  >
                    Espace Gestionnaire
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIAGNOSTIC SIMULATOR */}
        {activeTab === 'diagnostic' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AuditSimulator
              onSelectPlan={(planId) => {
                setActiveTab('client-view');
                setTimeout(() => {
                  const el = document.getElementById('tarifs');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
          </div>
        )}

        {/* TAB 3: AI GENERATOR */}
        {activeTab === 'ai-tools' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AiHseGenerator />
          </div>
        )}

        {/* TAB 4: COCKPIT DE GESTION DU CABINET (20 000 $/MOIS) */}
        {activeTab === 'cockpit' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* Cockpit Sub-Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setCockpitSubTab('metrics')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    cockpitSubTab === 'metrics'
                      ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Performance Metrics</span>
                </button>

                <button
                  onClick={() => setCockpitSubTab('simulator')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    cockpitSubTab === 'simulator'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Modèle 20 000 $ &amp; Plan 12 Mois</span>
                </button>

                <button
                  onClick={() => setCockpitSubTab('prospecting')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    cockpitSubTab === 'prospecting'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Machine Prospection (30 PME)</span>
                </button>

                <button
                  onClick={() => setCockpitSubTab('call-script')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    cockpitSubTab === 'call-script'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Script Téléphonique 15 Min</span>
                </button>
              </div>

              <div className="text-xs text-slate-400 hidden lg:block pr-3">
                Console interne réservée aux associés &amp; consultants du cabinet
              </div>
            </div>

            {/* Sub-tab 0: Performance Metrics (Recharts) */}
            {cockpitSubTab === 'metrics' && (
              <PerformanceMetrics
                onNavigateToProspecting={() => setCockpitSubTab('prospecting')}
                onNavigateToSimulator={() => setCockpitSubTab('simulator')}
              />
            )}

            {/* Sub-tab 1: Business Plan Simulator */}
            {cockpitSubTab === 'simulator' && <BusinessPlanSimulator />}

            {/* Sub-tab 2: Prospecting Hub & 30 PME CRM */}
            {cockpitSubTab === 'prospecting' && (
              <ProspectingHub onLaunchCallScript={handleLaunchCallWithPme} />
            )}

            {/* Sub-tab 3: 15-Minute Sales Call Script */}
            {cockpitSubTab === 'call-script' && (
              <CallScriptRunner
                currentProspect={selectedProspectForCall}
                onAuditBooked={handleAuditBooked}
              />
            )}

          </div>
        )}

      </main>

      {/* Corridor Map Modal */}
      <CorridorMapModal
        isOpen={isCorridorMapOpen}
        onClose={() => setIsCorridorMapOpen(false)}
      />

      {/* Global Footer */}
      <Footer onOpenCorridorMap={() => setIsCorridorMapOpen(true)} />

    </div>
  );
}
