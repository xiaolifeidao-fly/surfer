import { BaseEntity } from "base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({name:"clip_task"})
export class ClipTask extends BaseEntity{

  @Column()
  materialId: number;

  @Column()
  name : string;

  @Column()
  type : string;

  @Column()
  status : string;

  @Column()
  message : string;

}

@Entity({name:"clip_segment_task"})
export class ClipSegmentTask extends BaseEntity{

  @Column()
  taskId: number;

  @Column()
  name : string;

  @Column()
  segmentId: number;

  @Column()
  stepKey : string;

  @Column()
  stepModel: string;

  @Column()
  status : string;

  cost : number;

  @Column()
  message : string;

}