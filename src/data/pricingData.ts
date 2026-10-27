import { PricingPlan, ALaCarteService } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Pack Basic',
    monthlyPrice: 1200,
    highlight: false,
    description: 'Conformité minimale pour petites structures ou sous-traitants de rang 2 avec risques modérés.',
    badge: 'Démarrage & Maintien',
    features: [
      '1 visite terrain mensuelle d’inspection de conformité',
      'Mise à jour annuelle des documents réglementaires et procédures',
      'Rapport synthétique mensuel d’écarts & plan d’actions',
      'Assistance téléphonique d’urgence aux heures ouvrées',
      'Attestation de suivi HSE pour dossier administratif',
    ],
    deliverables: [
      'Rapport d’inspection mensuel (format PDF donneur d’ordre)',
      'Registre de sécurité numérique à jour',
      'Fiche de suivi des non-conformités'
    ],
    idealFor: 'PME de 5 à 15 salariés (gardiennage léger, approvisionnement, petits prestataires)',
  },
  {
    id: 'standard',
    name: 'Pack Standard',
    monthlyPrice: 2500,
    highlight: true,
    description: 'La formule de référence pour les sous-traitants actifs sur le corridor ferroviaire et les chantiers.',
    badge: 'Le Plus Populaire (Recommandé)',
    features: [
      'Présence terrain dédiée : 1 jour par semaine sur votre chantier',
      '2 causeries sécurité (Toolbox Talks) animées par mois',
      'Rapport complet de suivi HSE avec indicateurs clés',
      'Suivi rigoureux et clôture documentée des incidents/presqu’accidents',
      'Contrôle hebdomadaire du port des EPI et des autorisations d’engins',
      'Mise à jour trimestrielle du Plan d’Organisation HSE',
    ],
    deliverables: [
      'Fiches d’émargement des causeries signées',
      'Rapports d’incidents formels (format Rio Tinto / WCS)',
      'Tableau de bord de conformité pour réunions de chantier',
      'Rapport mensuel validé par Ingénieur HSE'
    ],
    idealFor: 'PME de 15 à 60 salariés (Transport de personnel/matériaux, BTP, Catering de base vie)',
  },
  {
    id: 'premium',
    name: 'Pack Premium',
    monthlyPrice: 4000,
    highlight: false,
    description: 'Pilotage complet et protection maximale pour les opérations à haut risque et gros contrats miniers.',
    badge: 'Excellence & Zéro Écart',
    features: [
      'Présence terrain intensive : 2 à 3 jours par semaine',
      'Causeries sécurité hebdomadaires systématiques avec fiches d’émargement',
      'Tableau de bord complet des KPI (TF, TG, LTIFR, Presqu’accidents)',
      'Enquêtes approfondies post-incident avec méthode de l’arbre des causes',
      'Préparation directe et accompagnement physique lors des audits clients (Simfer / WCS / CTG)',
      'Veille réglementaire continue et alertes instantanées',
      'Numéro d’astreinte HSE 24h/24 et 7j/7 pour la direction',
    ],
    deliverables: [
      'Dossier d’audit blanc complet trimestriel',
      'Arbre des causes et plans de remédiation en cas d’incident',
      'Reporting hebdomadaire pour le donneur d’ordre',
      'Accompagnement en face-à-face des inspecteurs de mine'
    ],
    idealFor: 'PME de plus de 50 ouvriers, transporteurs de convois lourds, terrassement d’envergure, génie ferroviaire',
  },
];

export const A_LA_CARTE_SERVICES: ALaCarteService[] = [
  {
    id: 'plan-hse',
    name: 'Plan d’Organisation HSE (POS / PAE)',
    minPrice: 1500,
    maxPrice: 2500,
    unit: 'par projet / chantier',
    description: 'Rédaction complète du plan HSE contractuel sur mesure, conforme au cahier des charges spécifique du donneur d’ordre (Rio Tinto Simfer, WCS ou CTG).',
    estimatedDelay: '5 à 7 jours ouvrés',
  },
  {
    id: 'analyse-risques',
    name: 'Analyse des Risques (HIRA / DUERP)',
    minPrice: 300,
    maxPrice: 600,
    unit: 'par corps d’état ou poste',
    description: 'Identification systématique des dangers, cotation de la gravité et de la probabilité, définition des mesures barrières obligatoires sur le corridor minier.',
    estimatedDelay: '48 à 72 heures',
  },
  {
    id: 'prequalification',
    name: 'Dossier Complet de Pré-qualification',
    minPrice: 800,
    maxPrice: 1500,
    unit: 'par soumission / appel d’offres',
    description: 'Montage du volet QHSE complet exigé lors des appels d’offres : politiques, fiches statistiques, attestations, organigrammes et procédures.',
    estimatedDelay: '3 à 5 jours',
  },
  {
    id: 'audit-initial',
    name: 'Audit Initial & Diagnostic Flash (Porte d’entrée)',
    minPrice: 500,
    maxPrice: 1000,
    unit: 'par site ou base logistique',
    description: 'Visite d’inspection complète avec rapport d’écart immédiat et score de conformité. 100% déductible en cas de souscription d’un forfait mensuel.',
    estimatedDelay: 'Rapport en 24h après visite',
  },
  {
    id: 'formations',
    name: 'Formations Certifiantes Spécifiques Minier',
    minPrice: 150,
    maxPrice: 300,
    unit: 'par personne formée (session de 10 à 25 pers)',
    description: 'Modules de formation sur le terrain : Conduite défensive sur piste latéritique, Risque angles morts engins lourds, Travail en hauteur, Gestes d’urgence et PSC1, Rôle du sauveteur.',
    estimatedDelay: 'Dates programmées bimensuelles',
  },
];

export const CONTRACT_DISCOUNT_PERCENT = 15; // Remise de 15 % pour 12 mois d'engagement
