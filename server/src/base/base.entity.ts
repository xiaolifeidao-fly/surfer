import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity as TypeORMBaseEntity, Column } from 'typeorm';

export class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number|undefined;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdTime: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public updatedTime: Date;

  @Column({ nullable: true })
  public createdBy: string;

  @Column({ nullable: true })
  public updatedBy: string;

  @Column({ nullable: true })
  public active: boolean;

}


