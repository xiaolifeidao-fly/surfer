import { Injectable } from "@nestjs/common";
import { ClipSegmentTaskService, ClipTaskService, Status, TaskType } from "./task.service";
import { ClipSegmentTaskDTO, ClipTaskDTO } from "./dto/task.dto";
import { formatTimestamp } from "@utils/time";
import { ClipSegmentService } from "../segment/segment.service";
import { StepConfig, copyWritingStep, getStepDesc, getStepModel, videoStep } from "../segment/segment.step.service";


@Injectable()
export class ClipTaskStepService {
    constructor(
        private readonly clipSegmentTaskService: ClipSegmentTaskService,
        private readonly clipTaskService: ClipTaskService,
        private readonly clipSegmentService: ClipSegmentService,

    
    ) {}

    async createCopyWritingTask(materialId : number){
        const clipTask = new ClipTaskDTO();
        clipTask.materialId = materialId;
        clipTask.name = `${materialId}_${formatTimestamp(new Date())}`
        clipTask.status = Status.INIT;
        clipTask.type = TaskType.COPY_WRITING;
        const task = await this.clipTaskService.save(clipTask);
        await this.createSegmentTask(materialId, task.id, copyWritingStep);
        return task.id;
    }

    async createVideoTask(materialId : number){
        const clipTask = new ClipTaskDTO();
        clipTask.materialId = materialId;
        clipTask.name = `${materialId}_${formatTimestamp(new Date())}`
        clipTask.status = Status.INIT;
        clipTask.type = TaskType.VIDEO;
        const task = await this.clipTaskService.save(clipTask);
        await this.createSegmentTask(materialId, task.id, videoStep);
        return task.id;
    }

    async createSegmentTask(materialId : number, taskId : number, stepEntries : StepConfig[]){
        const segmentList = await this.clipSegmentService.findByMaterailId(materialId);
        if(!segmentList || segmentList.length == 0){
            return;
        }
        segmentList.forEach(async (segment,index) =>{
            for (let stepEntry of stepEntries){
                const clipSegmentTask = new ClipSegmentTaskDTO();
                if(stepEntry == StepConfig.VIDEO_CLIP){
                    continue;
                }
                const stepDesc = getStepDesc(stepEntry);
                clipSegmentTask.name = `第${index+1}段_${formatTimestamp(new Date())}_${stepDesc}`;
                clipSegmentTask.status = Status.INIT;
                clipSegmentTask.segmentId = segment.id;
                clipSegmentTask.stepKey = stepEntry;
                clipSegmentTask.taskId = taskId;
                clipSegmentTask.stepModel = getStepModel(stepEntry);
                await this.clipSegmentTaskService.save(clipSegmentTask);
            }
        })
    }

    async getSegmentTask(taskId: number){
        return await this.clipSegmentTaskService.findByTaskId(taskId);
    }


}



