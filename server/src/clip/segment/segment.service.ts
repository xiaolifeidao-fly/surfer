import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'base/base.service';
import { ClipSegment, ClipSegmentScript, ClipSegmentStep, ClipSegmentStepContext } from './entity/segment.entity';
import { ClipSegmentScriptDTO, ClipSegmentDTO, ClipSegmentStepContextDTO, ClipSegmentStepDTO } from './dto/segment.dto';
import { convert } from '@utils/convert';
import { sha256Hash } from '@utils/hash';


@Injectable()
export class ClipSegmentService extends BaseService<ClipSegmentDTO, ClipSegment>{
  

  constructor(
    @InjectRepository(ClipSegment)
    private readonly clipSegmentRepository :  Repository<ClipSegment>,
  ) {
    super(clipSegmentRepository, ClipSegmentDTO, ClipSegment); 
  } 

  async findByMaterailId(materialId: number) {
    const segments = await this.clipSegmentRepository.find({where : {materialId: materialId}, order :{id : "ASC"}});
    return this.toDTOs(segments)
  }

  async findBySegmentKey(segmentKey: string) {
    const entity = await this.clipSegmentRepository.findOneBy({segmentKey: segmentKey});
    return this.toDTO(entity);
  }

  async getOrSaveClipSegment(materialId : number, segmentKey : string, ) {
    let clipSegmentDTO = await this.findBySegmentKey(segmentKey);
    if(clipSegmentDTO == null){
        clipSegmentDTO = new ClipSegmentDTO();
        clipSegmentDTO.segmentKey = segmentKey;
        clipSegmentDTO.materialId = materialId;
        return await this.save(clipSegmentDTO);
    }
    return clipSegmentDTO
  }

  async init(materialId: number, segments: ClipSegmentDTO[]) {
      const hadSegments = await this.findByMaterailId(materialId);
      for (const hadSegnment of hadSegments) {
         const segment = this.isExitedBySegmentKeys(hadSegnment, segments);
         if(!segment){
            await this.clipSegmentRepository.delete({id : hadSegnment.id})
         }else{
            hadSegnment.start = segment.start;
            hadSegnment.end = segment.end;
            hadSegnment.title = segment.title;
            await this.save(hadSegnment);
         }
      }
      for (const segment of segments) {
          if(!this.isExitedBySegments(hadSegments, segment)){
            const clipSegmentDTO = new ClipSegmentDTO();
            clipSegmentDTO.segmentKey = segment.segmentKey;
            clipSegmentDTO.start = segment.start;
            clipSegmentDTO.end = segment.end;
            clipSegmentDTO.title = segment.title;
            clipSegmentDTO.type = segment.type;
            clipSegmentDTO.materialId = materialId;
            await this.save(clipSegmentDTO);
          }
      }
  }

  isExitedBySegmentKeys(hadSegnment : ClipSegmentDTO, segments : ClipSegmentDTO[]){
    for(const segment of segments){
      if(segment.segmentKey == hadSegnment.segmentKey){
        return segment;
      }
    }
    return null;
  }

  isExitedBySegments(hadSegnments : ClipSegmentDTO[], segment : ClipSegmentDTO){
    for(const hadSegnment of hadSegnments){
      if(hadSegnment.segmentKey == segment.segmentKey){
        return true;
      }
    }
    return false;
  }

}

@Injectable()
export class ClipSegmentStepService extends BaseService<ClipSegmentStepDTO, ClipSegmentStep>{

  constructor(
    @InjectRepository(ClipSegmentStep)
    private readonly clipSegmentStepRepository :  Repository<ClipSegmentStep>,
  ) {
    super(clipSegmentStepRepository, ClipSegmentStepDTO, ClipSegmentStep);
  } 

  async findByKeyAndSegmentId(key: string, segementId: number) {
    const clipSegmentStep = await this.clipSegmentStepRepository.findOneBy({key:key, segmentId:segementId})
    return this.toDTO(clipSegmentStep)
  }

  // async updateOutputByKey(segmentId : number, key : string, output : string){
  //   await this.clipSegmentStepRepository.update({segmentId: segmentId, key: key},{ output:output})
  // }

}


@Injectable()
export class ClipSegmentStepContextService extends BaseService<ClipSegmentStepContextDTO, ClipSegmentStepContext>{
  

  constructor(
    @InjectRepository(ClipSegmentStepContext)
    private readonly clipSegmentStepRepository :  Repository<ClipSegmentStepContext>,
  ) {
    super(clipSegmentStepRepository, ClipSegmentStepContextDTO, ClipSegmentStepContext);
  } 


  async findBySegmentIdAndKey(segmentId : number, key : string){
    const segmentStepContext = await this.clipSegmentStepRepository.findOneBy({segmentId: segmentId, key: key})
    return this.toDTO(segmentStepContext);
  }

  async saveBySegmentIdAndKey(value : string, segmentId : number, key : string){
      return await this.saveContext(undefined, segmentId, key, value);
  }

  async saveContext(segmentStepId : number, segmentId : number, key : string, value : string){
    let segmentStepContext = await this.clipSegmentStepRepository.findOneBy({segmentId: segmentId, key: key})
    const valueHash = await sha256Hash(value);
    if(segmentStepContext == null){
       segmentStepContext = new ClipSegmentStepContext();
       segmentStepContext.key = key;
       segmentStepContext.segmentId = segmentId;
       segmentStepContext.segmentStepId = segmentStepId;
    }
    if(valueHash != segmentStepContext.hashKey){
       segmentStepContext.hashKey = valueHash;
    }
    segmentStepContext.value = value;
    await this.clipSegmentStepRepository.save(segmentStepContext);
  }
}


@Injectable()
export class ClipSegmentScriptService extends BaseService<ClipSegmentScriptDTO, ClipSegmentScript>{
  

  constructor(
    @InjectRepository(ClipSegmentScript)
    private readonly clipSegmentScriptRepository :  Repository<ClipSegmentScript>,
  ) {
    super(clipSegmentScriptRepository, ClipSegmentScriptDTO, ClipSegmentScript);
  } 


  async findLastBySegmentId(segmentId: number) {
    return await this.clipSegmentScriptRepository.findOne({
      where:{clipSegmentId :segmentId },
      order :{version : "DESC"},
   });
  }

  async saveScript(materialId : number, segmentId : number, value : string){
    let segmentScript = await this.findLastBySegmentId(segmentId);
    const valueHash = await sha256Hash(value);
    if(segmentScript == null){
       segmentScript = new ClipSegmentScript();
       segmentScript.materialId = materialId;
       segmentScript.clipSegmentId = segmentId;
       segmentScript.version = 1;
       segmentScript.hashKey = valueHash;
       segmentScript.content = value;
       return await this.saveByEntity(segmentScript);
    }
    if(valueHash == segmentScript.hashKey){
      return this.toDTO(segmentScript);
    }
    let segmentScriptNum = await this.clipSegmentScriptRepository.countBy({clipSegmentId : segmentId});
    if(segmentScriptNum <10){
        segmentScript.id = undefined;
    }
    segmentScript.content = value;
    segmentScript.version = segmentScript.version +1;
    return await this.saveByEntity(segmentScript);
  }

  async saveByEntity(entity : ClipSegmentScript){
    const targetE = await this.repository.save(entity);
    return convert(this.dtoClass, targetE);
  }
}





