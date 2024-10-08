
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClipMaterial } from './entity/material.entity';
import { ClipMaterailDTO, ClipMaterailQuery } from './dto/material';
import {findPage } from 'orm/repository';
import { PageDTO, convertToPageDTO } from 'base/base.dto';
import { Repository } from 'typeorm';
import { BaseService } from 'base/base.service';
import { query } from 'express';

@Injectable()
export class ClipMaterialService extends BaseService<ClipMaterailDTO, ClipMaterial>{

  constructor(
    @InjectRepository(ClipMaterial)
    private readonly clipMaterialRepository :  Repository<ClipMaterial>,
  ) {
    super(clipMaterialRepository, ClipMaterailDTO, ClipMaterial); // 传入对应的 DTO 对象实例
  } 

  async page(params: ClipMaterailQuery) : Promise<PageDTO<ClipMaterailDTO> | undefined>{
    let result = await findPage(this.clipMaterialRepository, this.buildQuerySql(params), params.pageIndex, params.pageSize, this.buildQueryParams(params));
    return convertToPageDTO(ClipMaterailDTO, result);
  }

  buildQueryParams(params: ClipMaterailQuery){
    const queryParams = {};
    if(params.name != undefined){
       queryParams['name'] = params.name;
    }
    return queryParams;
  }

  buildQuerySql(params: ClipMaterailQuery){
     let sql = "select * from clip_material where 1 =1 ";
     if(params.name != undefined){
          sql = sql + " and name like :name ";
     }
     return sql;

  }
}






