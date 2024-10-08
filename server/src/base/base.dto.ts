import { PaginatedResult } from "orm/repository";
import { convertToList } from "@utils/convert";

export class BaseDTO {
  public id: number;

  public createdTime: Date;

  public updatedTime: Date;

  public createdBy: string;

  public updatedBy: string;

  public active: boolean;

}

export class BaseQuery extends BaseDTO {

  pageSize: number = 10;
  pageIndex: number = 1;

}

export class PageDTO<T>{
  data : T[]
  total : number
}


export function convertToPageDTO<T>(clazz: { new (...args: any[]): T }, page : PaginatedResult<T>, rebuild?:(t : T)=>void) :PageDTO<T> {
  return {
     data : convertToList(clazz, page.items, rebuild),
     total : page.total
  }
}


