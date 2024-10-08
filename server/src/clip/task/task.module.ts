// user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClipSegmentTask, ClipTask } from './entity/task.entity';
import { ClipSegmentTaskController, ClipTaskController } from './task.controller';
import { ClipSegmentTaskService, ClipTaskService } from './task.service';
import { ClipSegmentModule } from '../segment/segment.module';
import { ClipTaskStepService } from './task.step.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClipTask,ClipSegmentTask]),ClipSegmentModule
  ],
  controllers:[ClipTaskController, ClipSegmentTaskController],
  providers: [ClipTaskService,ClipSegmentTaskService, ClipTaskStepService],
  exports: [ClipTaskService, ClipSegmentTaskService, ClipTaskStepService],
})
export class ClipTaskModule {}