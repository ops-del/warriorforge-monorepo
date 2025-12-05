import type { DemoLead as SharedDemoLead } from "@shared/types";

export type DemoLead = SharedDemoLead;

export interface DemoLeadPayload {
  automationSlug: string;
  automationName: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  notes?: string;
}
