export enum ProposalStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_EVALUATION = 'under_evaluation',
  SHORTLISTED = 'shortlisted',
  REJECTED = 'rejected',
  AWARDED = 'awarded',
}

export interface ProposalDocument {
  id: string;
  name: string;
  url: string;
  size: number;
  uploadedAt: Date;
}

export interface Proposal {
  id: string;
  rfpId: string;
  vendorId: string;
  status: ProposalStatus;
  submittedAt?: Date;
  totalCost: number;
  proposalData: Record<string, any>;
  documents: ProposalDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProposalDto {
  rfpId: string;
  vendorId: string;
  totalCost: number;
  proposalData: Record<string, any>;
}

export interface UpdateProposalDto {
  totalCost?: number;
  proposalData?: Record<string, any>;
  status?: ProposalStatus;
}
