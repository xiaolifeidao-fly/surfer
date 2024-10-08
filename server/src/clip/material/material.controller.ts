import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClipMaterialService } from './material.service';
import { ClipMaterailDTO, ClipMaterailQuery } from './dto/material';
import { success } from '@utils/response';


@Controller("clip/materials")
export class ClipMaterialController {

  constructor(private readonly clipMaterialService: ClipMaterialService) {}

  @Get("/query/page")
  async page(@Query() params : ClipMaterailQuery){
     return success(await this.clipMaterialService.page(params));
  }

  @Get(":id")
  async findById(@Param('id') id) {
    let result = await this.clipMaterialService.findById(id);
    return result;
  }

  @Put("")
  async save(@Body() clipMaterialDTO : ClipMaterailDTO) {
    let result = await this.clipMaterialService.save(clipMaterialDTO);
    return success(result);
  }

  @Post(":id")
  async update(@Param('id') id : number, @Body() clipMaterialDTO : ClipMaterailDTO) {
    let result = await this.clipMaterialService.update(Number(id), clipMaterialDTO);
    return success(result);
  }

}

