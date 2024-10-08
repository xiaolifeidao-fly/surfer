import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ClipSegmentTaskService, ClipTaskService, TaskType, getStatusDesc, getTaskTypeDesc } from "./task.service";
import { ClipSegmentTaskDTO, ClipSegmentTaskQuery, ClipTaskDTO, ClipTaskQuery } from "./dto/task.dto";
import { errorToData, success } from "@utils/response";
import { ClipTaskStepService } from "./task.step.service";
import { ClipSegmentDTO } from "../segment/dto/segment.dto";
import { getStepDesc } from "../segment/segment.step.service";

@Controller("clip/tasks")
export class ClipTaskController {

  constructor(
    private readonly clipTaskService: ClipTaskService,

    private readonly clipTaskStepService: ClipTaskStepService,
  ) {}

  @Get("/query/page")
  async page(@Query() params : ClipTaskQuery){
     const page = await this.clipTaskService.page(params);
     return success(page);
  }

  @Put("/createTask")
  async createTask(@Body() params : ClipTaskDTO){
     try{
        let taskId : number;
        if(params.type == TaskType.COPY_WRITING){
            taskId = await this.clipTaskStepService.createCopyWritingTask(params.materialId)
        }else if(params.type == TaskType.VIDEO){
            taskId = await this.clipTaskStepService.createVideoTask(params.materialId)
        }
        return success({code : 1, message : "创建成功", taskId : taskId});
      }catch(e){
        return errorToData({code : 0, message : "创建失败"})
      }
  }

  @Get("/:taskId/find")
  async findById(@Param("taskId") taskId : number){
     try{
        const reuslt = await this.clipTaskService.findById(taskId,(dto : ClipTaskDTO)=>{
            dto.statusDisplay = getStatusDesc(dto.status);
            dto.typeDisplay = getTaskTypeDesc(dto.type);
        });
        return success(reuslt);
      }catch(e){
        return errorToData({code : 0, message : "更新失败"})
      }
  }

  @Post("/:taskId/update")
  async updateTask(@Param("taskId") taskId : number, @Body() params : ClipTaskDTO){
     try{
        await this.clipTaskService.updateTask(taskId, params.status, params.message);
        return success({code : 1, message : "更新成功"});
      }catch(e){
        return errorToData({code : 0, message : "更新失败"})
      }
  }

}


@Controller("clip/tasks/segments")
export class ClipSegmentTaskController {

  constructor(
    private readonly clipSegmentTaskService: ClipSegmentTaskService,
  ) {}

  @Get("/query/page")
  async page(@Query() params : ClipSegmentTaskQuery, @Query("taskId") taskId : number){
     const result = await this.clipSegmentTaskService.page(params);
     return success(result);
  }

  @Get("/:taskId/segmentTasks")
  async findByTaskId(@Param("taskId") taskId : number){
    const result = await this.clipSegmentTaskService.findByTaskId(taskId);
     return success(result);
  }

  @Post("/:segmentTaskId/update")
  async updateTask(@Param("segmentTaskId") segmentTaskId : number, @Body() params : ClipSegmentTaskDTO){
     try{
        await this.clipSegmentTaskService.updateTask(segmentTaskId, params.status, params.message);
        return success({code : 1, message : "更新成功"});
      }catch(e){
        return errorToData({code : 0, message : "更新失败"})
      }
  }

  @Get("/:segmentTaskId/find")
  async find(@Param("segmentTaskId") segmentTaskId : number){
      const result = await this.clipSegmentTaskService.findById(segmentTaskId);
      return success(result);
  }

}