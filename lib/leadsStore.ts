export interface LeadItem {
  id: string;
  name: string;
  email: string;
  company?: string;
  services: string[];
  budget?: string;
  message: string;
  timestamp: string;
}

export const leadsStore: LeadItem[] = [];
