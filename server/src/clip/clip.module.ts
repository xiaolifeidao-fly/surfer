// user.module.ts

import { Module } from '@nestjs/common';
import { ClipSegmentModule } from './segment/segment.module';
import { ClipMaterialModule } from './material/material.module';
import { ClipTaskModule } from './task/task.module';

@Module({
  imports:[ClipSegmentModule,ClipMaterialModule, ClipTaskModule]
}
)
export class ClipModule {}