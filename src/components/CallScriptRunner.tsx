import React, { useState, useEffect } from 'react';
import { CALL_STEPS, OBJECTIONS } from '../data/scriptData';
import { ScriptStep, ObjectionData, PmeProspect } from '../types';
import { Phone, Play, Pause, RotateCcw, ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, Calendar, MessageSquare, ArrowRight, UserCheck } from 'lucide-react';

interface CallScriptRunnerProps {
  currentProspect?: PmeProspect;
  onAuditBooked?: (date: string, pmeId: string) => void;
}

export const CallScriptRunner: React.FC<CallScriptRunnerProps> = ({ currentProspect, onAuditBooked }) => {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60); // 15 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [selectedObjection, setSelectedObjection] = useState<ObjectionData | null>(null);
  
  const [bookedDate, setBookedDate] = useState<string>('Jeudi prochain à 10h00');
  const [bookedSite, setBookedSite] = useState<string>('Base vie Forécariah');
  const [isBookedConfirmed, setIsBookedConfirmed] = useState<boolean>(false);
  const [callNotes, setCallNotes] = useState<string>('');

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining]);

  const formatTimer = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setSecondsRemaining(15 * 60);
  };

  const activeStep = CALL_STEPS.find((s) => s.id === activeStepId) || CALL_STEPS[0];

  const handleConfirmBooking = () => {
    setIsBookedConfirmed(true);
    if (onAuditBooked && currentProspect) {
      onAuditBooked(bookedDate, currentProspect.id);
    }
  };

  return (
    <div className="space-y-6 py-6">
      
      {/* Top Controller: Prospect Banner & Timer */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Phone className="w-3.5 h-3.5" />
            <span>Script d’Appel Commercial Interactif (Cadre 15 Minutes)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
            {currentProspect ? (
              <span>Appel avec {currentProspect.managerName} ({currentProspect.companyName})</span>
            ) : (
              <span>Simulateur d’Appel Gérant PME</span>
            )}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Objectif unique : <strong>Fixer la date de l’Audit Initial Flash</strong> sans vendre le contrat annuel directement.
          </p>
        </div>

        {/* Live Timer Widget */}
        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Chronomètre 15 min :</span>
            <div className={`text-2xl font-black font-mono ${secondsRemaining < 180 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
              {formatTimer(secondsRemaining)}
            </div>
          </div>

          <div className="flex items-center gap-1.5 ml-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`p-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                isTimerRunning
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-emerald-600 text-white hover:bg-emerald-500'
              }`}
              title={isTimerRunning ? 'Mettre en pause' : 'Démarrer le chronomètre'}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handleResetTimer}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
              title="Réinitialiser"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5-Step Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        {CALL_STEPS.map((step) => {
          const isActive = step.id === activeStepId;
          const isPassed = step.id < activeStepId;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md ring-2 ring-amber-400/40'
                  : isPassed
                  ? 'bg-slate-800/80 text-slate-200 border-slate-700'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase tracking-wider opacity-80">
                  Étape {step.id} ({step.durationMin} min)
                </span>
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="truncate font-semibold">{step.title.split('.')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Main Call Workspace: Left Step Script & Right Objections Toolbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Script Step */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeStep.title}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Objectif : {activeStep.objective}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                Durée conseillée : {activeStep.durationMin} min
              </span>
            </div>

            {/* Script Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm leading-relaxed whitespace-pre-wrap font-sans border-l-4 border-l-amber-500">
              {activeStep.dialogue}
            </div>

            {/* Special Action on Step 5: Fix Date Form */}
            {activeStep.id === 5 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Validation du Rendez-vous d’Audit Initial Flash</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1">Date &amp; Heure convenue :</label>
                    <input
                      type="text"
                      value={bookedDate}
                      onChange={(e) => setBookedDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Base / Chantier d'inspection :</label>
                    <input
                      type="text"
                      value={bookedSite}
                      onChange={(e) => setBookedSite(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    Tarif standard audit initial : <strong>750 $</strong> (100% déductible si forfait)
                  </span>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>{isBookedConfirmed ? '✓ Audit Enregistré !' : 'Valider & Programmer l’Audit'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Practical Advice Tips */}
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs space-y-2">
              <strong className="text-slate-300 block">Conseils tactiques pendant cette phase :</strong>
              <ul className="space-y-1 text-slate-400">
                {activeStep.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                disabled={activeStep.id === 1}
                onClick={() => setActiveStepId((prev) => Math.max(1, prev - 1))}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer ${
                  activeStep.id === 1
                    ? 'opacity-40 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                ← Étape précédente
              </button>

              <button
                disabled={activeStep.id === 5}
                onClick={() => setActiveStepId((prev) => Math.min(5, prev + 1))}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                  activeStep.id === 5
                    ? 'opacity-40 text-slate-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                }`}
              >
                <span>Étape suivante</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Right: Instant Objections Toolbox */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Antidote aux Objections (1 Clic)</span>
            </div>
            
            <p className="text-xs text-slate-400 mt-2 mb-3">
              Le prospect vous interrompt ? Cliquez immédiatement sur son objection pour avoir la réplique exacte sous les yeux :
            </p>

            {/* 3 Objections buttons */}
            <div className="space-y-2">
              {OBJECTIONS.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => setSelectedObjection(obj)}
                  className={`w-full p-3 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer flex flex-col gap-1 ${
                    selectedObjection?.id === obj.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                      : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{obj.objection}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </div>
                  <span className="text-[10px] opacity-75 font-normal">
                    {obj.summary}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Objection Rebuttal Display */}
            {selectedObjection && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-500/50 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-amber-400 uppercase">
                    Phrase Choc / Clé d'Or :
                  </span>
                  <button
                    onClick={() => setSelectedObjection(null)}
                    className="text-slate-400 hover:text-white text-xs p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="text-xs font-bold text-white bg-slate-900 p-2.5 rounded border border-slate-800">
                  {selectedObjection.goldenKey}
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold mb-1">
                    Script complet à lire au prospect :
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/50 p-2.5 rounded">
                    {selectedObjection.rebuttalScript}
                  </p>
                </div>
              </div>
            )}

            {/* In-Call Notepad */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <label className="text-xs text-slate-400 font-semibold block mb-1.5">
                Prise de notes en direct (problèmes cités, engins, etc.) :
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Le gérant mentionne 12 camions bennes, inspecteur WCS passé mardi dernier avec 1 avertissement..."
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
