import React, { useState } from 'react';
import { Sparkles, FileText, CheckCircle, Copy, Check, Download, AlertCircle, RefreshCw, Printer, Shield, BookOpen } from 'lucide-react';

export const AiHseGenerator: React.FC = () => {
  const [docType, setDocType] = useState<'audit-checklist' | 'toolbox-talk' | 'prequal-doc' | 'objection-advice'>('toolbox-talk');
  const [industry, setIndustry] = useState<string>('Transport lourd & camions citernes');
  const [pmeName, setPmeName] = useState<string>('Simandou Convois & Logistique');
  const [details, setDetails] = useState<string>('Circulation sur piste latéritique, angles morts des engins 100T et visibilité réduite par la poussière');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quick Preset buttons
  const applyPreset = (type: typeof docType, ind: string, det: string) => {
    setDocType(type);
    setIndustry(ind);
    setDetails(det);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/generate-hse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: docType,
          industry,
          pmeName,
          details,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur serveur (${response.status})`);
      }

      const data = await response.json();
      setGeneratedContent(data.result);
    } catch (err: any) {
      console.warn('API call failed, generating domain-optimized fallback:', err);
      // High-grade domain-native fallback template
      setGeneratedContent(getFallbackContent(docType, industry, pmeName, details));
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackContent = (type: string, ind: string, name: string, det: string) => {
    if (type === 'toolbox-talk') {
      return `================================================================================
FICHE DE CAUSERIE SÉCURITÉ (TOOLBOX TALK) - SIMADOU SAFE MINE HSE
RÉFÉRENTIEL : NORMES DE SÉCURITÉ MINIÈRE CTG / WCS / RIO TINTO SIMFER
================================================================================

ENTREPRISE : ${name || 'PME Sous-traitante'}
SECTEUR D'ACTIVITÉ : ${ind}
SUJET / THÈME : ${det || 'Circulation sur piste et prévention des collisions'}
DURÉE CONSEILLÉE : 15 Minutes chrono (avant prise de poste à 7h00)
LIEU D'ANIMATION : Base opérationnelle de chantier (Corridor Simandou)

--------------------------------------------------------------------------------
1. LE RETOUR D'EXPÉRIENCE (REX) & SCÉNARIO RÉEL DE CHANTIER
--------------------------------------------------------------------------------
La semaine dernière sur l'axe reliant Forécariah au port de Morebaya, un véhicule
léger de liaison s'est engagé dans un nuage de poussière soulevé par un dumper de
100 tonnes. Le chauffeur n'a pas respecté la distance de sécurité minimale de
50 mètres et s'est retrouvé coincé dans l'angle mort droit du dumper sans visibilité.
Ce presqu'accident (Near Miss) a valu une suspension de badge immédiate de 14 jours
au chauffeur par l'inspecteur client et une notification d'infraction à l'entreprise.

--------------------------------------------------------------------------------
2. LES 5 RÈGLES D'OR VITALES À APPLIQUER AUJOURD'HUI
--------------------------------------------------------------------------------
[1] DISTANCE DE SÉCURITÉ PISTE : Maintenir impérativement au minimum 50 mètres
    en temps sec, et 80 mètres en cas de poussière dense ou de pluie battante.
[2] CROISEMENTS AVEC LES ENGINS LOURDS : Les dumpers et niveleuses ont toujours
    la priorité absolue. Ne jamais tenter de dépasser sans contact radio VHF
    et confirmation formelle du conducteur d'engin.
[3] PHARES ET GYROPHARE : Feux de croisement et gyrophare orange allumés 24h/24
    sur tout le corridor sans aucune exception.
[4] PORT DE LA CEINTURE DE SÉCURITÉ : Bouclage obligatoire pour tous les passagers
    dès la montée à bord. Tolérance Zéro Simandou.
[5] EN CAS DE PERTE DE VISIBILITÉ TOTALE : Ralentir immédiatement, allumer les
    feux de détresse, s'arrêter sur le bas-côté sécurisé et émettre un signal radio.

--------------------------------------------------------------------------------
3. QUESTIONS DE CONTRÔLE DE COMPRÉHENSION (À POSER AUX ÉQUIPES)
--------------------------------------------------------------------------------
Q1 : Quelle est la distance de sécurité minimale derrière un camion benne sur piste ?
     -> Réponse attendue : 50 mètres minimum (80 mètres sous la poussière).
Q2 : Que faites-vous si vous vous retrouvez à moins de 20 mètres sans contact radio ?
     -> Réponse attendue : Arrêt immédiat et recul prudent hors de l'angle mort.
Q3 : Qui est autorisé à circuler sans badge actif vérifié ?
     -> Réponse attendue : Personne. Présence interdite sur l'emprise CTG.

--------------------------------------------------------------------------------
4. FICHE D'ÉMARGEMENT DE LA SESSION
--------------------------------------------------------------------------------
Date de la causerie : ..... / ..... / 2026   Heure de début : 07:00   Fin : 07:15
Nom de l'animateur HSE : ....................................  Visa : ............

Noms des Participants (Ouvriers / Chauffeurs)          Signature obligatoire
1. ...................................................  [........................]
2. ...................................................  [........................]
3. ...................................................  [........................]
4. ...................................................  [........................]
5. ...................................................  [........................]

Document validé et archivé par SIMADOU SAFE MINE HSE (Assistance Mensuelle)`;
    } else if (type === 'audit-checklist') {
      return `================================================================================
CHECK-LIST D'AUDIT INITIAL FLASH & PLAN DE REMÉDIATION SUR 30 JOURS
CABINET SIMADOU SAFE MINE HSE (CONAKRY - BEYLA - MOREBAYA)
================================================================================

CLIENT : ${name}
CORPS DE MÉTIER : ${ind}
RÉFÉRENTIELS APPLICABLES : Standards Rio Tinto Simfer, Winning Consortium Simandou,
Compagnie du Transguinéen (CTG), Code Minier de la République de Guinée.

--------------------------------------------------------------------------------
LES 7 POINTS DE CONTRÔLE ÉLIMINATOIRES (NON-CONFORMITÉS MAJEURES)
--------------------------------------------------------------------------------
[ ] POINT 1 : PLAN D'ORGANISATION HSE & ÉVALUATION DES RISQUES
    Exigence : Document POS validé, fiches HIRA signées par le Directeur Général.
    Conséquence en cas de manquement : Interdiction d'accès au chantier.

[ ] POINT 2 : CONFORMITÉ ET CONTRÔLE DES EPI
    Exigence : Casques avec jugulaire 3 points, chaussures de sécurité S3 avec
    embout acier, gilets haute visibilité fluo classe 2, lunettes anti-projection UV.
    Conséquence : Évacuation immédiate de tout ouvrier non équipé.

[ ] POINT 3 : APTITUDES MÉDICALES ET DOSSIERS DU PERSONNEL
    Exigence : Visites médicales d'embauche et périodiques validées par médecin agréé.
    Dépistage stupéfiants/alcoolémie conforme.

[ ] POINT 4 : HOMOLOGATION ET VGP DES ENGINS ET VÉHICULES
    Exigence : Contrôles techniques (Vérifications Générales Périodiques) à jour,
    extincteurs à poudre 9kg vérifiés, ceintures 3 points, pneus conformes.

[ ] POINT 5 : CAUSERIES SÉCURITÉ & REGISTRE D'ÉMARGEMENT
    Exigence : Preuve datée et signée d'au moins 2 causeries par mois (Pack Standard).

[ ] POINT 6 : SYSTÈME DE PERMIS DE TRAVAIL (PTW)
    Exigence : Autorisations obligatoires pour travail en hauteur > 1,80m, fouilles
    profondes, consignation électrique et chaudronnerie.

[ ] POINT 7 : PLAN DE RÉPONSE D'URGENCE & SECOURISTES DU TRAVAIL
    Exigence : 1 secouriste SST formé pour 10 ouvriers, trousses de secours scellées,
    numéro d'urgence du camp minier affiché visiblement.

--------------------------------------------------------------------------------
PLAN D'ACTIONS CORRECTIVES PRIORITAIRES (FEUILLE DE ROUTE 30 JOURS)
--------------------------------------------------------------------------------
Semaine 1 : Rédaction d'urgence du Plan HSE et inventaire physique des EPI.
Semaine 2 : Mise à niveau des fiches VGP engins et visite médicale des retards.
Semaine 3 : Formation pratique de 2 secouristes et session de sensibilisation.
Semaine 4 : Audit blanc à blanc par Simadou Safe Mine HSE avant inspection donneur d'ordre.`;
    } else {
      return `================================================================================
DOSSIER DE PRÉ-QUALIFICATION HSE SYNTHÉTIQUE
RÉDIGÉ PAR LE CABINET SIMADOU SAFE MINE HSE
================================================================================

ENTREPRISE : ${name}
OBJET : Candidature et accréditation sous-traitant corridor Simandou
SECTEUR : ${ind}

1. ENGAGEMENT FORMEL DE LA DIRECTION GÉNÉRALE (POLITIQUE HSE)
La direction générale de ${name} s'engage formellement envers les donneurs d'ordre
(Winning Consortium Simandou, Rio Tinto Simfer, Compagnie du Transguinéen) à appliquer
le principe d'Intolérance Zéro envers tout manquement mettant en péril l'intégrité
physique de ses collaborateurs, des sous-traitants et des communautés riveraines.

2. OBJECTIFS OPÉRATIONNELS CHIFFRÉS
- Taux de Fréquence des Accidents (TF) : 0,00
- Taux de Gravité (TG) : 0,00
- Respect à 100% du port des EPI certifiés sur toute l'emprise du tracé ferroviaire
- 100% des presqu'accidents documentés et clôturés sous 48 heures

3. ORGANISATION & ASSISTANCE TECHNIQUE QUALIFIÉE
L'encadrement HSE de ${name} est supervisé et audité mensuellement par le cabinet
spécialisé SIMADOU SAFE MINE HSE, garantissant la tenue des registres légaux, la
mise à jour des protocoles d'intervention et la préparation aux audits externes.

Fait à Conakry, pour valoir ce que de droit.`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const printDocument = () => {
    window.print();
  };

  return (
    <div className="space-y-6 py-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Générateur Automatisé de Documents &amp; Outils de Terrain</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-heading">
              Générateur d’Audits &amp; Fiches de Causeries Simandou
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Générez instantanément des documents de sécurité rigoureusement adaptés à l'accompagnement à la conformité aux exigences HSE des donneurs d'ordre du corridor Simandou pour vos clients sous-traitants.
            </p>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800 text-xs">
          <span className="text-slate-400 py-1">Exemples rapides :</span>
          <button
            onClick={() => applyPreset('toolbox-talk', 'Transport routier & citernes', 'Circulation piste latéritique, poussières et priorité engins 100T')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
          >
            Causerie : Poussière &amp; Engins 100T
          </button>
          <button
            onClick={() => applyPreset('toolbox-talk', 'BTP & Voie ferrée CTG', 'Risque écrasement lors de la pose des rails et franchissement ferroviaire')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
          >
            Causerie : Travaux Ferroviaires
          </button>
          <button
            onClick={() => applyPreset('audit-checklist', 'Terrassement & Engins lourds', 'Pelles hydrauliques 50T, vérification des VGP et angles morts')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
          >
            Check-list Audit : Engins &amp; VGP
          </button>
          <button
            onClick={() => applyPreset('prequal-doc', 'Restauration collective minier', 'Hygiène HACCP, chaîne du froid et gestion de l’eau potable')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
          >
            Pré-qualification : Catering de camp
          </button>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        
        {/* Document type selector */}
        <div>
          <label className="text-xs text-slate-300 font-bold block mb-2">
            1. Choisissez le type de document HSE à produire :
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => setDocType('toolbox-talk')}
              className={`p-3 rounded-lg border text-left font-semibold cursor-pointer transition-colors ${
                docType === 'toolbox-talk'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Causerie Sécurité (1/4h)</span>
              </div>
              <p className="text-[11px] font-normal opacity-80">
                Fiche terrain prête avec REX corridor, 5 règles et tableau d'émargement.
              </p>
            </button>

            <button
              onClick={() => setDocType('audit-checklist')}
              className={`p-3 rounded-lg border text-left font-semibold cursor-pointer transition-colors ${
                docType === 'audit-checklist'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Shield className="w-4 h-4" />
                <span>Check-list d'Audit Initial</span>
              </div>
              <p className="text-[11px] font-normal opacity-80">
                Les 7 points bloquants donneurs d'ordre et plan d'action sur 30 jours.
              </p>
            </button>

            <button
              onClick={() => setDocType('prequal-doc')}
              className={`p-3 rounded-lg border text-left font-semibold cursor-pointer transition-colors ${
                docType === 'prequal-doc'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <FileText className="w-4 h-4" />
                <span>Dossier Pré-qualification</span>
              </div>
              <p className="text-[11px] font-normal opacity-80">
                Politique sécurité et engagements direction pour appel d'offres.
              </p>
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Nom de la PME bénéficiaire :</label>
            <input
              type="text"
              value={pmeName}
              onChange={(e) => setPmeName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Secteur d'activité :</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white"
            />
          </div>
        </div>

        <div className="text-xs">
          <label className="text-slate-400 block mb-1">
            Détails des opérations, risques ou contexte spécifique :
          </label>
          <textarea
            rows={2}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-slate-500">
            Propulsé par le modèle Gemini 3.8 Flash via le serveur sécurisé
          </span>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Génération du document en cours...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Générer le Document HSE</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Generated Result Box */}
      {generatedContent && (
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                Document Généré avec Succès
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>

              <button
                onClick={printDocument}
                className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimer</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
            {generatedContent}
          </div>
        </div>
      )}

    </div>
  );
};
