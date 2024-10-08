import { BaseDTO, BaseQuery } from "base/base.dto";




export class ClipTaskDTO extends BaseDTO{

  materialId: number;

  name : string;

  status : string;

  message : string;

  type : string;

  statusDisplay : string;
  typeDisplay : string;


}

export class ClipTaskQuery extends BaseQuery{

  materialId: number;
  
}

export class ClipSegmentTaskDTO extends BaseDTO{

  taskId: number;

  name : string;

  segmentId: number;

  stepKey : string;

  cost : number;

  stepModel: string;

  status : string;


  message : string;

  statusDisplay : string;

  stepKeyDisplay : string;

}

export class ClipSegmentTaskQuery extends BaseQuery{

  taskId: number;
  
  
}
