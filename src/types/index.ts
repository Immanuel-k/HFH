export interface VolunteerRequest {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  skills: string[];
  availability: 'weekends' | 'weekdays' | 'flexible';
  message?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ImpactStats {
  mealsServed: number;
  childrenEducated: number;
  animalsRescued: number;
  activeVolunteers: number;
  medicalDrives: number;
  womenTrained: number;
  lastUpdated: string;
}

export interface DonationInitiateRequest {
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  paymentMethod: 'UPI' | 'QR' | 'CARD' | 'NETBANKING';
  isAnonymous?: boolean;
  frequency: 'one-time' | 'monthly';
  causeCategory?: string;
}

export interface DonationResponse {
  transactionId: string;
  upiId: string;
  upiQrUrl: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESS';
  timestamp: string;
  taxExemptEligible: boolean;
}

export interface MissionPillar {
  id: string;
  title: string;
  tamilTitle: string;
  tagline: string;
  description: string;
  iconName: string;
  stats: string;
  activities: string[];
  image: string;
}

export interface StoryGalleryItem {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  image: string;
  description: string;
}
