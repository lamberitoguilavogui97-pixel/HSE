import { ScriptStep, ObjectionData } from '../types';

export const CALL_STEPS: ScriptStep[] = [
  {
    id: 1,
    title: '1. Ouverture & Accroche (3 minutes)',
    durationMin: 3,
    objective: 'Casser la glace, susciter l’intérêt immédiat sans vendre, et positionner votre expertise terrain Simandou.',
    dialogue: `« Bonjour M./Mme [Nom du Gérant], ici [Votre Nom] du cabinet Simadou Safe Mine HSE. 
Je ne vous dérange qu'une petite minute. 
Je vous appelle car nous intervenons actuellement aux côtés de plusieurs transporteurs et prestataires BTP sur le corridor ferroviaire de Simandou. 
Avec le renforcement récent des contrôles de sécurité par Rio Tinto Simfer et le consortium WCS, j'ai pensé à votre structure [Nom de l'entreprise]. 
Est-ce que vous avez 2 minutes pour un point rapide sur la gestion de vos inspections de sécurité ? »`,
    tips: [
      'Parler avec assurance, voix posée et professionnelle.',
      'Nommer des détails concrets du corridor (poussières, CTG, bases de Forécariah ou Beyla).',
      'Si le gérant dit qu’il est occupé : « Pas de problème, je vous rappelle à 16h ou plutôt demain matin à 8h30 ? »'
    ],
    checklist: [
      'Gérant au bout du fil vérifié',
      'Mention du corridor Simandou et des donneurs d’ordre',
      'Accord pour 2 minutes d’attention obtenu'
    ]
  },
  {
    id: 2,
    title: '2. Questions de Diagnostic (5 minutes)',
    durationMin: 5,
    objective: 'Détecter les failles, comprendre ses douleurs réelles et le faire parler de ses interactions avec les inspecteurs.',
    dialogue: `« Dites-moi, M./Mme [Nom du Gérant], pour vos équipes actuellement sur le terrain :
1. Comment gérez-vous aujourd'hui les exigences HSE quotidiennes demandées par le client ? Vous avez un responsable dédié sur chaque site ou c’est géré par vos chefs d'équipe ?
2. Lors du dernier audit ou contrôle inopiné sur piste, est-ce que le donneur d'ordre vous a formulé des fiches d'écarts ou des remarques sur les EPI ou les autorisations ?
3. Est-ce que vos fiches de causeries sécurité (Toolbox Talks) et registres d'incidents sont signés et archivés chaque semaine comme l'exige le protocole minier ?
4. Avez-vous déjà craint une mise en demeure ou une retenue sur facture à cause d'un manquement sécurité ? »`,
    tips: [
      'Écouter activement sans couper la parole.',
      'Noter scrupuleusement ses mots ("on court après les papiers", "le client est pointilleux", "les chauffeurs oublient les gilets").',
      'Si le gérant minimise, creuser gentiment : « Et sur le contrôle des engins, tous vos VGP (vérifications générales périodiques) sont à jour ? »'
    ],
    checklist: [
      'Réponse Q1 : Organisation interne identifiée',
      'Réponse Q2 : Historique des contrôles clients connu',
      'Réponse Q3 : État des causeries & documents vérifié',
      'Réponse Q4 : Niveau de stress financier évalué'
    ]
  },
  {
    id: 3,
    title: '3. Mise en Évidence du Risque (3 minutes)',
    durationMin: 3,
    objective: 'Montrer les conséquences d’un statu quo : perte de contrat, immobilisation financière, disqualification.',
    dialogue: `« Je comprends tout à fait votre situation, c'est le défi de 90% des PME locales sur le corridor. Vos équipes sont excellentes sur le plan technique, mais les départements QHSE de Rio Tinto et WCS ne jugent que sur la conformité documentaire et la preuve écrite. 
Aujourd'hui, un seul camion arrêté sur la piste pour défaut de permis de travail ou d'extincteur périmé, c'est 500 $ à 1 500 $ de perte par jour d'immobilisation, sans parler du risque d'exclusion aux prochains appels d'offres de terrassement et de transport.
Vous ne pouvez pas laisser un détail administratif menacer un contrat de plusieurs centaines de milliers de dollars. »`,
    tips: [
      'Calculer l’impact financier en direct avec lui.',
      'Faire le pont entre l’amende client et le coût dérisoire de la prévention.',
      'Garder un ton bienveillant et protecteur, comme un allié stratégique.'
    ],
    checklist: [
      'Peur de l’arrêt de chantier confirmée',
      'Comparaison coût risque vs coût prévention exposée',
      'Transition prête vers l’action'
    ]
  },
  {
    id: 4,
    title: '4. Proposition de l’Audit Initial (2 minutes)',
    durationMin: 2,
    objective: 'Fermer la vente de la première étape sans engagement lourd : l’Audit Initial Flash.',
    dialogue: `« C'est exactement pour cela que nous avons mis en place notre "Audit Initial de Conformité Flash". 
Notre ingénieur HSE vient passer 2 heures sur votre base ou votre chantier. Il passe au crible vos 7 points de contrôle éliminatoires, contrôle vos engins et documents, et vous remet sous 24h un rapport clair avec le score de conformité et les actions immédiates à corriger.
C’est sans engagement, et si nous décidons d'assurer votre suivi mensuel, le coût de cet audit est 100% déduit de votre forfait. »`,
    tips: [
      'Présenter l’audit comme une protection d’assurance pour son chiffre d’affaires.',
      'Rappeler la déductibilité intégrale (risque zéro pour lui).',
      'Ne pas proposer le contrat annuel directement : l’audit est la porte d’entrée naturelle.'
    ],
    checklist: [
      'Proposition de l’audit initial formulée',
      'Rappel du délai rapide (rapport 24h)',
      'Déductibilité mise en avant'
    ]
  },
  {
    id: 5,
    title: '5. Fixation de Date & Clôture (2 minutes)',
    durationMin: 2,
    objective: 'Bloquer une date et une heure précises dans l’agenda.',
    dialogue: `« Pour que vous soyez serein avant le prochain contrôle, je peux vous bloquer un créneau avec notre spécialiste terrain. 
Préférez-vous ce jeudi à 10h ou vendredi à 14h30 sur votre base ? 
Parfait, je vous envoie la confirmation par WhatsApp avec la liste des 3 documents à préparer. Quel est votre e-mail pour le récapitulatif officiel ? »`,
    tips: [
      'Alternative fermée : "Jeudi matin ou vendredi après-midi ?" plutôt que "Quand êtes-vous libre ?".',
      'Envoyer la confirmation WhatsApp dans les 5 minutes suivant l’appel.'
    ],
    checklist: [
      'Date et heure arrêtées',
      'Lieu ou base d’intervention confirmé',
      'Message de confirmation immédiat déclenché'
    ]
  }
];

