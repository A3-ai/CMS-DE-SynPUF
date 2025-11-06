export enum RfpStatus {
  DRAFT = 'draft',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
  AWARDED = 'awarded',
}

export enum RfpCategory {
  IT = 'IT',
  CONSTRUCTION = 'construction',
  PROFESSIONAL_SERVICES = 'professional_services',
  GOODS = 'goods',
  CONSULTING = 'consulting',
  MAINTENANCE = 'maintenance',
  OTHER = 'other',
}

export interface EvaluationCriterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  maxScore: number;
}

export interface Rfp {
  id: string;
  title: string;
  description: string;
  rfpNumber: string;
  category: RfpCategory;
  status: RfpStatus;
  budgetMin?: number;
  budgetMax?: number;
  issueDate: Date;
  submissionDeadline: Date;
  evaluationCriteria: EvaluationCriterion[];
  createdBy: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateRfpDto {
  title: string;
  description: string;
  category: RfpCategory;
  budgetMin?: number;
  budgetMax?: number;
  issueDate: Date;
  submissionDeadline: Date;
  evaluationCriteria: EvaluationCriterion[];
}

export interface UpdateRfpDto {
  title?: string;
  description?: string;
  category?: RfpCategory;
  budgetMin?: number;
  budgetMax?: number;
  issueDate?: Date;
  submissionDeadline?: Date;
  evaluationCriteria?: EvaluationCriterion[];
  status?: RfpStatus;
}
