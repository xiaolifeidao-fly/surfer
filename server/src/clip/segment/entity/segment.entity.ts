import { BaseEntity } from 'base/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"clip_segment"})
export class ClipSegment extends BaseEntity{

  @Column()
  materialId : number;

  @Column()
  type : string;

  @Column()
  segmentKey: string;

  @Column()
  title: string;

  @Column()
  start: number;

  @Column()
  end: number;
}


@Entity({name:"clip_segment_step"})
export class ClipSegmentStep extends BaseEntity {

  @Column()
  segmentId : number;

  @Column()
  key : string;

  @Column()
  output : string;

}

@Entity({name:"clip_segment_step_context"})
export class ClipSegmentStepContext extends BaseEntity {

  @Column()
  segmentStepId : number;

  @Column()
  segmentId : number;

  @Column()
  key : string;

  @Column()
  value : string;

  @Column()
  hashKey : string;
  
}

@Entity({name:"clip_segment_script"})
export class ClipSegmentScript extends BaseEntity {

  @Column()
  clipSegmentId : number;

  @Column()
  materialId : number;

  @Column()
  content : string;

  @Column()
  hashKey : string;
  
  @Column()
  version : number;
}

