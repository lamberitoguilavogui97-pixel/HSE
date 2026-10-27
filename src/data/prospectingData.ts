export interface ProspectingTemplate {
  id: string;
  type: 'whatsapp' | 'email';
  title: string;
  category: 'Accroche directe' | 'Audit initial';
  subject?: string;
  bodyTemplate: string;
  advice: string;
  cadenceNote: string;
}

export const PROSPECTING_TEMPLATES: ProspectingTemplate[] = [
  {
    id: 'wa-accroche-directe',
    type: 'whatsapp',
    title: 'WhatsApp : Accroche Directe (Gérants de PME)',
    category: 'Accroche directe',
    bodyTemplate: `Bonjour M./Mme {{NOM_GERANT}}, j'espère que vous vous portez bien.

Je suis {{MON_NOM}}, Directeur des opérations chez Simadou Safe Mine HSE à Conakry.

Nous accompagnons actuellement plusieurs PME sous-traitantes (transport, BTP, engins) actives sur le corridor Simandou (CTG / WCS / Rio Tinto Simfer) pour sécuriser leurs contrats et garantir leur conformité HSE stricte lors des audits inopinés.

Les donneurs d'ordre intensifient les contrôles sur piste et sur chantiers avec risque d'immobilisation de véhicules ou suspension de badges d'accès. 

Avez-vous 5 minutes cette semaine pour un échange rapide sur la mise à niveau de vos équipes à moindre coût ?

Bien cordialement,
{{MON_NOM}} - Simadou Safe Mine HSE
Tél/WhatsApp : {{MON_TEL}}`,
    advice: 'À envoyer le matin entre 7h30 et 9h30, direct au numéro WhatsApp du Directeur Général ou du Gérant.',
    cadenceNote: 'Cadence : 10 messages par jour. Relancer à J+3 avec le message "Audit Initial" si sans réponse.',
  },
  {
    id: 'wa-audit-initial',
    type: 'whatsapp',
    title: 'WhatsApp : Proposition Audit Initial & Diagnostic Risque',
    category: 'Audit initial',
    bodyTemplate: `Bonjour M./Mme {{NOM_GERANT}},

Suite à mon message précédent concernant les opérations de {{NOM_ENTREPRISE}} sur les axes du projet Simandou.

Pour vous éviter toute pénalité ou mauvaise surprise lors des audits des inspecteurs HSE (Simfer / WCS), nous proposons ce mois-ci un **Audit Initial de Conformité Flash (2h sur site)** à tarif préférentiel de lancement (100% déductible si nous collaborons par la suite).

Cet audit vous remet en 24h :
1. Le point exact sur vos 7 points éliminatoires
2. La liste des écarts urgents à corriger avant inspection
3. Le plan d'actions pour blinder votre dossier

Seriez-vous disponible ce {{JOUR_PROPOSE}} ou {{JOUR_ALTERNATIF}} pour caler cette visite sur votre base ?

Bien à vous,
{{MON_NOM}} - Simadou Safe Mine HSE
{{MON_TEL}}`,
    advice: 'Message de relance à envoyer 3 jours après le premier message, ciblé sur l’action et la levée d’un risque immédiat.',
    cadenceNote: 'Relance unique à J+3. Si pas de réponse après cela, passer un appel téléphonique de 15 min.',
  },
  {
    id: 'email-audit-initial',
    type: 'email',
    title: 'E-mail Officiel : Audit Initial de Pré-qualification Simandou',
    category: 'Audit initial',
    subject: `Sécurisation de vos contrats Simandou : Audit Initial de Conformité HSE pour {{NOM_ENTREPRISE}}`,
    bodyTemplate: `À l’attention de la Direction Générale,
M./Mme {{NOM_GERANT}},

Le projet Simandou entre dans une phase d’accélération décisive (pose de la voie ferrée CTG, infrastructures portuaires de Morebaya, terrassements miniers). Dans ce contexte, les donneurs d’ordre (Rio Tinto Simfer, Winning Consortium Simandou, Baowu) imposent une tolérance zéro sur la sécurité de leurs sous-traitants.

Un seul manquement HSE (défaut de causerie sécurité, équipement non inspecté, absence de plan de prévention validé) peut entraîner :
- L’arrêt immédiat de vos prestations sur site
- Des pénalités financières contractuelles
- La suspension temporaire ou définitive de vos badges d’accès au corridor

Le cabinet **Simadou Safe Mine HSE** est une structure spécialisée dédiée exclusivement à la réussite des PME locales guinéennes.

Nous vous proposons de réaliser un **Audit Initial de Conformité (Diagnostic Flash)** de votre base logistique ou de votre chantier. 

Ce diagnostic permet de :
• Identifier les écarts critiques avant le passage des inspecteurs clients
• Évaluer l’état de vos autorisations, contrôles réglementaires et formations du personnel
• Vous remettre une feuille de route claire et budgétisée pour être 100 % conforme

👉 **Offre Spéciale Corridor :** Le montant de cet audit initial est intégralement déduit de nos forfaits d'assistance mensuelle (à partir de 1 200 $/mois, avec 15 % de remise pour engagement annuel).

Seriez-vous ouvert à une brève entrevue téléphonique de 15 minutes ce {{JOUR_PROPOSE}} à 10h pour faire le point sur vos enjeux actuels ?

Dans l’attente de votre retour, veuillez agréer, Monsieur/Madame le Directeur Général, nos salutations respectueuses.

**{{MON_NOM}}**
Directeur Général / Consultant Senior HSE
Simadou Safe Mine HSE (Guinée)
📍 Siège : Camayenne, Conakry, Guinée • Antennes : Morebaya (Port) & Beyla (Mines)
📞 Hotline / WhatsApp : {{MON_TEL}}
✉️ Email : contact@simandousafepro.com`,
    advice: 'À envoyer en copie aux adresses génériques (direction@, contact@) et au gérant.',
    cadenceNote: 'Permet de formaliser la démarche après un premier contact WhatsApp.',
  },
];
