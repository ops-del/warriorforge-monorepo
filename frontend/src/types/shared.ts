export type Automation = {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  nicheTags: string; // comma-separated tags
  setupPrice: number; // cents
  monthlyPrice?: number | null; // cents
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: number;
  automationId: number;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string | null;
  businessType: string;
  notes?: string | null;
  wantsMaintenance: boolean;
  createdAt: string;
};
