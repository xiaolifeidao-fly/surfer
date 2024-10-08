import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClipSegmentScriptService, ClipSegmentService, ClipSegmentStepContextService } from './segment.service';
import { ClipSegmentDTO, ClipSegmentStepContextDTO, SegmentParams, SegmentScript, SegmentStepParam, SegmentTaskAiBody } from './dto/segment.dto';
import { success,errorToData, error } from '@utils/response';
import { ClipStepService } from './segment.step.service';
import { toJson } from '@utils/json';
import {chat} from 'ai/openai'

@Controller("clip/material/segments")
export class ClipSegmentController {

  constructor(
    private readonly clipSegmentService: ClipSegmentService,
    private readonly clipStepService: ClipStepService,
    private readonly clipSegmentStepContextService: ClipSegmentStepContextService,
    private readonly clipSegmentScriptService: ClipSegmentScriptService,

  ) {}


  @Post("/init")
  async init(@Body() segmentParams: SegmentParams) {
    try{
      await this.clipSegmentService.init(segmentParams.materialId, segmentParams.segments);
      return success({code : 1, message : "保存成功"});
    }catch(e){
      console.error(e);
      return errorToData({code : 0, message : "保存失败"})
    }
  }

  @Post("/:segmentKey/step/init")
  async stepInit(@Param("segmentKey") segmentKey, @Query("materialId") materialId : number) {
    try{
      await this.clipStepService.init(materialId, segmentKey);
      return success({code : 1, message : "保存成功"});
    }catch(e){
      return errorToData({code : 0, message : "保存失败"})
    }
  }

  @Post("/:segmentKey/script/save")
  async saveSegmentScript(@Param("segmentKey") segmentKey : string, @Body() segmentScript: SegmentScript) {
    try{
      const segment = await this.clipSegmentService.findBySegmentKey(segmentKey);
      await this.clipSegmentStepContextService.saveBySegmentIdAndKey(JSON.stringify(segmentScript.finallyClipSrtData), segment.id, "finallyClipSrtData")
      await this.clipSegmentScriptService.saveScript(segmentScript.materialId, segment.id, JSON.stringify(segmentScript.contentScript));
      return success({code : 1, message : "保存成功"});
    }catch(e){
      return errorToData({code : 0, message : "保存失败"})
    }
  }

  @Get("/:segmentKey/script")
  async getSegmentScript(@Param("segmentKey") segmentKey : string, @Query("materialId") materialId : number) {
      const segment = await this.clipSegmentService.findBySegmentKey(segmentKey);
      const segnmentScript = await this.clipSegmentScriptService.findLastBySegmentId(segment.id);
      return success(segnmentScript);
  }

  @Post("/ai/do")
  async doAi(@Body() segmentTaskAiBody : SegmentTaskAiBody) {
    try{
      console.log("request ai ", segmentTaskAiBody.prompt)
      const result = await chat('gpt-4o-mini', [{role : 'user', content : segmentTaskAiBody.prompt}]);
      return success({code : 1, message :result});
    }catch(e){
      return errorToData({code : 0, message : "发生未知异常"})
    }
  }


  @Post("/steps/:key/build")
  async getStepInput(@Param("key") key : string, @Body() segmentStepParam : SegmentStepParam) {
    try{
      segmentStepParam.stepKey = key;
      let result = await this.clipStepService.buildStep(segmentStepParam);
      return success({"code" : 1, "data" : result});
    }catch(e){
      console.error(e);
      return errorToData({code : 0, message : "构建文案前置失败"})
    }
  }

  @Post("/:segmentKey/context/save")
  async saveContext(@Param("segmentKey") segmentKey : string, @Body() clipSegmentStepContextDTO: ClipSegmentStepContextDTO) {
    try{
      const segment = await this.clipSegmentService.findBySegmentKey(segmentKey);
      if(!segment) {
        return errorToData({code : 0, message : "保存失败"})
      }
      await this.clipSegmentStepContextService.saveBySegmentIdAndKey(clipSegmentStepContextDTO.value, segment.id, clipSegmentStepContextDTO.key);
      return success({code : 1, message : "保存成功"});
    }catch(e){
      console.error(e);
      return errorToData({code : 0, message : "保存失败"})
    }
  }


  @Post("/steps/:key/doStep")
  async doStep(@Param("key") key : string, @Body() segmentStepParam : SegmentStepParam) {
    segmentStepParam.stepKey = key;
    try{
      await this.clipStepService.doStep(segmentStepParam);
      return success({code : 1, message : "保存成功"});
    }catch(e){
      console.error(e);
      return errorToData({code : 0, message : "保存失败"})
    }
  }

  @Get("/:segmentKey/steps/:contextKey/context")
  async getContextBySegmentKeyAndContextKey(@Param("segmentKey") segmentKey : string, @Param("contextKey") contextKey : string) {
    const segmentDto = await this.clipSegmentService.findBySegmentKey(segmentKey);
    if(!segmentDto){
      return success([])
    }
    const context = await this.clipSegmentStepContextService.findBySegmentIdAndKey(segmentDto.id, contextKey);
    if(context == null){
      return success([])
    }
    const result = {hashKey : context.hashKey}
    const contextValueJson = toJson(context.value);
    if(contextValueJson){
      result['data'] = contextValueJson;
    }else{
      result['data'] = context.value;
    }
    return success(result);
  }

  @Get("/:id")
  async findBySegmentId(@Param('id') id : number) {
    let result = await this.clipSegmentService.findById(id);
    return success(result);
  }

  @Get("/query/list")
  async findByMaterialId(@Query('materialId') materialId : number) {
    let result = await this.clipSegmentService.findByMaterailId(materialId);
    return success(result);
  }

  @Put("")
  async save(@Body() clipMarkerDTO : ClipSegmentDTO) {
    let result = await this.clipSegmentService.save(clipMarkerDTO);
    return success("保存成功");
  }

  @Post("/:id")
  async update(@Param('id') id, @Body() clipMarkerDTO : ClipSegmentDTO) {
    let result = await this.clipSegmentService.update(id, clipMarkerDTO);
    return success("更新成功");
  }

}

