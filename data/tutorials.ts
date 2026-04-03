export interface TutorialStep {
  id: string;
  title: string;
  emoji: string;
  description: string;
  content: string[];
  tip: string;
}

export interface Domain {
  id: string;
  name: string;
  emoji: string;
  color: string;
  colorLight: string;
  description: string;
  steps: TutorialStep[];
}

export const domains: Domain[] = [
  {
    id: 'sante',
    name: 'Santé',
    emoji: '🏥',
    color: '#B4E1FF',
    colorLight: '#E8F4FD',
    description: 'Maîtrise tes démarches santé comme un pro',
    steps: [
      {
        id: 'sante-1',
        title: 'Ta carte Vitale, ton meilleur allié',
        emoji: '💳',
        description: 'Comprendre et activer ta carte Vitale',
        content: [
          "La carte Vitale, c'est ta clé pour être remboursé par la Sécu. Sans elle, tu avances tous les frais !",
          "Pour l'obtenir ou la renouveler, rends-toi sur ameli.fr ou dans ta CPAM. C'est gratuit et ça prend 2 semaines.",
          "Pense à la mettre à jour au moins une fois par an dans une pharmacie — il y a une borne verte exprès pour ça.",
          "Astuce : l'appli Ameli sur ton téléphone te permet de tout gérer sans bouger de chez toi. Télécharge-la !",
        ],
        tip: "Tu peux aussi utiliser ta carte Vitale dématérialisée sur l'appli Ameli. Plus besoin de la chercher au fond de ton sac !",
      },
      {
        id: 'sante-2',
        title: 'Choisir et déclarer son médecin traitant',
        emoji: '🩺',
        description: 'Pourquoi et comment déclarer un médecin traitant',
        content: [
          "Déclarer un médecin traitant, c'est obligatoire pour être bien remboursé. Sans ça, la Sécu rembourse moins (30% au lieu de 70%).",
          "Choisis un médecin généraliste près de chez toi. Lors de ta prochaine visite, demande-lui de faire la déclaration ensemble.",
          "Le médecin remplit le formulaire directement en ligne avec ta carte Vitale. Ça prend 30 secondes, promis.",
          "Tu peux changer de médecin traitant quand tu veux, sans justification. Il suffit d'en déclarer un nouveau.",
        ],
        tip: "Doctolib et autres plateformes indiquent si un médecin accepte de nouveaux patients. Pratique pour éviter les refus !",
      },
      {
        id: 'sante-3',
        title: 'Comprendre la mutuelle',
        emoji: '🛡️',
        description: 'À quoi sert une mutuelle et comment la choisir',
        content: [
          "La Sécu ne rembourse pas tout : une consultation à 26,50€, elle rembourse ~18,50€. Le reste, c'est ta mutuelle qui le couvre.",
          "Si tu es étudiant, la mutuelle étudiante est souvent incluse dans tes frais d'inscription. Vérifie sur ton espace étudiant.",
          "Si tu travailles, ton employeur doit te proposer une mutuelle d'entreprise (obligatoire). Il en paie au moins 50%.",
          "Pour comparer les mutuelles, regarde : le remboursement dentaire, optique, et hospitalisation. Ce sont les postes qui coûtent cher.",
        ],
        tip: "La CSS (Complémentaire Santé Solidaire) est gratuite ou à 1€/jour pour les petits budgets. Vérifie ton éligibilité sur ameli.fr !",
      },
      {
        id: 'sante-4',
        title: 'Prendre RDV sans stresser',
        emoji: '📅',
        description: 'Les outils pour simplifier tes rendez-vous médicaux',
        content: [
          "Fini le stress du téléphone ! Doctolib, Maiia ou Keldoc permettent de prendre RDV en ligne en 2 clics, 24h/24.",
          "Tu peux filtrer par spécialité, disponibilité, et même par langue parlée. Les créneaux sont en temps réel.",
          "Les rappels automatiques par SMS/email t'évitent d'oublier. Tu peux aussi annuler facilement si besoin.",
          "Pour les spécialistes : certains nécessitent une lettre d'adressage de ton médecin traitant. Pense à la demander avant !",
        ],
        tip: "Beaucoup de médecins proposent la téléconsultation. Parfait pour un renouvellement d'ordonnance sans se déplacer !",
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    emoji: '💰',
    color: '#B2FA84',
    colorLight: '#EDFDE0',
    description: 'Gère ton argent sans prise de tête',
    steps: [
      {
        id: 'finance-1',
        title: 'Ouvrir et gérer son compte bancaire',
        emoji: '🏦',
        description: 'Les bases du compte en banque',
        content: [
          "Un compte bancaire, c'est la base de ta vie financière. Sans lui, impossible de recevoir un salaire ou payer un loyer.",
          "Pour ouvrir un compte : carte d'identité + justificatif de domicile + RIB (si tu en as déjà un). C'est tout !",
          "Les banques en ligne (Boursorama, Fortuneo...) sont souvent gratuites. Les banques traditionnelles facturent ~5-15€/mois.",
          "Ton RIB (Relevé d'Identité Bancaire), c'est comme l'adresse de ton compte. Tu en auras besoin partout : employeur, CAF, impôts...",
        ],
        tip: "Tu as le droit au compte : si une banque te refuse, la Banque de France peut t'en attribuer un gratuitement.",
      },
      {
        id: 'finance-2',
        title: 'Faire sa première déclaration d\'impôts',
        emoji: '📋',
        description: 'Les impôts démystifiés étape par étape',
        content: [
          "Dès 18 ans (ou dès que tu as des revenus), tu dois déclarer tes revenus chaque année, même s'ils sont à 0€.",
          "Tout se passe sur impots.gouv.fr. Crée ton espace en avril avec ton numéro fiscal (sur le courrier des impôts de tes parents).",
          "La déclaration est souvent pré-remplie par ton employeur. Tu n'as qu'à vérifier et valider. C'est plus simple qu'on croit !",
          "La date limite est généralement en mai-juin. Tu reçois ton avis d'imposition en été, c'est un document important à garder.",
        ],
        tip: "Étudiant avec un job d'été ? Les revenus des moins de 26 ans sont exonérés jusqu'à ~5000€/an (3 SMIC). Pense à cocher la case !",
      },
      {
        id: 'finance-3',
        title: 'Construire son premier budget',
        emoji: '📊',
        description: 'La méthode simple pour ne plus être à découvert',
        content: [
          "La règle 50/30/20 : 50% pour les besoins (loyer, courses), 30% pour les envies (sorties, loisirs), 20% pour l'épargne.",
          "Note tes dépenses fixes d'abord : loyer, abonnements, transport. Le reste, c'est ton budget variable.",
          "Utilise une appli gratuite (Bankin', Linxo, ou celle de ta banque) pour suivre tes dépenses automatiquement.",
          "Mets en place un virement automatique vers un livret d'épargne le jour de ta paie. Même 20€/mois, ça compte !",
        ],
        tip: "Le Livret A est plafonné à 22 950€ et les intérêts sont exonérés d'impôts. C'est le meilleur premier réflexe épargne.",
      },
      {
        id: 'finance-4',
        title: 'Les aides auxquelles tu as droit',
        emoji: '🎁',
        description: 'APL, prime d\'activité, bourses... ne passe pas à côté',
        content: [
          "Les APL (aides au logement) peuvent couvrir une bonne partie de ton loyer. Fais ta simulation sur caf.fr en 5 minutes.",
          "La prime d'activité, c'est un complément de salaire pour les petits revenus (même en alternance). Simule sur caf.fr aussi.",
          "Étudiant ? La bourse du CROUS se demande sur messervices.etudiant.gouv.fr entre janvier et mai pour la rentrée suivante.",
          "Il existe aussi : la garantie Visale (caution gratuite), le pass Culture (300€), les aides régionales au transport...",
        ],
        tip: "Le site 1jeune1solution.gouv.fr regroupe toutes les aides pour les jeunes. Un seul endroit pour tout trouver !",
      },
    ],
  },
  {
    id: 'voiture',
    name: 'Voiture',
    emoji: '🚗',
    color: '#FFACE4',
    colorLight: '#FFF0F4',
    description: 'Roule en règle sans galère',
    steps: [
      {
        id: 'voiture-1',
        title: 'La carte grise sans panique',
        emoji: '📄',
        description: 'Immatriculer son véhicule facilement',
        content: [
          "La carte grise (certificat d'immatriculation), c'est la « pièce d'identité » de ta voiture. Obligatoire pour rouler.",
          "Tout se fait en ligne sur ants.gouv.fr ou via un professionnel habilité. Plus besoin d'aller en préfecture !",
          "Pour un véhicule d'occasion : tu as 1 mois après l'achat pour faire le changement de carte grise. Passé ce délai = amende.",
          "Documents nécessaires : ancien certificat d'immatriculation barré, formulaire cerfa, contrôle technique de moins de 6 mois.",
        ],
        tip: "Attention aux arnaques en ligne ! Utilise uniquement ants.gouv.fr (site officiel) ou un garage agréé. Jamais de site tiers louche.",
      },
      {
        id: 'voiture-2',
        title: 'L\'assurance auto décryptée',
        emoji: '🛡️',
        description: 'Comprendre les niveaux d\'assurance et bien choisir',
        content: [
          "L'assurance auto est OBLIGATOIRE, même si ta voiture ne roule pas. Rouler sans assurance = amende de 3750€ + confiscation.",
          "3 niveaux : au tiers (le minimum légal), tiers étendu (+ vol, incendie, bris de glace), tous risques (tout est couvert).",
          "Pour une première voiture ou un petit budget, le tiers étendu est souvent le meilleur rapport qualité-prix.",
          "Compare sur lesfurets.com ou lelynx.fr. Et demande à tes parents : souvent tu peux bénéficier de leur bonus.",
        ],
        tip: "Le bonus-malus démarre à 1.00. Chaque année sans accident, il baisse de 5%. Après 13 ans sans sinistre, tu es au max (0.50) !",
      },
      {
        id: 'voiture-3',
        title: 'Le contrôle technique sans stress',
        emoji: '🔧',
        description: 'Quand, où et comment passer le contrôle technique',
        content: [
          "Le premier contrôle technique se fait 4 ans après la mise en circulation, puis tous les 2 ans. Marque la date !",
          "Il vérifie 133 points : freins, éclairage, pollution, pneus... Pas de réparation sur place, juste un diagnostic.",
          "Si tu as une contre-visite, pas de panique : tu as 2 mois pour faire les réparations et repasser (gratuit sur les points concernés).",
          "Choisis un centre agréé (utac-otc.com). Les prix varient de 50 à 90€ selon les régions.",
        ],
        tip: "Vérifie tes pneus, tes phares et ton niveau de liquide de frein avant d'y aller. Ce sont les causes les plus fréquentes de contre-visite !",
      },
    ],
  },
  {
    id: 'admin',
    name: 'Administration',
    emoji: '📄',
    color: '#8CD7D0',
    colorLight: '#E8F7F5',
    description: 'Dompte la paperasse comme un champion',
    steps: [
      {
        id: 'admin-1',
        title: 'Pièce d\'identité et passeport',
        emoji: '🪪',
        description: 'Faire ou renouveler ses papiers d\'identité',
        content: [
          "La carte d'identité est gratuite et valable 15 ans (10 ans pour les mineurs). Le passeport coûte 86€ et dure 10 ans.",
          "Pour les deux : rendez-vous en mairie équipée d'une station biométrique. Prends RDV sur le site de ta mairie.",
          "Documents : photo d'identité récente, justificatif de domicile, acte de naissance (si première demande).",
          "Fais ta pré-demande en ligne sur ants.gouv.fr pour gagner du temps en mairie. Tu recevras un numéro à présenter.",
        ],
        tip: "Anticipe ! En période estivale, les délais explosent (2-3 mois). Fais ta demande dès janvier si tu voyages cet été.",
      },
      {
        id: 'admin-2',
        title: 'Organiser son courrier administratif',
        emoji: '📬',
        description: 'La méthode anti-pile-de-courrier',
        content: [
          "Règle n°1 : ouvre ton courrier le jour même. Plus tu repousses, plus la pile grossit et plus ça angoisse.",
          "Crée 3 dossiers (physiques ou numériques) : « À traiter », « En attente de réponse », « Archivé ».",
          "Passe au maximum au numérique : active les notifications sur ameli.fr, impots.gouv.fr, ta banque, la CAF...",
          "Garde tes documents importants au minimum 5 ans (bulletins de paie : toute la vie, quittances de loyer : 3 ans).",
        ],
        tip: "Prends en photo chaque document important dès réception et range-le dans un dossier cloud (Google Drive, iCloud). Zéro risque de perte !",
      },
      {
        id: 'admin-3',
        title: 'FranceConnect, ton passe-partout',
        emoji: '🔑',
        description: 'Un seul identifiant pour tous les services publics',
        content: [
          "FranceConnect te permet de te connecter à 1400+ services publics avec un seul compte (impôts, Ameli, La Poste...).",
          "Pour l'activer, tu as juste besoin d'un compte existant : impots.gouv.fr, Ameli, ou L'Identité Numérique La Poste.",
          "Plus besoin de retenir 15 mots de passe différents. Un clic sur le bouton FranceConnect et c'est réglé.",
          "FranceConnect+ (avec L'Identité Numérique) permet en plus de signer des documents officiels en ligne.",
        ],
        tip: "Commence par créer ton compte sur impots.gouv.fr : c'est le plus utilisé et il te servira pour FranceConnect partout.",
      },
      {
        id: 'admin-4',
        title: 'Voter et exercer ses droits civiques',
        emoji: '🗳️',
        description: 'S\'inscrire sur les listes électorales et voter',
        content: [
          "À 18 ans, tu es normalement inscrit automatiquement sur les listes électorales de ta commune.",
          "Si tu déménages, tu dois te réinscrire ! Fais-le sur service-public.fr avant le 6e vendredi avant le scrutin.",
          "Le jour J : ta carte d'électeur + pièce d'identité. Si tu as perdu ta carte, la pièce d'identité suffit.",
          "Tu ne peux pas y aller ? Fais une procuration à quelqu'un sur maprocuration.gouv.fr. C'est rapide et 100% en ligne.",
        ],
        tip: "Tu peux vérifier ton inscription et ton bureau de vote sur service-public.fr > « Vérifier votre inscription électorale ».",
      },
    ],
  },
  {
    id: 'logement',
    name: 'Logement',
    emoji: '🏠',
    color: '#AB87FF',
    colorLight: '#F3EEFF',
    description: 'Emménage et gère ton chez-toi sereinement',
    steps: [
      {
        id: 'logement-1',
        title: 'Constituer son dossier de location',
        emoji: '📁',
        description: 'Le dossier béton pour décrocher un appart',
        content: [
          "Un bon dossier, c'est 80% du succès. Prépare-le AVANT de visiter pour être le premier à dégainer.",
          "Le propriétaire peut demander : pièce d'identité, 3 derniers bulletins de paie, avis d'imposition, justificatif de domicile actuel.",
          "Si tu es étudiant ou que tes revenus sont faibles, un garant est souvent demandé. Il fournira les mêmes documents.",
          "Pas de garant ? Utilise la garantie Visale (visale.fr) : c'est une caution gratuite de l'État, acceptée par la plupart des propriétaires.",
        ],
        tip: "Crée un dossier PDF propre avec DossierFacile.fr (service de l'État, gratuit). Ça inspire confiance aux propriétaires !",
      },
      {
        id: 'logement-2',
        title: 'L\'état des lieux comme un pro',
        emoji: '🔍',
        description: 'Entrer et sortir sans mauvaises surprises',
        content: [
          "L'état des lieux d'entrée est CRUCIAL. Chaque défaut non noté sera à ta charge à la sortie.",
          "Prends des photos de TOUT : murs, sols, plafonds, robinetterie, plaques de cuisson, interrupteurs. Horodate-les.",
          "Note les détails : « rayure de 5cm sur le parquet chambre, angle gauche fenêtre ». Sois ultra précis.",
          "À la sortie, l'état des lieux est comparé à celui d'entrée. Ce qui est identique = pas de retenue sur ta caution.",
        ],
        tip: "Teste TOUT le jour de l'état des lieux : chaque prise électrique, chaque robinet (eau chaude et froide), les volets, la chasse d'eau...",
      },
      {
        id: 'logement-3',
        title: 'Électricité, gaz et internet',
        emoji: '⚡',
        description: 'Ouvrir et résilier ses contrats sans galère',
        content: [
          "Électricité : appelle ton fournisseur (EDF, TotalEnergies...) avec le numéro de PDL (Point De Livraison, sur le compteur ou la facture du précédent locataire).",
          "Internet : compare sur degrouptest.com pour savoir quel opérateur a la meilleure couverture à ton adresse.",
          "Délai à prévoir : internet prend 2-3 semaines. Électricité : 24-48h (Linky) ou 5 jours (ancien compteur).",
          "En partant : résilie au moins 15 jours avant. La plupart des contrats sont sans engagement et résiliables en ligne.",
        ],
        tip: "Avec un compteur Linky, tu peux mettre l'électricité à ton nom toi-même depuis l'appli EDF en 5 minutes !",
      },
      {
        id: 'logement-4',
        title: 'L\'assurance habitation obligatoire',
        emoji: '🏡',
        description: 'Pourquoi et comment assurer ton logement',
        content: [
          "L'assurance habitation est OBLIGATOIRE pour tout locataire. Ton propriétaire te demandera une attestation chaque année.",
          "Elle couvre : dégât des eaux, incendie, vol, responsabilité civile. Prix : entre 5 et 20€/mois pour un studio/T2.",
          "Pour souscrire : en ligne en 10 minutes (MAIF, Luko, Lovys...). Tu reçois ton attestation immédiatement par email.",
          "En colocation, chaque colocataire doit être couvert. Soit un contrat commun, soit chacun le sien.",
        ],
        tip: "Ta responsabilité civile (incluse dans l'assurance habitation) te couvre aussi dans la vie quotidienne : si tu casses quelque chose chez un ami par exemple.",
      },
    ],
  },
];
