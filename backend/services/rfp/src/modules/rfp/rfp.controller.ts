import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { RfpService } from './rfp.service';
import { CreateRfpDto, UpdateRfpDto, ResponseUtil, RfpStatus } from '@procurement/shared';

@Controller('rfps')
export class RfpController {
  constructor(private readonly rfpService: RfpService) {}

  @Post()
  async create(@Body() createRfpDto: CreateRfpDto, @Request() req) {
    // In production, extract userId and organizationId from JWT token
    const userId = req.user?.id || 'system';
    const organizationId = req.user?.organizationId || 'default-org';

    const rfp = await this.rfpService.create(createRfpDto, userId, organizationId);
    return ResponseUtil.success(rfp);
  }

  @Get()
  async findAll(@Query() filters: any) {
    const rfps = await this.rfpService.findAll(filters);
    return ResponseUtil.success(rfps);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const rfp = await this.rfpService.findOne(id);
    return ResponseUtil.success(rfp);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRfpDto: UpdateRfpDto) {
    const rfp = await this.rfpService.update(id, updateRfpDto);
    return ResponseUtil.success(rfp);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.rfpService.remove(id);
    return ResponseUtil.success({ message: 'RFP deleted successfully' });
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: RfpStatus) {
    const rfp = await this.rfpService.updateStatus(id, status);
    return ResponseUtil.success(rfp);
  }

  @Post(':id/publish')
  async publish(@Param('id') id: string) {
    const rfp = await this.rfpService.publish(id);
    return ResponseUtil.success(rfp);
  }
}
