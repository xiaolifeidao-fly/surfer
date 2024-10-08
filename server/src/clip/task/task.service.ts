import { Injectable } from "@nestjs/common";
import { BaseService } from "base/base.service";
import { ClipSegmentTaskDTO, ClipSegmentTaskQuery, ClipTaskDTO, ClipTaskQuery } from "./dto/task.dto";
import { ClipSegmentTask, ClipTask } from "./entity/task.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PageDTO, convertToPageDTO } from "base/base.dto";
import { findPage } from "orm/repository";
import { StepConfig, copyWritingStep, getStepDesc, videoStep } from "../segment/segment.step.service";

export enum TaskType {
    COPY_WRITING = "COPY_WRITING",
    VIDEO = "VIDEO"
}
export function getTaskTypeDesc(taskType: TaskType|string): string {
    switch (taskType) {
      case TaskType.COPY_WRITING:
        return "文案任务";
      case TaskType.VIDEO:
        return "视频任务";
      default:
        return "未知";
    }
}

  
export enum Status {
   
    INIT = "INIT",
    PENDING = "PENDING",
    DONE = "DONE",
    STOP = "STOP",
    PAUSE = "PAUSE",
    IGNORE = "IGNORE",
    ERROR = "ERROR"
    
 }
 
 export function getStatusDesc(status: Status|string): string {
   switch (status) {
     case Status.INIT:
       return "初始化";
     case Status.PENDING:
       return "进行中";
     case Status.DONE:
       return "完成";
     case Status.STOP:
       return "停止";
     case Status.PAUSE:
       return "暂停";
     case Status.IGNORE:
       return "忽略";
     case Status.ERROR:
       return "错误";
     default:
       return "未知";
   }
 }

@Injectable()
export class ClipTaskService extends BaseService<ClipTaskDTO, ClipTask>{
    constructor(
        @InjectRepository(ClipTask)
        private readonly clipTaskRepository :  Repository<ClipTask>,

      ) {
        super(clipTaskRepository, ClipTaskDTO, ClipTask); 
    } 

    async page(params: ClipTaskQuery) : Promise<PageDTO<ClipTaskDTO> | undefined>{
        let result = await findPage(this.clipTaskRepository, this.buildQuerySql(params), params.pageIndex, params.pageSize, this.buildQueryParams(params));
        return convertToPageDTO(ClipTaskDTO, result, (clipTaskDTO : ClipTaskDTO)=>{
            clipTaskDTO.statusDisplay = getStatusDesc(clipTaskDTO.status);
            clipTaskDTO.typeDisplay = getTaskTypeDesc(clipTaskDTO.type);
        });
    }

    async updateTask(taskId : number, status : string, message : string){
        const clipTask = await this.clipTaskRepository.findOneById(taskId);
        clipTask.status = status;
        clipTask.message = message;
        await this.clipTaskRepository.save(clipTask);
    }

    buildQueryParams(params: ClipTaskQuery){
        const queryParams = {};
        if(params.materialId != undefined){
           queryParams['materialId'] = params.materialId;
        }
        return queryParams;
    }
    
    buildQuerySql(params: ClipTaskQuery){
         let sql = "select * from clip_task where 1 =1 ";
         if(params.materialId != undefined){
              sql = sql + " and material_id = :materialId ";
         }
         sql = sql + " order by id desc";
         return sql;
    
    }
}


@Injectable()
export class ClipSegmentTaskService extends BaseService<ClipSegmentTaskDTO, ClipSegmentTask>{
    constructor(
        @InjectRepository(ClipSegmentTask)
        private readonly clipSegmentTaskRepository :  Repository<ClipSegmentTask>,
        private readonly clipTaskService: ClipTaskService,

      ) {
        super(clipSegmentTaskRepository, ClipSegmentTaskDTO, ClipSegmentTask); 
    } 

    async page(params: ClipSegmentTaskQuery) : Promise<PageDTO<ClipSegmentTaskDTO> | undefined>{
        const task = await this.clipTaskService.findById(params.taskId);
        let num = videoStep.length;
        if(task.type == TaskType.COPY_WRITING){
            num = copyWritingStep.length;
        }
        let result = await findPage(this.clipSegmentTaskRepository, this.buildQuerySql(params), params.pageIndex, params.pageSize * num, this.buildQueryParams(params));
        const page = convertToPageDTO(ClipSegmentTaskDTO, result, (dto : ClipSegmentTaskDTO)=>{
            dto.statusDisplay = getStatusDesc(dto.status);
            dto.stepKeyDisplay = getStepDesc(dto.stepKey);

        });
        return page;
    }

    async updateTask(id : number, status : string, message? : string){
        const clipSegmentTask = await this.clipSegmentTaskRepository.findOneById(id);
        clipSegmentTask.status = status;
        if(message) {
            clipSegmentTask.message = message;
            clipSegmentTask.updatedTime = new Date();
        }
        await this.clipSegmentTaskRepository.save(clipSegmentTask);
    }


    buildQueryParams(params: ClipSegmentTaskQuery){
        const queryParams = {};
        if(params.taskId != undefined){
           queryParams['taskId'] = params.taskId;
        }
        return queryParams;
    }
    
    buildQuerySql(params: ClipSegmentTaskQuery){
         let sql = "select * from clip_segment_task where 1 =1 ";
         if(params.taskId != undefined){
              sql = sql + " and task_id = :taskId ";
         }
         sql = sql + " order by id, updated_time desc ";
         return sql;
    
    }

    async findByTaskId(taskId : number){
        const segmentTasks = await this.clipSegmentTaskRepository.findBy({taskId: taskId});
        return this.toDTOs(segmentTasks);
    }
}

