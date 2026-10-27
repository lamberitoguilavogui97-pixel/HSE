import React, { useState } from 'react';
import { PRICING_PLANS, A_LA_CARTE_SERVICES, CONTRACT_DISCOUNT_PERCENT } from '../data/pricingData';
import { PricingPlan, ALaCarteService } from '../types';
import { Check, Shield, FileText, Calculator, Sparkles, Printer, ArrowRight, Info, AlertTriangle, Download } from 'lucide-react';

interface PricingCalculatorProps {
  onSelectForProposal?: (plan: PricingPlan) => void;
  onOpenAuditRequest?: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onOpenAuditRequest }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [is12MonthsCommitment, setIs12MonthsCommitment] = useState(true);
  const [selectedServices, setSelectedServices] = useState<Record<string, { enabled: boolean; quantity: number; customPrice?: number }>>({
    'audit-initial': { enabled: true, quantity: 1, customPrice: 750 },
    'formations': { enabled: false, quantity: 20, customPrice: 150 },
  });

  const [companyName, setCompanyName] = useState('Votre PME Sous-traitante');
  const [sectorName, setSectorName] = useState('Transport & Logistique');
  const [managerName, setManagerName] = useState('Directeur Général');
  const [showDevisModal, setShowDevisModal] = useState(false);

  const selectedPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];

  // Price calculations
  const rawPlanPrice = selectedPlan.monthlyPrice;
  const planDiscountFactor = is12MonthsCommitment ? (1 - CONTRACT_DISCOUNT_PERCENT / 100) : 1;
  const effectiveMonthlyPlanPrice = Math.round(rawPlanPrice * planDiscountFactor);
  const monthlySavings = rawPlanPrice - effectiveMonthlyPlanPrice;
  const annualPlanPrice = effectiveMonthlyPlanPrice * 12;

  // À la carte calculations
  const calculateServiceTotal = (serv: ALaCarteService) => {
    const state = selectedServices[serv.id];
    if (!state?.enabled) return 0;
    const price = state.customPrice || serv.minPrice;
    return price * (state.quantity || 1);
  };

  const aLaCarteTotal = A_LA_CARTE_SERVICES.reduce((acc, serv) => acc + calculateServiceTotal(serv), 0);

  const toggleService = (id: string, defaultPrice: number) => {
    setSelectedServices((prev) => ({
      ...prev,
      [id]: {
        enabled: !prev[id]?.enabled,
        quantity: prev[id]?.quantity || (id === 'formations' ? 20 : 1),
        customPrice: prev[id]?.customPrice || defaultPrice,
      },
    }));
  };

  const updateServiceQty = (id: string, qty: number) => {
    setSelectedServices((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: Math.max(1, qty),
      },
    }));
  };

  const printProposal = () => {
    window.print();
  };

  return (
    <section id="tarifs" className="py-12 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Grille Tarifaire Officielle • Conforme Exigences Donneurs d’Ordre</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
            Forfaits d’Assistance HSE &amp; Prestations à la Carte
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Des formules souples taillées pour les PME sous-traitantes du tracé Simandou. Déduisez 100% de votre audit initial et bénéficiez de 15% de réduction avec l'engagement annuel.
          </p>

          {/* 12-month commitment banner toggle */}
          <div className="mt-6 inline-flex items-center p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => setIs12MonthsCommitment(false)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                !is12MonthsCommitment
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sans engagement (Mois par mois)
            </button>
            <button
              onClick={() => setIs12MonthsCommitment(true)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                is12MonthsCommitment
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Engagement 12 Mois</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-slate-950 text-amber-300">
                -15% Réduction
              </span>
            </button>
          </div>
        </div>

        {/* 3 Main Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PRICING_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const effectivePrice = is12MonthsCommitment
              ? Math.round(plan.monthlyPrice * (1 - CONTRACT_DISCOUNT_PERCENT / 100))
              : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`rounded-2xl p-6 transition-all relative flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10 ring-2 ring-amber-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase bg-amber-500 text-slate-950 shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white font-heading">{plan.name}</h3>
                  </div>

                  <p className="text-xs text-slate-400 min-h-[36px] mb-4">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="py-3 px-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white">
                        {effectivePrice.toLocaleString('fr-FR')} $
                      </span>
                      <span className="text-xs text-slate-400">/ mois</span>
                      {is12MonthsCommitment && (
                        <span className="text-xs line-through text-slate-500 ml-auto">
                          {plan.monthlyPrice.toLocaleString('fr-FR')} $
                        </span>
                      )}
                    </div>
                    {is12MonthsCommitment && (
                      <p className="text-[11px] text-emerald-400 font-medium mt-1">
                        Économisez {(plan.monthlyPrice - effectivePrice).toLocaleString('fr-FR')} $/mois (engagement 12 mois)
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Inclus au forfait :
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 mb-4">
                    <strong className="text-slate-300">Idéal pour :</strong> {plan.idealFor}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlanId(plan.id);
                      setShowDevisModal(true);
                    }}
                    className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <span>Générer le Devis Officiel</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* À La Carte Section & Custom Builder */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 lg:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Prestations à la Carte &amp; Missions Ponctuelles</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Complétez votre contrat selon vos exigences chantiers
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Total à la carte sélectionné :</span>
              <span className="text-lg font-bold text-amber-400">
                {aLaCarteTotal.toLocaleString('fr-FR')} $
              </span>
            </div>
          </div>

          {/* Special banner: Audit initial porte d'entrée */}
          <div className="my-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-300">
                  Audit Initial Flash (Porte d’entrée recommandée) : 500 $ à 1 000 $
                </h4>
                <p className="text-xs text-slate-300">
                  Visite de diagnostic de vos 7 points éliminatoires sur site. <strong className="text-white">100% déductible</strong> de votre première facture si vous souscrivez un forfait mensuel !
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleService('audit-initial', 750)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                selectedServices['audit-initial']?.enabled
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              }`}
            >
              {selectedServices['audit-initial']?.enabled ? '✓ Ajouté au devis (750 $)' : '+ Ajouter au devis'}
            </button>
          </div>

          {/* List of à la carte services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {A_LA_CARTE_SERVICES.map((serv) => {
              const isChecked = !!selectedServices[serv.id]?.enabled;
              const isTraining = serv.id === 'formations';
              const state = selectedServices[serv.id];

              return (
                <div
                  key={serv.id}
                  onClick={() => toggleService(serv.id, (serv.minPrice + serv.maxPrice) / 2)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isChecked
                      ? 'bg-slate-800/90 border-amber-500/70 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-bold text-sm text-slate-100">{serv.name}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent onClick
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                      {serv.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs text-slate-400">{serv.unit}</span>
                      <span className="text-sm font-extrabold text-amber-400">
                        {serv.minPrice} $ - {serv.maxPrice} $
                      </span>
                    </div>

                    {isTraining && isChecked && (
                      <div className="mt-2 p-2 rounded bg-slate-900 border border-slate-700 text-xs" onClick={(e) => e.stopPropagation()}>
                        <label className="text-slate-300 font-medium block mb-1">
                          Nombre d'ouvriers / stagiaires :
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="5"
                            max="50"
                            step="5"
                            value={state?.quantity || 20}
                            onChange={(e) => updateServiceQty(serv.id, Number(e.target.value))}
                            className="w-full accent-amber-500"
                          />
                          <span className="font-bold text-amber-400 min-w-[50px] text-right">
                            {state?.quantity || 20} pers
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                          <span>Sous-total formation :</span>
                          <span className="font-bold text-white">
                            {((state?.customPrice || 150) * (state?.quantity || 20)).toLocaleString('fr-FR')} $
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick summary strip */}
          <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">Synthèse de votre configuration :</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5">
                Forfait {selectedPlan.name} ({effectiveMonthlyPlanPrice.toLocaleString('fr-FR')} $/mois)
                {aLaCarteTotal > 0 && ` + ${aLaCarteTotal.toLocaleString('fr-FR')} $ de prestations ponctuelles`}
              </div>
            </div>

            <button
              onClick={() => setShowDevisModal(true)}
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Générer le Contrat / Devis Officiel</span>
            </button>
          </div>
        </div>

      </div>

      {/* Official Devis / Contract Modal */}
      {showDevisModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Modal top bar */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">
                  Devis Officiel &amp; Proposition Commerciale HSE
                </h3>
              </div>
              <button
                onClick={() => setShowDevisModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Editable Fields for Proposal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nom de l'Entreprise :</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Secteur d'activité :</label>
                <select
                  value={sectorName}
                  onChange={(e) => setSectorName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-medium"
                >
                  <option value="Transport & Logistique">Transport Lourd &amp; Convois</option>
                  <option value="BTP & Génie Civil">BTP &amp; Voie ferrée CTG</option>
                  <option value="Catering & Restauration">Catering Minier &amp; Campements</option>
                  <option value="Sécurité & Gardiennage">Sécurité &amp; Gardiennage</option>
                  <option value="Engins Lourds">Engins de terrassement &amp; Levage</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Interlocuteur :</label>
                <input
                  type="text"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white font-medium"
                />
              </div>
            </div>

            {/* Printable Devis Layout */}
            <div id="printable-devis" className="p-6 rounded-xl bg-white text-slate-900 space-y-5 text-xs shadow-inner">
              {/* Devis Header */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <div className="text-base font-extrabold text-slate-950 tracking-tight">
                    SIMADOU SAFE MINE HSE
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    Cabinet de Conseil &amp; Solutions HSE Corridor Minier
                  </div>
                  <div className="text-slate-500 text-[10px] mt-1">
                    Siège : Camayenne, Conakry, Guinée • Antennes : Morebaya (Port) &amp; Beyla (Mines)<br />
                    Hotline : +224 624405552 | contact@simandousafepro.com
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-amber-600 uppercase">
                    PROPOSITION COMMERCIALE N° {new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}
                  </div>
                  <div className="text-slate-500 text-[10px]">
                    Date d’émission : {new Date().toLocaleDateString('fr-FR')}
                  </div>
                  <div className="text-slate-500 text-[10px]">
                    Validité : 30 jours
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded border border-slate-200 text-[11px]">
                <div>
                  <strong className="text-slate-700 block text-[10px] uppercase">Client Bénéficiaire :</strong>
                  <div className="font-bold text-slate-900 text-xs">{companyName}</div>
                  <div className="text-slate-600">Activité : {sectorName}</div>
                  <div className="text-slate-600">À l’attention de : {managerName}</div>
                </div>
                <div>
                  <strong className="text-slate-700 block text-[10px] uppercase">Projet &amp; Référentiel Client :</strong>
                  <div className="text-slate-800 font-semibold">Projet Minier Simandou (Guinée)</div>
                  <div className="text-slate-600">Standards : Rio Tinto Simfer / WCS / CTG</div>
                  <div className="text-slate-600">Engagement : {is12MonthsCommitment ? '12 Mois (-15% appliqué)' : 'Mensuel sans engagement'}</div>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full border-collapse text-left text-[11px]">
                <thead>
                  <tr className="border-b-2 border-slate-800 bg-slate-100 text-slate-800">
                    <th className="py-2 px-2 font-bold">Désignation de la Prestation</th>
                    <th className="py-2 px-2 font-bold text-center">Périodicité</th>
                    <th className="py-2 px-2 font-bold text-right">Tarif Brut</th>
                    <th className="py-2 px-2 font-bold text-right">Remise (-15%)</th>
                    <th className="py-2 px-2 font-bold text-right">Montant Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2.5 px-2">
                      <div className="font-bold text-slate-900">{selectedPlan.name} - Assistance HSE Dédiée</div>
                      <div className="text-slate-600 text-[10px]">{selectedPlan.features.slice(0, 3).join(' • ')}</div>
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-700">Mensuel</td>
                    <td className="py-2.5 px-2 text-right text-slate-700">{selectedPlan.monthlyPrice} $</td>
                    <td className="py-2.5 px-2 text-right text-emerald-600 font-semibold">
                      {is12MonthsCommitment ? `-${monthlySavings} $` : '0 $'}
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900">{effectiveMonthlyPlanPrice} $</td>
                  </tr>

                  {/* Selected à la carte */}
                  {A_LA_CARTE_SERVICES.filter((s) => selectedServices[s.id]?.enabled).map((serv) => {
                    const st = selectedServices[serv.id];
                    const tot = calculateServiceTotal(serv);
                    return (
                      <tr key={serv.id}>
                        <td className="py-2.5 px-2">
                          <div className="font-bold text-slate-900">{serv.name}</div>
                          <div className="text-slate-600 text-[10px]">
                            {serv.id === 'formations' ? `${st.quantity} participants prévus` : serv.description}
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-center text-slate-700">Ponctuel</td>
                        <td className="py-2.5 px-2 text-right text-slate-700">{tot} $</td>
                        <td className="py-2.5 px-2 text-right text-slate-500">-</td>
                        <td className="py-2.5 px-2 text-right font-bold text-slate-900">{tot} $</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Total Summary */}
              <div className="border-t-2 border-slate-300 pt-3 flex justify-between items-start">
                <div className="max-w-xs text-[10px] text-slate-500">
                  <strong>Clause d’Audit Initial :</strong> En cas de souscription au forfait mensuel, le coût de l'audit initial (750 $) est intégralement déduit de la facture du premier mois.
                </div>
                <div className="space-y-1 text-right min-w-[200px]">
                  <div className="flex justify-between text-slate-700 text-xs">
                    <span>Abonnement Mensuel :</span>
                    <span className="font-bold">{effectiveMonthlyPlanPrice} $ / mois</span>
                  </div>
                  {aLaCarteTotal > 0 && (
                    <div className="flex justify-between text-slate-700 text-xs">
                      <span>Total Missions Initiales :</span>
                      <span className="font-bold">{aLaCarteTotal} $</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-950 font-black text-sm border-t border-slate-300 pt-1">
                    <span>Total Engagement Annuel :</span>
                    <span className="text-amber-600">{annualPlanPrice + aLaCarteTotal} $</span>
                  </div>
                </div>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200 text-[10px]">
                <div className="border border-slate-300 p-3 rounded h-24">
                  <div className="font-bold text-slate-700">Pour le Cabinet Simadou Safe Mine HSE :</div>
                  <div className="text-slate-500 mt-1">« Bon pour accord et mise à disposition des consultants »</div>
                </div>
                <div className="border border-slate-300 p-3 rounded h-24">
                  <div className="font-bold text-slate-700">Pour l'Entreprise {companyName} :</div>
                  <div className="text-slate-500 mt-1">« Lu et approuvé, bon pour commande »</div>
                  <div className="text-slate-400 mt-4 text-[9px]">(Signature et cachet du Gérant)</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowDevisModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Fermer
              </button>
              <button
                onClick={printProposal}
                className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer / Sauvegarder en PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
