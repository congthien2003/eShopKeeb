export interface Package {
  id: string;
  name: string;
  code: string;
  description: string;
  price: number;
  duration: number; // in days
  features: string[];
  isActive: boolean;
  maxUsers: number;
  createdAt: string;
  updatedAt: string;
}
