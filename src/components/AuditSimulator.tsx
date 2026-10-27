import React, { useState } from 'react';
import { ShieldCheck, AlertOctagon, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, FileText, Download } from 'lucide-react';
import { IndustrySector } from '../types';

interface AuditQuestion {
  id: number;
  question: string;
  context: string;
  points: number;
}

const AUDIT_QUESTIONS: AuditQuestion[] = [
  {
    id: 1,
    question: 'Avez-vous un Plan d’Organisation HSE (POS / PAE) écrit et formellement validé par votre donneur d’ordre ?',
    context: 'Exigé par Rio Tinto Simfer et WCS dès le jour 1 de votre présence sur le corridor.',
    points: 20,
  },
  {
    id: 2,
    question: 'Tous vos ouvriers et chauffeurs portent-ils des EPI conformes (casque jugulaire, gilet haute-visibilité classe 2, chaussures coquées, lunettes UV) ?',
    context: 'Tout défaut d’EPI entraîne l’exclusion immédiate du chantier par les inspecteurs de sécurité.',
    points: 15,
  },
  {
    id: 3,
    question: 'Réalisez-vous et archivez-vous des fiches de causeries sécurité (Toolbox Talks) hebdomadaires signées par les équipes ?',
    context: 'Preuve documentaire indispensable exigée lors de chaque inspection inopinée.',
    points: 15,
  },
  {
    id: 4,
    question: 'Toutes les visites médicales d’aptitude (tests visuels, audiométries, dépistage) de vos salariés sont-elles à jour ?',
    context: 'Condition stricte pour l’obtention et le renouvellement des badges d’accès miniers.',
    points: 15,
  },
  {
    id: 5,
    question: 'Vos engins lourds, camions et véhicules légers disposent-ils de contrôles techniques VGP et d’extincteurs vérifiés ?',
    context: 'Arrêt de circulation immédiat sur la piste en cas de vérification périodique dépassée.',
    points: 15,
  },
  {
    id: 6,
    question: 'Appliquez-vous un protocole formel de Permis de Travail (travaux en hauteur, fouilles, chaudronnerie/soudure) ?',
    context: 'Règle d’or (Golden Rule) absolue pour la prévention des accidents mortels.',
    points: 10,
  },
  {
    id: 7,
    question: 'Disposez-vous d’un plan d’évacuation d’urgence, d’un secouriste formé et de trousses de premiers secours sur site ?',
    context: 'Délai moyen d’évacuation vers Conakry ou Kankan supérieur à 4 heures en saison des pluies.',
    points: 10,
  },
];

interface AuditSimulatorProps {
  onSelectPlan: (planId: 'basic' | 'standard' | 'premium') => void;
}

export const AuditSimulator: React.FC<AuditSimulatorProps> = ({ onSelectPlan }) => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [selectedSector, setSelectedSector] = useState<IndustrySector>('transport');
  const [companyName, setCompanyName] = useState<string>('');

  const handleToggle = (id: number) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const calculateScore = () => {
    return AUDIT_QUESTIONS.reduce((acc, q) => {
      return acc + (answers[q.id] ? q.points : 0);
    }, 0);
  };

  const score = calculateScore();

  const getRiskStatus = () => {
    if (score < 45) {
      return {
        level: 'Critique (Risque d’exclusion immédiat)',
        color: 'text-red-400 bg-red-500/10 border-red-500/30',
        advice: 'Vos opérations sont en danger imminent d’arrêt de chantier ou de pénalités contractuelles lourdes lors de la prochaine inspection Simfer/WCS. Il est urgent d’organiser un Audit Initial Flash.',
        recommendedPlan: 'premium' as const,
        planName: 'Pack Premium (4 000 $/mois)',
      };
    } else if (score < 75) {
      return {
        level: 'Modéré (Vulnérabilités documentaires)',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        advice: 'Vous disposez d’une base de sécurité, mais vos preuves documentaires (causeries, VGP, permis de travail) présentent des failles qui risquent de bloquer vos factures.',
        recommendedPlan: 'standard' as const,
        planName: 'Pack Standard (2 500 $/mois)',
      };
    } else {
      return {
        level: 'Favorable (Maintien de conformité requis)',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        advice: 'Très bonne rigueur de base. Le Pack Basic vous permettra de maintenir ce niveau sans mobiliser un cadre à plein temps, à moindre coût.',
        recommendedPlan: 'basic' as const,
        planName: 'Pack Basic (1 200 $/mois)',
      };
    }
  };

  const status = getRiskStatus();

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Diagnostic Express en 2 Minutes • 7 Points Éliminatoires</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          Votre PME passerait-elle l'Audit Sécurité Simandou Demain Matin ?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Testez vos pratiques face aux exigences strictes de Rio Tinto Simfer, Winning Consortium Simandou (WCS) et la Compagnie du Transguinéen (CTG).
        </p>
      </div>

      {/* Inputs before test */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div>
          <label className="text-slate-400 block mb-1">Nom de votre entreprise :</label>
          <input
            type="text"
            placeholder="Ex: Guinée Transports &amp; Engins SARL"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1">Corps de métier / Spécialité :</label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value as IndustrySector)}
            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-amber-500"
          >
            <option value="transport">Transport lourd, carburant &amp; convois</option>
            <option value="btp">BTP, terrassement &amp; voie ferrée</option>
            <option value="engins">Location &amp; conduite d’engins lourds</option>
            <option value="restauration">Catering, cantines &amp; bases-vie</option>
            <option value="gardiennage">Sécurité, sûreté &amp; surveillance de sites</option>
          </select>
        </div>
      </div>

      {/* Question checklist */}
      <div className="space-y-3">
        {AUDIT_QUESTIONS.map((q, idx) => {
          const isChecked = !!answers[q.id];
          return (
            <div
              key={q.id}
              onClick={() => handleToggle(q.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                isChecked
                  ? 'bg-slate-900/90 border-emerald-500/50 shadow-sm'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="pt-0.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // handled by parent onClick
                  className="w-4 h-4 rounded text-emerald-500 accent-emerald-500 focus:ring-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="text-sm font-semibold text-slate-100">
                    Point {idx + 1} : {q.question}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500 shrink-0">
                    +{q.points} pts
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {q.context}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Score de Conformité Prévisionnel
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold text-white font-heading">{score}</span>
              <span className="text-lg font-bold text-slate-500">/ 100</span>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-xl border text-xs font-bold ${status.color}`}>
            {status.level}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {status.advice}
        </p>

        {/* Action proposal */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs">
            <span className="text-slate-400">Formule recommandée pour votre profil : </span>
            <strong className="text-amber-400 font-bold">{status.planName}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAnswers({})}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              title="Réinitialiser"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectPlan(status.recommendedPlan)}
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <span>Voir le Devis pour ce forfait</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
