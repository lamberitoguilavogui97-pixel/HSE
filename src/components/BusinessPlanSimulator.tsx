import React, { useState } from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Award, CheckCircle2, ChevronRight, UserPlus, Target, PieChart, ShieldCheck } from 'lucide-react';
import { ActionPlanMilestone } from '../types';

export const ACTION_PLAN_MILESTONES: ActionPlanMilestone[] = [
  {
    period: 'Mois 1',
    title: 'Formalisation du Cabinet & Ciblage Stratégique',
    focus: 'Fondations juridiques, offres commerciales et base de 30 PME',
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    keyActions: [
      'Enregistrement juridique du cabinet (RCCM Conakry) et agrément ministériel HSE',
      'Finalisation de la grille tarifaire (Basic 1 200 $, Standard 2 500 $, Premium 4 000 $)',
      'Qualification approfondie de la base de 30 PME sous-traitantes sur le tracé ferroviaire CTG et Morebaya',
      'Mise en place de la cadence commerciale : 10 messages WhatsApp personnalisés/jour + relances J+3'
    ],
    kpis: [
      'Cabinet formalisé à 100%',
      '30 PME répertoriées avec coordonnées directes des gérants',
      'Au moins 10 appels de diagnostic 15 min programmés'
    ]
  },
  {
    period: 'Mois 2 - 3',
    title: 'Acquisition des 2 Clients Pilotes (-30%)',
    focus: 'Création d’études de cas réelles et crédibilité terrain Simandou',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    keyActions: [
      'Conversion de 2 PME pilotes avec une remise promotionnelle de -30% (ex: forfait Standard à 1 750 $/mois)',
      'Réalisation des premiers audits initiaux flash et remise des rapports de conformité sous 24h',
      'Déploiement des premières causeries de sécurité (Toolbox Talks) sur leurs bases chantiers',
      'Collecte de témoignages écrits et attestations de satisfaction des directeurs de chantier'
    ],
    kpis: [
      '2 contrats pilotes signés et actifs',
      'Chiffre d’affaires mensuel récurrent : ~3 500 $ / mois',
      '0 incident sur les chantiers des 2 clients pilotes'
    ]
  },
  {
    period: 'Mois 4 - 6',
    title: 'Recrutement des Techniciens HSE Juniors',
    focus: 'Délégation du suivi terrain quotidien et passage à l’échelle',
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    keyActions: [
      'Recrutement de 1 puis 2 techniciens HSE juniors diplômés (ISAU / Institut de Boffa ou équivalent)',
      'Formation intensive de 2 semaines aux standards spécifiques Rio Tinto Simfer et WCS',
      'Dotation en EPI haute visibilité, kits d’inspection et tablettes de reporting',
      'Délégation des visites hebdomadaires et de l’animation des causeries sur les bases de Morebaya et Mamou'
    ],
    kpis: [
      '1 à 2 techniciens juniors autonomes sur le terrain',
      'Capacité d’accueil étendue à 5 à 8 clients simultanés',
      'Le fondateur se concentre à 100% sur la vente et les audits de haut niveau'
    ]
  },
  {
    period: 'Mois 6 - 12',
    title: 'Formations en Série & Vitesse de Croisière (20k$/mois)',
    focus: 'Atteinte des 3 flux de revenus stabilisés',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    keyActions: [
      'Stabilisation du portefeuille : 5 clients forfait Standard récurrents (12 500 $/mois)',
      'Lancement des sessions inter-entreprises de formation : 2 sessions × 20 stagiaires × 150 $ (6 000 $/mois)',
      'Réalisation régulière de 2 missions ponctuelles de plans HSE ou préqualifications (1 500 $/mois)',
      'Déploiement d’un bureau d’astreinte permanent à Beyla et Forécariah'
    ],
    kpis: [
      'Revenu mensuel récurrent : 20 000 $ / mois (240 000 $ / an)',
      'Marge nette supérieure à 65% après salaires et logistique',
      'Référence incontournable de la sécurité sur le mégaprojet Simandou'
    ]
  }
];