export const OBJECTIONS: ObjectionData[] = [
  {
    id: 'trop-cher',
    objection: '« C’est trop cher pour une petite entreprise comme nous »',
    summary: 'Le gérant perçoit la sécurité comme une dépense nette et non comme une assurance anti-pénalité.',
    rootCause: 'Confusion entre coût direct du conseil et valeur des contrats préservés.',
    goldenKey: '« Combien vous coûte une seule journée d’immobilisation d’un camion ou d’une équipe sur Simandou ? »',
    rebuttalScript: `« Je comprends totalement votre vigilance sur les charges, M. [Nom du Gérant]. Permettez-moi une question : combien vous coûte une seule journée d’arrêt de chantier ou un camion bloqué à la barrière du camp minier ? Souvent entre 800 $ et 2 000 $ par jour de retard, sans compter les pénalités contractuelles du client.
Notre forfait de base est à 1 200 $ par mois, soit moins de 40 $ par jour. C’est le prix d’un plein de carburant pour garantir que vos équipes ne seront jamais renvoyées du site. 
Et pour commencer sans aucun risque, notre Audit Initial vous donne une vision claire pour seulement 500 $, intégralement déduit si nous continuons ensemble. On fait le test ? »`
  },
  {
    id: 'deja-quelquun',
    objection: '« On a déjà quelqu’un en interne qui s’en occupe »',
    summary: 'Le gérant a souvent un chef de chantier ou un technicien polyvalent qui "fait aussi le HSE" à mi-temps.',
    rootCause: 'Le personnel interne est surchargé par la production technique et néglige la rigueur documentaire exigée par Rio Tinto/WCS.',
    goldenKey: '« Nous ne venons pas le remplacer, nous lui donnons les outils et le blindage documentaire pour qu’il réussisse. »',
    rebuttalScript: `« C’est une excellente chose d’avoir déjà une ressource sur place, cela montre que la sécurité est une priorité pour vous. La plupart de nos clients ont aussi un chef de chantier ou un logisticien qui gère cela en plus de son travail. 
Le problème, c’est qu’il est souvent submergé par les urgences d’exploitation et n’a pas le temps de formaliser les rapports d'incidents complexes, les causeries normées ou les veilles d’audits que réclament les multinationales. 
Nous intervenons en appui externe : nous lui préparons tous les modèles, nous faisons les audits à blanc et nous validons que rien ne passera à la trappe. Deux paires d'yeux valent mieux qu'une pour éviter un avertissement client. Est-ce qu’on peut caler 15 minutes avec lui pour voir comment on peut lui faire gagner 10h par semaine ? »`
  },
  {
    id: 'pas-maintenant',
    objection: '« Pas maintenant, rappelez-nous le mois prochain / au prochain contrat »',
    summary: 'Procrastination classique jusqu’à ce qu’un inspecteur HSE arrive et bloque le travail.',
    rootCause: 'Absence d’urgence perçue à court terme tant qu’il n’y a pas eu d’accident.',
    goldenKey: '« Quand l’inspection arrive, il est déjà trop tard pour créer 6 mois d’antériorité documentaire. »',
    rebuttalScript: `« Je comprends que vos plannings soient chargés en ce moment. Mais attention : quand l’inspecteur de Rio Tinto ou de WCS se présente à l’improviste à 7h du matin, il ne vous donne pas 48h pour vous préparer. Il demande à voir immédiatement les registres d'émargement des 30 derniers jours et les autorisations de conduite. 
Si vous attendez le mois prochain ou le passage de l’inspection pour vous structurer, l’arrêt de travail sera immédiat. 
L’audit initial ne vous prend que 2 heures cette semaine et vous permet d’aborder les 6 prochains mois l’esprit tranquille. Préférez-vous ce jeudi à 10h ou vendredi à 14h ? »`
  }
];
