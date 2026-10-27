export type IndustrySector = 'transport' | 'btp' | 'restauration' | 'gardiennage' | 'engins';

export interface PmeProspect {
  id: string;
  companyName: string;
  sector: IndustrySector;
  managerName: string;
  phone: string;
  email: string;
  city: 'Conakry' | 'Forécariah' | 'Mamou' | 'Kankan' | 'Beyla' | 'Kindia';
  primaryClient: 'Rio Tinto Simfer' | 'Winning Consortium Simandou (WCS)' | 'Compagnie du Transguinéen (CTG)' | 'Sous-traitant Rang 1';
  workforce: number;
  equipmentCount: number;
  status: 'A_contacter' | 'Message_envoye' | 'Relance_J3' | 'Appel_effectue' | 'Audit_cale' | 'Devis_envoye' | 'Signe_Actif';
  lastContactDate?: string;
  notes?: string;
  recommendedPlan?: 'Basic' | 'Standard' | 'Premium';
}

export interface PricingPlan {
  id: 'basic' | 'standard' | 'premium';
  name: string;
  monthlyPrice: number;
  highlight: boolean;
  description: string;
  badge?: string;
  features: string[];
  deliverables: string[];
  idealFor: string;
}

export interface ALaCarteService {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
  description: string;
  estimatedDelay: string;
}

export interface RevenueModelGoal {
  retainedClientsCount: number; // e.g. 5 clients
  retainedClientPrice: number;  // 2 500 $
  trainingSessionsCount: number; // 2 sessions
  trainingAttendeesPerSession: number; // 20
  trainingPricePerPerson: number; // 150 $
  auditDocumentsCount: number; // 2 missions
  auditDocumentPrice: number; // 750 $
  juniorTechsCount: number; // 1 or 2
  juniorTechSalary: number; // ~600 $ - 800 $
  operatingCosts: number; // travel, fuel, PPE, phone
}

export interface ActionPlanMilestone {
  period: string;
  title: string;
  focus: string;
  keyActions: string[];
  kpis: string[];
  badgeColor: string;
}

export interface ScriptStep {
  id: number;
  title: string;
  durationMin: number;
  objective: string;
  dialogue: string;
  tips: string[];
  checklist: string[];
}

export interface ObjectionData {
  id: string;
  objection: string;
  summary: string;
  rootCause: string;
  rebuttalScript: string;
  goldenKey: string;
}
