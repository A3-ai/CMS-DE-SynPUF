import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RfpEntity } from './entities/rfp.entity';
import { RfpService } from './rfp.service';
import { RfpController } from './rfp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RfpEntity])],
  controllers: [RfpController],
  providers: [RfpService],
  exports: [RfpService],
})
export class RfpModule {}
