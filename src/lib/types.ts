export interface BusinessCard {
  name: string;
  company: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  category: "hotel" | "medical" | "legal" | "other";
}
