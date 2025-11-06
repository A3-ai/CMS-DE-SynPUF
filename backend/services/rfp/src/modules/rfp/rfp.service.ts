import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { RfpEntity } from './entities/rfp.entity';
import { CreateRfpDto, UpdateRfpDto, Rfp, RfpStatus } from '@procurement/shared';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RfpService {
  constructor(
    @InjectRepository(RfpEntity)
    private readonly rfpRepository: Repository<RfpEntity>,
  ) {}

  async create(createRfpDto: CreateRfpDto, userId: string, organizationId: string): Promise<Rfp> {
    const rfpNumber = this.generateRfpNumber();

    const rfp = this.rfpRepository.create({
      ...createRfpDto,
      rfpNumber,
      createdBy: userId,
      organizationId,
    });

    const savedRfp = await this.rfpRepository.save(rfp);
    return this.mapToRfp(savedRfp);
  }

  async findAll(filters?: any): Promise<Rfp[]> {
    const where: FindOptionsWhere<RfpEntity> = {};

    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.category) {
      where.category = filters.category;
    }
    if (filters?.organizationId) {
      where.organizationId = filters.organizationId;
    }

    const rfps = await this.rfpRepository.find({ where });
    return rfps.map((rfp) => this.mapToRfp(rfp));
  }

  async findOne(id: string): Promise<Rfp> {
    const rfp = await this.rfpRepository.findOne({ where: { id } });

    if (!rfp) {
      throw new NotFoundException('RFP not found');
    }

    return this.mapToRfp(rfp);
  }

  async update(id: string, updateRfpDto: UpdateRfpDto): Promise<Rfp> {
    const rfp = await this.rfpRepository.findOne({ where: { id } });

    if (!rfp) {
      throw new NotFoundException('RFP not found');
    }

    Object.assign(rfp, updateRfpDto);
    const updatedRfp = await this.rfpRepository.save(rfp);

    return this.mapToRfp(updatedRfp);
  }

  async remove(id: string): Promise<void> {
    const result = await this.rfpRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException('RFP not found');
    }
  }

  async updateStatus(id: string, status: RfpStatus): Promise<Rfp> {
    return this.update(id, { status });
  }

  async publish(id: string): Promise<Rfp> {
    return this.updateStatus(id, RfpStatus.PUBLISHED);
  }

  private generateRfpNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `RFP-${timestamp}-${random}`;
  }

  private mapToRfp(entity: RfpEntity): Rfp {
    return entity as Rfp;
  }
}
