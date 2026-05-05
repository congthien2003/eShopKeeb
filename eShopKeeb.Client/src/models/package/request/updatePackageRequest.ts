export interface UpdatePackageRequest {
  name: string;
  code: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  maxUsers: number;
}
