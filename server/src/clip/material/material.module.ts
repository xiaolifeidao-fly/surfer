// user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClipMaterialService } from './material.service';
import { ClipMaterialController } from './material.controller';
import { ClipMaterial } from './entity/material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClipMaterial])
  ],
  controllers:[ClipMaterialController],
  providers: [ClipMaterialService],
  exports: [ClipMaterialService],
})
export class ClipMaterialModule {}