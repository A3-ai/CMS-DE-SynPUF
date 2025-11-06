export enum EvaluationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface CriterionScore {
  criterionId: string;
  score: number;
  comment?: string;
}

export interface Evaluation {
  id: string;
  proposalId: string;
  evaluatorId: string;
  scores: CriterionScore[];
  totalScore: number;
  comments?: string;
  status: EvaluationStatus;
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEvaluationDto {
  proposalId: string;
  evaluatorId: string;
  scores: CriterionScore[];
  comments?: string;
}

export interface UpdateEvaluationDto {
  scores?: CriterionScore[];
  comments?: string;
  status?: EvaluationStatus;
}
