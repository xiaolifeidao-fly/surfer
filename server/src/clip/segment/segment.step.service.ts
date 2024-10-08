import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'base/base.service';
import { toJson } from '@utils/json';
import { ClipSegmentService, ClipSegmentStepContextService, ClipSegmentStepService } from './segment.service';
import { ClipSegmentStep } from './entity/segment.entity';
import { ClipSegmentDTO, ClipSegmentStepDTO, SegmentStepParam, SegmentStepResponse } from './dto/segment.dto';
import { ClipMaterialService } from '../material/material.service';
import { v4 as uuidv4 } from 'uuid';
import { chat } from 'ai/openai';

export enum StepModel{
    SERVER = "SERVER",
    PAGE = "PAGE",
}

export enum StepConfig {
   
   PRELIMINARY_COPYWRITING = "PRELIMINARY_COPYWRITING",
   CHARACTER = "CHARACTER",
   REBUILD_ORI_SRT = "REBUILD_ORI_SRT",
   BUILD_COPYWRITING = "BUILD_COPYWRITING",
   VIDEO_CLIP = "VIDEO_CLIP"
}

export const copyWritingStep:StepConfig[] = [
  StepConfig.PRELIMINARY_COPYWRITING,
  StepConfig.CHARACTER,
  StepConfig.REBUILD_ORI_SRT,
  StepConfig.BUILD_COPYWRITING
]

export const videoStep:StepConfig[] = [
  StepConfig.VIDEO_CLIP
]


export function getStepModel(stepConfig: StepConfig|string){
  // switch (stepConfig) {
  //   case StepConfig.PRELIMINARY_COPYWRITING:
  //        return StepModel.PAGE;
  //   default:
  //     return StepModel.SERVER;
  // }
  return StepModel.SERVER;
}

export function getStepDesc(stepConfig: StepConfig|string): string {
  switch (stepConfig) {
    case StepConfig.PRELIMINARY_COPYWRITING:
      return "初版文案";
    case StepConfig.CHARACTER:
      return "生成人物";
    case StepConfig.REBUILD_ORI_SRT:
      return "重构文案";
    case StepConfig.BUILD_COPYWRITING:
      return "生成剪辑内容";
    case StepConfig.VIDEO_CLIP:
        return "视频剪辑";
    default:
      return "未知";
  }
}


abstract class Step {

  segementId : number;
  
  clipSegmentStepService: ClipSegmentStepService;

  clipSegmentStepContextService: ClipSegmentStepContextService;


  params : {} 
  constructor(segementId : number, clipSegmentStepService : ClipSegmentStepService, clipSegmentStepContextService: ClipSegmentStepContextService, params?:{}){
    this.segementId = segementId
    this.clipSegmentStepService = clipSegmentStepService;
    this.clipSegmentStepContextService = clipSegmentStepContextService;
    this.params = params;
  }

  abstract getKey():string;


  async getParams(key : string) : Promise<any> {
    if(this.params != undefined){
       if (key in this.params){
          const value = this.params[key];
          if (typeof value === 'string') {
            this.setParams(key, value, false);
          } else {
            const valueStr = JSON.stringify(value);
            this.setParams(key, valueStr, false);
            return valueStr;
          }
          return value;
       }
    }
    const segemntStepContext =  await this.clipSegmentStepContextService.findBySegmentIdAndKey(this.segementId, key)
    if (segemntStepContext === undefined){
       return "";
    }
    return segemntStepContext.value;
  }

  async setParams(key : string, value : string, updateValueFlag = true) {
    const clipSegmentStep = await this.updateSegmentStep(value, updateValueFlag)
    this.clipSegmentStepContextService.saveContext(clipSegmentStep.id, this.segementId, key, value)
  }

  validate(value : string){
     return JSON.parse(value)
  }


  async getMaterialName(){
    return await this.getParams('materialName');
  }

  async buildInput(){
    const input = await this.getInput();
    return input;
  }

  async updateSegmentStep(output: string, updateValueFlag : boolean){
    const stepKey = this.getKey();
    let clipSegmentStep = await this.clipSegmentStepService.findByKeyAndSegmentId(stepKey, this.segementId);
    if(updateValueFlag){
      clipSegmentStep.output = output;
    }
    return await this.clipSegmentStepService.save(clipSegmentStep);
  }


  abstract getInput():any;

  async getOutput(){
    let clipSegmentStep = await this.clipSegmentStepService.findByKeyAndSegmentId(this.getKey(), this.segementId);
    if(clipSegmentStep == null){
      return null;
    }
    return clipSegmentStep.output;
  }

  async getCharacterNames() : Promise<string>{
    const characterNames = await this.getParams('characterNames');
    let data = "";
    const characterNamesJson = JSON.parse(characterNames);
    for (let value of characterNamesJson) {
      data = data + value['name'] + ":" +value['description'] + "\n";
    }
    return data;
  }

  async getNewSrtData() : Promise<string> {
    const srtData = await this.getParams('newClipSrtData');
    let srtDataText = "";
    const srtDataJson = JSON.parse(srtData);
    for (let value of srtDataJson) {
      srtDataText = srtDataText + value['content'];
    }
    return srtDataText;
  }

