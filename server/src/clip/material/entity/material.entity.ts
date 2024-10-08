import { BaseEntity } from 'base/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({name:"clip_material"})
export class ClipMaterial extends BaseEntity{

  @Column()
  name: string;

  @Column()
  tag: string;

}