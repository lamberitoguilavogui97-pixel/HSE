import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  Target,
  Users,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  Filter,
  Flame,
  Award,
  ShieldCheck,
  AlertCircle,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { PmeProspect } from '../types';

interface PerformanceMetricsProps {
  pmes?: PmeProspect[];
  onNavigateToProspecting?: () => void;
  onNavigateToSimulator?: () => void;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  onNavigateToProspecting,
  onNavigateToSimulator,
}) => {
  // Scenario selector: 'current' (Mois 4 en cours) vs 'target' (Mois 12 - 20k)
  const [viewScenario, setViewScenario] = useState<'current' | 'target'>('current');

  // Revenue Stream Comparison (Actual vs Target)
  const REVENUE_STREAMS_DATA = [
    {
      stream: 'Assistance HSE',
      actuel: viewScenario === 'current' ? 9700 : 12500,
      objectif: 12500,
      pct: viewScenario === 'current' ? 77.6 : 100,
      detail: viewScenario === 'current' ? '4 clients actifs (dont 2 pilotes)' : '5 clients Standard (2 500 $)',
    },
    {
      stream: 'Formations',
      actuel: viewScenario === 'current' ? 3000 : 6000,
      objectif: 6000,
      pct: viewScenario === 'current' ? 50 : 100,
      detail: viewScenario === 'current' ? '1 session × 20 pers × 150 $' : '2 sessions × 20 pers × 150 $',
    },
    {
      stream: 'Audits & Docs',
      actuel: viewScenario === 'current' ? 1800 : 1500,
      objectif: 1500,
      pct: viewScenario === 'current' ? 120 : 100,
      detail: viewScenario === 'current' ? '2 audits flash + 1 HIRA' : '2 missions mensuelles × 750 $',
    },
  ];

  const currentTotalRevenue = REVENUE_STREAMS_DATA.reduce((acc, item) => acc + item.actuel, 0);
  const targetTotalRevenue = 20000;
  const progressPercent = Math.round((currentTotalRevenue / targetTotalRevenue) * 100);

  // 12-Month Trajectory (Actual M1-M4, Projected M5-M12)
  const TRAJECTORY_DATA = [
    { month: 'M1', ca: 1500, target: 2000, charges: 600, margeNet: 900, phase: 'Formalisation' },
    { month: 'M2', ca: 3750, target: 4500, charges: 800, margeNet: 2950, phase: 'Pilote 1 (-30%)' },
    { month: 'M3', ca: 7200, target: 8000, charges: 1200, margeNet: 6000, phase: 'Pilote 2 + Audits' },
    { month: 'M4', ca: 10500, target: 12000, charges: 2200, margeNet: 8300, phase: '1er Tech Junior' },
    { month: 'M5 (Actuel)', ca: 14500, target: 15000, charges: 2900, margeNet: 11600, phase: '2e Tech Junior' },
    { month: 'M6', ca: 17500, target: 17500, charges: 3200, margeNet: 14300, phase: 'Formations série' },
    { month: 'M7', ca: 19000, target: 19000, charges: 3200, margeNet: 15800, phase: 'Stabilisation' },
    { month: 'M8', ca: 20000, target: 20000, charges: 3500, margeNet: 16500, phase: 'Cap des 20k$' },
    { month: 'M9', ca: 20500, target: 20000, charges: 3500, margeNet: 17000, phase: 'Vitesse croisière' },
    { month: 'M10', ca: 21500, target: 20000, charges: 3500, margeNet: 18000, phase: 'Croissance' },
    { month: 'M11', ca: 22000, target: 20000, charges: 3500, margeNet: 18500, phase: 'Expansion Morebaya' },
    { month: 'M12', ca: 23500, target: 20000, charges: 3600, margeNet: 19900, phase: 'Cabinet Leader' },
  ];

  // Prospecting Funnel Data (from the 30 targeted PMEs)
  const FUNNEL_DATA = [
    { stage: '1. Ciblées (Corridor)', count: 30, pctTotal: 100, stepPct: 100, drop: 0, fill: '#3b82f6' },
    { stage: '2. 1er Contact WA', count: 24, pctTotal: 80, stepPct: 80, drop: 20, fill: '#60a5fa' },
    { stage: '3. Relance J+3', count: 16, pctTotal: 53.3, stepPct: 66.7, drop: 33.3, fill: '#f59e0b' },
    { stage: '4. Appel 15 Min', count: 11, pctTotal: 36.7, stepPct: 68.8, drop: 31.2, fill: '#a855f7' },
    { stage: '5. Audit Calé', count: 7, pctTotal: 23.3, stepPct: 63.6, drop: 36.4, fill: '#ec4899' },
    { stage: '6. Devis Transmis', count: 4, pctTotal: 13.3, stepPct: 57.1, drop: 42.9, fill: '#14b8a6' },
    { stage: '7. Signé / Actif', count: 2, pctTotal: 6.7, stepPct: 50.0, drop: 50.0, fill: '#10b981' },
  ];

  // Active Subscriptions Breakdown
  const SUBSCRIPTIONS_DATA = [
    { name: 'Pack Standard (2 500 $)', count: 2, value: 5000, color: '#f59e0b', share: '34.5%' },
    { name: 'Clients Pilotes (-30% : 1 750 $)', count: 2, value: 3500, color: '#10b981', share: '24.1%' },
    { name: 'Pack Basic (1 200 $)', count: 1, value: 1200, color: '#3b82f6', share: '8.3%' },
    { name: 'Formations Mensuelles', count: 1, value: 3000, color: '#8b5cf6', share: '20.7%' },
    { name: 'Audits & Documents', count: 3, value: 1800, color: '#06b6d4', share: '12.4%' },
  ];

  // Sector Breakdown
  const SECTOR_DISTRIBUTION = [
    { sector: 'Transport & Convois', count: 7, caShare: '35%', color: '#f59e0b' },
    { sector: 'BTP & Voie CTG', count: 6, caShare: '28%', color: '#3b82f6' },
    { sector: 'Engins & Terrassement', count: 6, caShare: '20%', color: '#10b981' },
    { sector: 'Restauration Camp', count: 5, caShare: '11%', color: '#ec4899' },
    { sector: 'Sécurité & Gardiennage', count: 6, caShare: '6%', color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-8 py-6">
      
      {/* Top Banner & Control Bar */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Tableau de Bord Exécutif • Métriques Clés &amp; Entonnoir de Vente</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Performance Commerciale &amp; Suivi du Cap 20 000 $/mois
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Visualisation en temps réel du chiffre d’affaires généré vs l'objectif de 20 000 $/mois, état des abonnements récurrents et taux de conversion de votre pipeline de 30 PME.
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
            <button
              onClick={() => setViewScenario('current')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewScenario === 'current'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mois 4-5 (En Cours)
            </button>
            <button
              onClick={() => setViewScenario('target')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewScenario === 'target'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Objectif Cible (20 000 $)
            </button>
          </div>
        </div>

        {/* 4 Key Executive KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          {/* KPI 1: Revenue vs Target */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Chiffre d’Affaires MTD</span>
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +24% vs M-1
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">
                {currentTotalRevenue.toLocaleString('fr-FR')} $
              </span>
              <span className="text-xs text-slate-500">/ 20 000 $</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-1">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(100, progressPercent)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
              <span>{progressPercent}% de l'objectif</span>
              <span className="text-amber-400 font-semibold">Reste : {(targetTotalRevenue - currentTotalRevenue).toLocaleString('fr-FR')} $</span>
            </div>
          </div>

          {/* KPI 2: Active Subscriptions MRR */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Abonnements Récurrents (MRR)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 font-bold">5 Actifs</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white font-heading">
                9 700 $
              </span>
              <span className="text-xs text-slate-400">/ mois</span>
            </div>
            <p className="text-[11px] text-slate-400">
              2 Standard (5 000$) + 2 Pilotes (3 500$) + 1 Basic (1 200$)
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Taux de rétention : 100%
            </div>
          </div>

          {/* KPI 3: Pipeline Conversion */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Taux de Conversion Global</span>
              <span className="text-amber-400 font-bold">Base 30 PME</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">
                6.7 %
              </span>
              <span className="text-xs text-slate-400">Signé (2/30)</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-1">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '23.3%' }} />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
              <span>7 Audits calés (23.3%)</span>
              <span className="text-white font-semibold">4 Devis en cours</span>
            </div>
          </div>

          {/* KPI 4: Net Margin & Staffing */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Marge Nette &amp; Équipe</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-bold">2 Techs</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-purple-400 font-heading">
                72.4 %
              </span>
              <span className="text-xs text-slate-400">Marge nette</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Masse salariale : 1 400 $ • Frais logistique : 1 500 $
            </p>
            <div className="text-[11px] text-purple-300 font-semibold">
              Bénéfice Net : 11 600 $/mois
            </div>
          </div>

        </div>
      </div>

      {/* Row 1: Revenue vs Target by Stream & Trajectory 12 Months */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Revenue Streams Actual vs Target */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Répartition par Flux de Revenus
                </span>
                <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                  Chiffre d’Affaires Actuel vs Objectif 20k$
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                {currentTotalRevenue.toLocaleString('fr-FR')} $ / 20 000 $
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2 mb-4">
              Comparatif des 3 sources de revenus prévues par le modèle du cabinet.
            </p>

            {/* Recharts BarChart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={REVENUE_STREAMS_DATA}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="stream" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                    formatter={(value: any, name: any) => [`${value} $`, name === 'actuel' ? 'Chiffre Réalisé' : 'Objectif Cible']}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }}
                  />
                  <Bar dataKey="actuel" name="Actuel / En cours" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="objectif" name="Objectif 20k$" fill="#334155" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown summary strip */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800 text-xs">
            {REVENUE_STREAMS_DATA.map((item, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block truncate">{item.stream}</span>
                <span className="font-bold text-amber-400 text-xs sm:text-sm">{item.actuel.toLocaleString('fr-FR')} $</span>
                <span className="text-[10px] text-emerald-400 block">{item.pct}% atteint</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: 12-Month Ramp-up Curve */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Trajectoire &amp; Montée en Charge
                </span>
                <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                  Évolution M1 à M12 (Cap des 20 000 $/mois)
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Seuil de rentabilité : M2
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2 mb-4">
              Progression du CA mensuel, des charges d'exploitation (salaires techniciens + 4x4) et du bénéfice net.
            </p>

            {/* Recharts Area/Line Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={TRAJECTORY_DATA}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                    formatter={(value: any, name: any) => [`${value} $`, name]}
                  />
                  <ReferenceLine y={20000} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Cible 20k$', fill: '#ef4444', fontSize: 10 }} />
                  <Area type="monotone" dataKey="ca" name="CA Total" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorCa)" />
                  <Area type="monotone" dataKey="margeNet" name="Bénéfice Net" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorNet)" />
                  <Line type="monotone" dataKey="charges" name="Charges / Salaires" stroke="#a855f7" strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> CA
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block ml-2"></span> Bénéfice net
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block ml-2"></span> Charges
            </span>
            <button
              onClick={onNavigateToSimulator}
              className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              <span>Ajuster dans le Simulateur</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Row 2: Prospecting Conversion Funnel & Subscriptions Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 3: Conversion Funnel (30 PME) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  Entonnoir de Prospection Commerciale
                </span>
                <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                  Taux de Conversion des 30 PME Ciblées
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30">
                Cadence : 10 msg/j • Relance J+3
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2 mb-4">
              Passage d'étape en étape : de la prise de contact WhatsApp jusqu’au contrat d’assistance signé.
            </p>

            {/* Recharts Horizontal Bar / Funnel */}
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={FUNNEL_DATA}
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={10} domain={[0, 30]} />
                  <YAxis type="category" dataKey="stage" stroke="#94a3b8" fontSize={10} tickLine={false} width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                    formatter={(val: any, _name: any, props: any) => [
                      `${val} PME (${props.payload.pctTotal}% du total)`,
                      `Conversion étape : ${props.payload.stepPct}%`,
                    ]}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {FUNNEL_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Funnel Drop Analysis */}
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Point d'optimisation prioritaire :</span>
              </span>
              <button
                onClick={onNavigateToProspecting}
                className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                <span>Accéder au CRM des 30 PME</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              La conversion <strong>Relance J+3 → Appel 15 min (68.8%)</strong> et <strong>Appel → Audit Calé (63.6%)</strong> est excellente. La clé pour atteindre les 20 000 $/mois est de convertir 3 des 4 devis actuellement en cours de signature.
            </p>
          </div>
        </div>

        {/* Chart 4: Active Subscriptions Breakdown (Donut) & Sectors */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                  Structure du Revenu Mensuel
                </span>
                <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                  Répartition des Abonnements
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                5 Contrats Actifs
              </span>
            </div>

            {/* Donut Chart */}
            <div className="h-56 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SUBSCRIPTIONS_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {SUBSCRIPTIONS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                    formatter={(val: any, name: any) => [`${val.toLocaleString('fr-FR')} $`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend breakdown list */}
            <div className="space-y-1.5 mt-2">
              {SUBSCRIPTIONS_DATA.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300 font-medium truncate max-w-[170px]">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{item.value.toLocaleString('fr-FR')} $</span>
                    <span className="text-[10px] text-slate-500 font-mono">{item.share}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick industry note */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
            <span>Secteur n°1 contributeur :</span>
            <strong className="text-amber-400">Transport &amp; Convois (35% du CA)</strong>
          </div>
        </div>

      </div>

      {/* Strategic Playbook: Next Actionable Lever */}
      <div className="rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Prochaine action recommandée pour franchir le palier des 20 000 $ :
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Transformer les <strong>2 clients pilotes (-30%)</strong> en forfaits Standard fermes à <strong>2 500 $/mois</strong> au terme de leurs 3 mois d’essai (+1 500 $/mois net) et organiser la <strong>2e session de formation certifiante</strong> (+3 000 $).
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToProspecting}
          className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wide transition-all shadow-md shrink-0 cursor-pointer"
        >
          Lancer les relances du jour →
        </button>
      </div>

    </div>
  );
};