  async getClipSrtData() : Promise<string> {
    const srtData =  await this.getParams('clipSrtData');
    return srtData;
  }

  async setOuput(value : string | {} | []){
    let outputValue : string = "";
    if(typeof value === 'string'){
      outputValue = value;
    }else{
      outputValue = JSON.stringify(value);
    }
    await this.setOuputValue(outputValue);
  }
  abstract setOuputValue(value : string);

}

class PreliminaryCopywritingStep extends Step {

  getKey(): string {
    return StepConfig.PRELIMINARY_COPYWRITING;
  }

  async getInput() {
     return `
<背景>
    你现在是一名专业的剪辑师和专业的影视资深解说人,你需要根据<剪辑参考文案>重新生成一份剪辑文案出来
<剪辑参考文案>
    ${await this.getClipSrtData()}
<规则>
    1.请保留原参考文案的核心思想
    2.至少50%的文案和原参考文案不能相同
    3.请给出完整的新的剪辑文案，要求语言通顺,严谨
<输出格式>
    ["content":"","start":"","end":""]
`
  }

  async setOuputValue(value : string) {
    this.validate(value);
    await this.setParams("newClipSrtData", value)
  }
}

class CharacterStep extends Step {

  getKey(): string {
    return StepConfig.CHARACTER;
  }

  async setOuputValue(value: string) {
    this.validate(value);
    await this.setParams("characterNames", value);
  }


  async getInput() {
    return `
<背景>
你现在是一名专业的剪辑师和专业的影视资深解说人,你需要对<<${await this.getMaterialName()}>>电影的<解说文案>内容中梳理出来相关的人物
<解说文案>
${await this.getNewSrtData()}
<输出格式>
    [{"name":"人物名称","description":"人物描述"}]    `
  }

}

class RebuildOriSrtStep extends Step {

  getKey(): string {
    return StepConfig.REBUILD_ORI_SRT;
  }

  async setOuputValue(value: string) {
    const valueJson = this.validate(value);
    const oriSrtData : [] = await this.getOriSrtData();
    const result : {}[] = [];
    oriSrtData.forEach((srt : {},index : number) => {
      let srtId = index + 1;
      result.push({
        "start" : srt['start'],
        "end" : srt['end'],
        "description" : this.getSrtDescription(srtId, valueJson, srt)
      })
    });

    await this.setParams("rebuildOriSrtData", JSON.stringify(result));
  }

  getSrtDescription(srtId : number,  valueJson:[], srt:{}){
    const descriptions = [];
    for (const value of valueJson) {
        if(srtId == value['id']){
           descriptions.push({"name":value['name'],"content":srt['content']});
           return descriptions;
        }
    }
    descriptions.push({"content":srt['content']});
    return descriptions;
  }

  async getOriSrtData() : Promise<[]> {
    let srtData = await this.getParams('oriSrtData');
    if (srtData == null){
       return []; 
    }

    if (typeof srtData === 'string') {
        return JSON.parse(srtData)
    }
    return srtData;
  }

  async getOriSrtDataContent() : Promise<string> {
    let srtData = await this.getParams('oriSrtData');
    if (srtData == null){
       return ""; 
    }

    if (typeof srtData === 'string') {
       srtData = JSON.parse(srtData)
    }
    const newSrtData = [];
    srtData.forEach((srt : {},index : number) => {
      newSrtData.push({
         'id':index+1,
         'content':srt['content']
      })
    })
    return JSON.stringify(newSrtData);
  }

  
  
  async getInput() {
    return `
<背景>
你现在是一名专业的剪辑师和专业的影视资深解说人,请结合你大语言的数据知识,找出<<禁闭岛>>所在<原始影片字幕>对应字幕的人物都是谁说的
<已知人物>
   ${await this.getCharacterNames()}
<原始影片字幕>
  ${await this.getOriSrtDataContent()}
<规则>
  1.content是人物的台词
  1.<已知人物>可能不全,需要你从<原始影片字幕>再次丰富
  2.<已知人物>中在<原始影片字幕>可能没有台词，只有画面,但是由于没有画面的文案描述，所以需要你发挥你强大的想象力来进行思考每段台词都是哪个人物说的
  3.请不要遗漏台词,我需要每段台词对应的人物名称
<返回数据格式>
  只返回json格式的数据,如下所示:
  [{"name":"人物名称","id":"台词对应的id","content":"对应的台词"}]
    `
  }

}

class BuildCopywritingStep extends Step {

  getKey(): string {
    return StepConfig.BUILD_COPYWRITING;
  }

  async setOuputValue(value: string) {
    const srtDatas = JSON.parse(value);
    const newSrtData = [];
    let stashSrtData = undefined;
    for (let srtData of srtDatas) {
        if(stashSrtData == undefined){
          stashSrtData = srtData;
          continue;
        }
        if(srtData.start >=stashSrtData.start  &&  srtData.end <= stashSrtData.end){
           stashSrtData.content = stashSrtData.content + srtData.content;
           continue;
        }
        stashSrtData.key = uuidv4();
        newSrtData.push(JSON.parse(JSON.stringify(stashSrtData)))
        stashSrtData = srtData;
    }
    if(stashSrtData != undefined){
      stashSrtData.key = uuidv4();
      newSrtData.push(JSON.parse(JSON.stringify(stashSrtData)))
    }
    await this.setParams("finallyClipSrtData", JSON.stringify(newSrtData));
  }