export const BusinessPlanSimulator: React.FC = () => {
  // Model parameters (Default = exact prompt breakdown)
  const [retainedClients, setRetainedClients] = useState(5);
  const [retainedPrice, setRetainedPrice] = useState(2500);
  
  const [trainingSessions, setTrainingSessions] = useState(2);
  const [attendeesPerSession, setAttendeesPerSession] = useState(20);
  const [trainingPrice, setTrainingPrice] = useState(150);

  const [documentMissions, setDocumentMissions] = useState(2);
  const [documentPrice, setDocumentPrice] = useState(750);

  const [juniorTechs, setJuniorTechs] = useState(2);
  const [juniorSalary, setJuniorSalary] = useState(700); // 700 $ / month per junior tech
  const [operationalCosts, setOperationalCosts] = useState(1500); // travel, fuel 4x4, phone, PPE

  // Calculated revenues
  const revenueAssistance = retainedClients * retainedPrice;
  const revenueTrainings = trainingSessions * attendeesPerSession * trainingPrice;
  const revenueDocuments = documentMissions * documentPrice;
  const totalRevenue = revenueAssistance + revenueTrainings + revenueDocuments;

  // Expenses
  const totalTechSalaries = juniorTechs * juniorSalary;
  const totalExpenses = totalTechSalaries + operationalCosts;
  const netProfit = totalRevenue - totalExpenses;
  const marginPercent = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

  return (
    <div className="space-y-10 py-6">
      
      {/* Top Banner Goal */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Objectif Financier Stratégique : 20 000 $ / mois</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
              Simulateur Économique &amp; Plan d'Action 12 Mois
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Modélisez l’atteinte des 20 000 $/mois grâce aux 3 flux complémentaires et pilotez l'embauche des techniciens juniors pour déléguer le terrain.
            </p>
          </div>

          <div className="text-left md:text-right bg-slate-950/70 p-4 rounded-xl border border-slate-800 shrink-0">
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">
              Chiffre d’Affaires Mensuel Modélisé
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-heading">
              {totalRevenue.toLocaleString('fr-FR')} $ <span className="text-sm font-normal text-slate-400">/ mois</span>
            </div>
            <div className="text-xs text-emerald-400 font-semibold mt-1">
              Bénéfice Net : {netProfit.toLocaleString('fr-FR')} $/mois ({marginPercent}% marge)
            </div>
          </div>
        </div>

        {/* 3 Revenue Stream Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          
          {/* Stream 1 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 relative">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Flux 1 • Récurrent
              </span>
              <span className="text-lg font-black text-white">
                {revenueAssistance.toLocaleString('fr-FR')} $
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-2">Assistance HSE Externalisée</h4>
            <p className="text-xs text-slate-400 mb-3">
              {retainedClients} clients sous forfait Standard à {retainedPrice} $/mois.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Nombre de clients :</span>
                <span className="font-bold text-amber-400">{retainedClients} PME</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={retainedClients}
                onChange={(e) => setRetainedClients(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Stream 2 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 relative">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                Flux 2 • Volume
              </span>
              <span className="text-lg font-black text-white">
                {revenueTrainings.toLocaleString('fr-FR')} $
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-2">Formations Certifiantes</h4>
            <p className="text-xs text-slate-400 mb-3">
              {trainingSessions} sessions de {attendeesPerSession} stagiaires à {trainingPrice} $/pers.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Sessions / mois :</span>
                <span className="font-bold text-emerald-400">{trainingSessions} sessions ({trainingSessions * attendeesPerSession} pers)</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={trainingSessions}
                onChange={(e) => setTrainingSessions(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Stream 3 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 relative">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">
                Flux 3 • Ponctuel
              </span>
              <span className="text-lg font-black text-white">
                {revenueDocuments.toLocaleString('fr-FR')} $
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-2">Documents &amp; Audits Initiaux</h4>
            <p className="text-xs text-slate-400 mb-3">
              {documentMissions} missions ponctuelles / mois à {documentPrice} $.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Missions par mois :</span>
                <span className="font-bold text-blue-400">{documentMissions} missions</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={documentMissions}
                onChange={(e) => setDocumentMissions(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Staffing & Cost Delegation Control */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Équipe Opérationnelle &amp; Délégation Terrain
              </h4>
              <p className="text-xs text-slate-400">
                {juniorTechs} technicien(s) HSE junior(s) recruté(s) à {juniorSalary} $/mois pour les visites chantiers quotidiennes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">Techniciens juniors :</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setJuniorTechs(num)}
                  className={`px-3 py-1.5 rounded font-bold cursor-pointer transition-colors ${
                    juniorTechs === num
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {num} {num > 1 ? 'techs' : 'tech'}
                </button>
              ))}
            </div>
            <span className="text-slate-400 ml-2">Masse salariale : <strong className="text-white">{totalTechSalaries} $</strong></span>
          </div>
        </div>
      </div>

      {/* 12-Month Action Plan Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Plan d’Action Opérationnel (Mois 1 à 12)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              La feuille de route chronologique précise pour passer de la création au cap des 20 000 $/mois.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
            Délai réaliste : 6 à 12 mois
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACTION_PLAN_MILESTONES.map((milestone, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold border ${milestone.badgeColor}`}>
                    {milestone.period}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Étape {idx + 1} sur 4</span>
                </div>

                <h4 className="text-base font-bold text-white mb-1">
                  {milestone.title}
                </h4>
                <p className="text-xs text-slate-400 mb-4 italic">
                  Focus : {milestone.focus}
                </p>

                {/* Actions */}
                <div className="space-y-2 mb-4">
                  <span className="text-xs font-bold text-slate-300 block">Actions clés :</span>
                  {milestone.keyActions.map((action, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPIs */}
              <div className="pt-3 border-t border-slate-800 text-xs">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Livrables &amp; KPI de validation :
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px]">
                  {milestone.kpis.map((kpi, kIdx) => (
                    <li key={kIdx}>{kpi}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
