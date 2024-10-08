import { BaseDTO, BaseQuery } from "base/base.dto";

export class ClipSegmentDTO extends BaseDTO{
  
  materialId : number;

  type : string;

  segmentKey: string;

  title: string;

  start: number;

  end: number;

}

export class ClipSegmentStepDTO extends BaseDTO {

  segmentId : number;

  key : string;

  params : {};

  output : string;
  
}

export class ClipSegmentStepContextDTO extends BaseDTO {

  segmentStepId : number;

  segmentId : number;

  key : string;

  value : string;

  hashKey : string;
  
}

export class ClipSegmentScriptDTO extends BaseDTO {

  materialId : number;

  clipSegmentId : number;

  content : string;

  hashKey : string;
  
  version : string;
}


export class SegmentStepParam { 
   
  materialId : number;

  params : {};

  type : string;

  segmentKey: string;

  stepKey : string;

  output : string | {} | [];

}

export class SegmentParams {
  
  materialId : number;
  segments : ClipSegmentDTO[];
}

export class SegmentScript {

    materialId : number;
    finallyClipSrtData : []
    contentScript : [];
}

export class SegmentStepResponse {

  input : string;

  output : string;

  constructor(input : string, output : string){
    this.input = input;
    this.output = output;
  }
}


export class SegmentTaskAiBody{

   prompt : string;
}

  