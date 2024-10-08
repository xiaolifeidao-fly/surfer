import { BaseDTO, BaseQuery } from "base/base.dto";

export class ClipMaterailDTO extends BaseDTO{
  
    name: string;
    tag: string;
  }


export class ClipMaterailQuery extends BaseQuery{

    name : string;
}
  