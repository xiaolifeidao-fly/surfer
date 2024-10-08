// user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClipSegment, ClipSegmentScript, ClipSegmentStep, ClipSegmentStepContext } from './entity/segment.entity';
import { ClipSegmentController } from './segment.controller';
import { ClipSegmentScriptService, ClipSegmentService, ClipSegmentStepContextService, ClipSegmentStepService } from './segment.service';
import { ClipStepService } from './segment.step.service';
import { ClipMaterialModule } from '../material/material.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClipSegment,ClipSegmentStep,ClipSegmentStepContext,ClipSegmentScript]),ClipMaterialModule
  ],
  controllers:[ClipSegmentController],
  providers: [ClipSegmentService,ClipStepService,ClipSegmentStepContextService,ClipSegmentStepService, ClipSegmentScriptService],
  exports: [ClipSegmentService],
})
export class ClipSegmentModule {}