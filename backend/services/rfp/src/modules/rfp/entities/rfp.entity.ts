import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { RfpStatus, RfpCategory, EvaluationCriterion } from '@procurement/shared';

@Entity('rfps')
export class RfpEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ name: 'rfp_number', unique: true })
  rfpNumber: string;

  @Column({ type: 'enum', enum: RfpCategory })
  category: RfpCategory;

  @Column({ type: 'enum', enum: RfpStatus, default: RfpStatus.DRAFT })
  status: RfpStatus;

  @Column({ name: 'budget_min', type: 'decimal', precision: 15, scale: 2, nullable: true })
  budgetMin: number;

  @Column({ name: 'budget_max', type: 'decimal', precision: 15, scale: 2, nullable: true })
  budgetMax: number;

  @Column({ name: 'issue_date', type: 'date' })
  issueDate: Date;

  @Column({ name: 'submission_deadline', type: 'timestamp' })
  submissionDeadline: Date;

  @Column({ name: 'evaluation_criteria', type: 'jsonb' })
  evaluationCriteria: EvaluationCriterion[];

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