  async getAvgSpped(): Promise<any> {
      const srtDataList = await this.getClipSrtData();
      if(srtDataList == undefined){
        return 0;
      }
      let totalSpped = 0;
      const srtDataArray = JSON.parse(srtDataList);
      for(let item of srtDataArray){
        const avgSpeed :number = 1/((item.end -item.start)/item.content.length/1000);
        totalSpped = totalSpped + avgSpeed;
      }
      return totalSpped/srtDataArray.length.toFixed(2);
  }

  async getRebuildOriSrtData() : Promise<string> {
    return await this.getParams('rebuildOriSrtData');
  }


  async getInput() {
    return `
<背景>
  你现在是一名专业的剪辑师和专业的影视资深解说人,找出<参考解说文案>在<原始影片字幕>对应的相关字幕时间
<人物>
  ${await this.getCharacterNames()}
<解说文案>
  ${await this.getNewSrtData()}
<每秒能解说的字数>
  ${await this.getAvgSpped()}
<原始影片字幕>
  ${await this.getRebuildOriSrtData()}
<总结规则>
  1.请充分理解<每秒能解说的字数>、<原始影片字幕>、<解说文案>、<人物>
  2.要求每段解说,给出相关镜头或者描述对应的时间轴
  3.请尽量保证相关镜头和描述的时间段能符合<每秒能解说的字数>
<返回数据格式>
  [{"start":"","end":"","content":"对应时间的解说内容","type":"旁白/影视原声"}]    
  请不要解释,仅返回规定的json格式数据即可。
  `
  }

}




@Injectable()
export class ClipStepService {

  constructor(
    private readonly clipSegmentStepService: ClipSegmentStepService,
    private readonly clipSegmentService: ClipSegmentService,
    private readonly clipSegmentStepContextService: ClipSegmentStepContextService,
    private readonly clipMaterialService: ClipMaterialService,
    

  ) {}

  async buildStep(segmentStepParam : SegmentStepParam) {
     let clipSegment = await this.clipSegmentService.findBySegmentKey(segmentStepParam.segmentKey);
     segmentStepParam.params['materialName'] = await this.getMaterialName(segmentStepParam.materialId);
     const stepInstance = this.getStepInstance(clipSegment.id, segmentStepParam.stepKey, segmentStepParam.params);
     if(stepInstance == null){
        return null;
     }
     const inpput = await stepInstance.buildInput();
     const output = await stepInstance.getOutput();
     return new SegmentStepResponse(inpput, output)
  }

  async getMaterialName(materailId : number){
    const materialDTO = await this.clipMaterialService.findById(materailId);
    if(materialDTO == undefined){
       return null;
    }
    return materialDTO.name;
  }

  async init(materialId : number, segmentKey: string) {
    const stepKeys = Object.values(StepConfig);
    let clipSegmentDTO = await this.clipSegmentService.findBySegmentKey(segmentKey);
    for(let stepKey of stepKeys){
        await this.saveSegmentStep(stepKey, clipSegmentDTO.id)
    }
  }

  async saveSegmentStep(key : string, segmentId : number){
    let clipSegmentStepDTO = await this.clipSegmentStepService.findByKeyAndSegmentId(key, segmentId);
    if(clipSegmentStepDTO == null){
      clipSegmentStepDTO = new ClipSegmentStepDTO();
      clipSegmentStepDTO.key = key;
      clipSegmentStepDTO.segmentId = segmentId;
      return await this.clipSegmentStepService.save(clipSegmentStepDTO);
    }
    return clipSegmentStepDTO;
  }

  async doStep(segmentStepParam : SegmentStepParam) {
    let clipSegmentDTO = await this.clipSegmentService.findBySegmentKey(segmentStepParam.segmentKey);
    const stepInstance = this.getStepInstance(clipSegmentDTO.id, segmentStepParam.stepKey);
    if(stepInstance == null){
       return null;
    }
    await stepInstance.setOuput(segmentStepParam.output)
    return stepInstance;
  }


  getStepInstance(segementId: number, key : string, params? : {}){
    if(key == StepConfig.PRELIMINARY_COPYWRITING){
      return new PreliminaryCopywritingStep(segementId, this.clipSegmentStepService, this.clipSegmentStepContextService, params);
    }else if(key == StepConfig.CHARACTER){
      return new CharacterStep(segementId, this.clipSegmentStepService, this.clipSegmentStepContextService, params);
    }else if(key == StepConfig.REBUILD_ORI_SRT){
      return new RebuildOriSrtStep(segementId, this.clipSegmentStepService, this.clipSegmentStepContextService, params);
    }else if(key == StepConfig.BUILD_COPYWRITING){
      return new BuildCopywritingStep(segementId, this.clipSegmentStepService, this.clipSegmentStepContextService, params);
    }
    return null;
  }

}




