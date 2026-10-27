import React, { useState } from 'react';
import { PROSPECTING_TEMPLATES, ProspectingTemplate } from '../data/prospectingData';
import { INITIAL_PMES } from '../data/mockPmes';
import { PmeProspect, IndustrySector } from '../types';
import { MessageSquare, Mail, Copy, Check, ExternalLink, Filter, Search, Phone, Send, Clock, User, AlertCircle, Building2, Flame } from 'lucide-react';

interface ProspectingHubProps {
  onLaunchCallScript?: (pme: PmeProspect) => void;
}

export const ProspectingHub: React.FC<ProspectingHubProps> = ({ onLaunchCallScript }) => {
  const [pmes, setPmes] = useState<PmeProspect[]>(INITIAL_PMES);
  const [selectedPme, setSelectedPme] = useState<PmeProspect>(INITIAL_PMES[0]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('wa-accroche-directe');
  
  // Customization fields
  const [senderName, setSenderName] = useState('Directeur Simadou Safe Mine HSE');
  const [senderPhone, setSenderPhone] = useState('+224 624405552');
  const [proposedDay, setProposedDay] = useState('jeudi à 10h');
  const [altDay, setAltDay] = useState('vendredi à 14h30');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Daily tracker
  const [dailySentCount, setDailySentCount] = useState(4);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const selectedTemplate = PROSPECTING_TEMPLATES.find((t) => t.id === selectedTemplateId) || PROSPECTING_TEMPLATES[0];

  // Template interpolation
  const getRenderedBody = () => {
    return selectedTemplate.bodyTemplate
      .replace(/{{NOM_GERANT}}/g, selectedPme.managerName)
      .replace(/{{NOM_ENTREPRISE}}/g, selectedPme.companyName)
      .replace(/{{MON_NOM}}/g, senderName)
      .replace(/{{MON_TEL}}/g, senderPhone)
      .replace(/{{JOUR_PROPOSE}}/g, proposedDay)
      .replace(/{{JOUR_ALTERNATIF}}/g, altDay);
  };

  const getRenderedSubject = () => {
    if (!selectedTemplate.subject) return '';
    return selectedTemplate.subject
      .replace(/{{NOM_GERANT}}/g, selectedPme.managerName)
      .replace(/{{NOM_ENTREPRISE}}/g, selectedPme.companyName);
  };

  const handleCopyText = () => {
    const textToCopy = selectedTemplate.type === 'email'
      ? `Objet : ${getRenderedSubject()}\n\n${getRenderedBody()}`
      : getRenderedBody();
    navigator.clipboard.writeText(textToCopy);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handleSendViaWhatsApp = () => {
    const cleanPhone = selectedPme.phone.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(getRenderedBody());
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    window.open(waUrl, '_blank');
    
    // Auto update status if currently 'A_contacter'
    if (selectedPme.status === 'A_contacter') {
      updatePmeStatus(selectedPme.id, 'Message_envoye');
      setDailySentCount((prev) => Math.min(10, prev + 1));
    }
  };

  const updatePmeStatus = (pmeId: string, newStatus: PmeProspect['status']) => {
    setPmes((prev) =>
      prev.map((p) =>
        p.id === pmeId
          ? { ...p, status: newStatus, lastContactDate: new Date().toISOString().split('T')[0] }
          : p
      )
    );
    if (selectedPme.id === pmeId) {
      setSelectedPme((prev) => ({
        ...prev,
        status: newStatus,
        lastContactDate: new Date().toISOString().split('T')[0],
      }));
    }
  };

  // Filtered PMEs
  const filteredPmes = pmes.filter((p) => {
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.managerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'all' || p.sector === sectorFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesSector && matchesStatus;
  });

  const j3Count = pmes.filter((p) => p.status === 'Relance_J3').length;

  return (
    <div className="space-y-8 py-6">
      
      {/* Cadence Header & Tracker */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Machine Commerciale &amp; Cadence de Prospection</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-heading">
              Générateur de Messages &amp; Pipeline des 30 PME Ciblées
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Règle d'or : <strong>10 messages WhatsApp personnalisés par jour</strong> aux gérants, et <strong>une seule relance ciblée à J+3</strong>.
            </p>
          </div>

          {/* Daily Cadence Counter */}
          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Cadence Quotidienne :</span>
              <div className="text-xl font-black text-amber-400">
                {dailySentCount} <span className="text-xs text-slate-500 font-normal">/ 10 messages</span>
              </div>
            </div>
            <div className="w-24 bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-2.5 rounded-full transition-all"
                style={{ width: `${(dailySentCount / 10) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setDailySentCount((prev) => Math.min(10, prev + 1))}
              className="px-2.5 py-1 text-xs font-bold rounded bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer"
            >
              +1 envoyé
            </button>
          </div>
        </div>

        {/* J+3 Alert notification */}
        {j3Count > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-between text-xs text-red-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                <strong>{j3Count} PME nécessitent une relance à J+3 aujourd'hui</strong> (sans réponse depuis 72h).
              </span>
            </div>
            <button
              onClick={() => setStatusFilter('Relance_J3')}
              className="underline font-bold text-red-300 hover:text-white cursor-pointer"
            >
              Filtrer les PME à relancer →
            </button>
          </div>
        )}
      </div>

      {/* Main Workspace: Left Editor & Right Target Prospect */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Message Generator */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
            
            {/* Template Selector */}
            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-slate-800">
              {PROSPECTING_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedTemplateId === tmpl.id
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {tmpl.type === 'whatsapp' ? (
                    <MessageSquare className="w-3.5 h-3.5" />
                  ) : (
                    <Mail className="w-3.5 h-3.5" />
                  )}
                  <span>{tmpl.category}</span>
                </button>
              ))}
            </div>

            {/* Template Advice */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 mb-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">{selectedTemplate.title} :</strong> {selectedTemplate.advice}
                <div className="text-[11px] text-slate-400 mt-0.5">{selectedTemplate.cadenceNote}</div>
              </div>
            </div>

            {/* Customization variables inputs */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Votre Nom / Titre :</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Votre Téléphone / WhatsApp :</label>
                <input
                  type="text"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Créneau proposé 1 :</label>
                <input
                  type="text"
                  value={proposedDay}
                  onChange={(e) => setProposedDay(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Créneau alternatif :</label>
                <input
                  type="text"
                  value={altDay}
                  onChange={(e) => setAltDay(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                />
              </div>
            </div>

            {/* Rendered Text Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[360px] overflow-y-auto">
              {selectedTemplate.type === 'email' && (
                <div className="mb-3 pb-2 border-b border-slate-800 text-amber-300 font-bold">
                  Objet : {getRenderedSubject()}
                </div>
              )}
              {getRenderedBody()}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 mt-4">
              <span className="text-xs text-slate-400">
                Cible sélectionnée : <strong className="text-white">{selectedPme.companyName}</strong> ({selectedPme.managerName})
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyText}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copiedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copié dans le presse-papier !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copier le message</span>
                    </>
                  )}
                </button>

                {selectedTemplate.type === 'whatsapp' && (
                  <button
                    onClick={handleSendViaWhatsApp}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer sur WhatsApp</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right: Selected PME Card & Fast Status Switch */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Fiche Prospect Sélectionné
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Réf: {selectedPme.id}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedPme.companyName}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-slate-200">{selectedPme.managerName}</span> (Gérant)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Téléphone / WA :</span>
                  <a href={`tel:${selectedPme.phone}`} className="font-bold text-slate-200 hover:text-amber-400">
                    {selectedPme.phone}
                  </a>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Base / Localité :</span>
                  <span className="font-bold text-slate-200">{selectedPme.city}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Donneur d'ordre :</span>
                  <span className="font-bold text-amber-300">{selectedPme.primaryClient}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Effectif / Engins :</span>
                  <span className="font-bold text-slate-200">{selectedPme.workforce} sal. / {selectedPme.equipmentCount} engins</span>
                </div>
              </div>

              {selectedPme.notes && (
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-amber-400 block text-[10px] uppercase mb-0.5">Note terrain :</strong>
                  {selectedPme.notes}
                </div>
              )}

              {/* Status updater */}
              <div className="pt-2">
                <label className="text-xs text-slate-400 font-medium block mb-1.5">
                  Mettre à jour le statut du prospect :
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    onClick={() => updatePmeStatus(selectedPme.id, 'Message_envoye')}
                    className={`py-1.5 px-2 rounded font-semibold text-left border cursor-pointer ${
                      selectedPme.status === 'Message_envoye'
                        ? 'bg-blue-600 text-white border-blue-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    1. Message envoyé
                  </button>
                  <button
                    onClick={() => updatePmeStatus(selectedPme.id, 'Relance_J3')}
                    className={`py-1.5 px-2 rounded font-semibold text-left border cursor-pointer ${
                      selectedPme.status === 'Relance_J3'
                        ? 'bg-amber-600 text-white border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    2. Relance J+3
                  </button>
                  <button
                    onClick={() => updatePmeStatus(selectedPme.id, 'Appel_effectue')}
                    className={`py-1.5 px-2 rounded font-semibold text-left border cursor-pointer ${
                      selectedPme.status === 'Appel_effectue'
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    3. Appel 15 min fait
                  </button>
                  <button
                    onClick={() => updatePmeStatus(selectedPme.id, 'Audit_cale')}
                    className={`py-1.5 px-2 rounded font-semibold text-left border cursor-pointer ${
                      selectedPme.status === 'Audit_cale'
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    4. Audit Initial calé
                  </button>
                </div>
              </div>

              {/* Action to switch to call script */}
              {onLaunchCallScript && (
                <button
                  onClick={() => onLaunchCallScript(selectedPme)}
                  className="w-full mt-3 py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Lancer le Script d'Appel 15 Min pour ce client</span>
                </button>
              )}

            </div>
          </div>
        </div>

      </div>

      {/* 30 PME Pipeline Table */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>Base Stratégique des 30 PME Sous-traitantes du Corridor</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cibles identifiées sur le tracé ferroviaire CTG, les bases de Morebaya, Mamou et Beyla.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher PME ou gérant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            >
              <option value="all">Tous secteurs (30)</option>
              <option value="transport">Transport (7)</option>
              <option value="btp">BTP &amp; Voie (6)</option>
              <option value="engins">Engins (6)</option>
              <option value="gardiennage">Gardiennage (6)</option>
              <option value="restauration">Restauration (5)</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            >
              <option value="all">Tous statuts</option>
              <option value="A_contacter">À contacter</option>
              <option value="Message_envoye">Message envoyé</option>
              <option value="Relance_J3">Relance J+3 requise</option>
              <option value="Appel_effectue">Appel effectué</option>
              <option value="Audit_cale">Audit initial calé</option>
              <option value="Devis_envoye">Devis envoyé</option>
              <option value="Signe_Actif">Signé / Actif</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Entreprise &amp; Secteur</th>
                <th className="py-3 px-4">Gérant &amp; Contact</th>
                <th className="py-3 px-4">Ville / Base</th>
                <th className="py-3 px-4">Donneur d'Ordre</th>
                <th className="py-3 px-4">Statut Prospection</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredPmes.map((p) => {
                const isCurrent = selectedPme.id === p.id;
                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPme(p)}
                    className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                      isCurrent ? 'bg-amber-500/10' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{p.companyName}</div>
                      <span className="text-[10px] text-amber-400 capitalize">{p.sector}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-200">{p.managerName}</div>
                      <div className="text-[11px] text-slate-400">{p.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                        {p.city}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 text-[11px]">
                      {p.primaryClient}
                    </td>
                    <td className="py-3 px-4">
                      {p.status === 'Signe_Actif' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          ✓ Signé (Actif)
                        </span>
                      )}
                      {p.status === 'Relance_J3' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                          ⚠ Relance J+3
                        </span>
                      )}
                      {p.status === 'Audit_cale' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          📅 Audit calé
                        </span>
                      )}
                      {p.status === 'Message_envoye' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300">
                          Envoyé (attente J+3)
                        </span>
                      )}
                      {p.status === 'A_contacter' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-400">
                          À contacter
                        </span>
                      )}
                      {p.status === 'Appel_effectue' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Appel 15 min fait
                        </span>
                      )}
                      {p.status === 'Devis_envoye' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Devis envoyé
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPme(p);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 transition-colors text-slate-200 cursor-pointer"
                      >
                        Sélectionner
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
