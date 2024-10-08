import { BaseDTO } from 'base/base.dto';
import { Repository } from 'typeorm';
import { convert } from '@utils/convert';
import { BaseEntity } from './base.entity';
import { zip } from 'rxjs';

export class BaseService<T extends BaseDTO, E extends BaseEntity> {
  

    public readonly repository: Repository<E>;
    readonly dtoClass: new () => T;
    readonly entityClass: new () => E;
  
    constructor(repository: Repository<E>, dtoClass: new () => T, entityClass: new () => E) {
        this.repository = repository;
        this.dtoClass = dtoClass
        this.entityClass = entityClass;
    }

    async save(dto: T|Promise<T>) : Promise<T>{
        let e : E = convert(this.entityClass, dto);
        const targetE = await this.repository.save(e);
        return convert(this.dtoClass, targetE);
    }

    async update(id: number, dto: T) : Promise<T>{
        dto.id = id
        return await this.save(dto)
    }

    async findById(id : number, rebuild?:(t : T)=>void): Promise<T> {
        let result : E = await this.repository.findOneById(id);
        return convert(this.dtoClass, result, rebuild);
    }

    toDTO(obj : E){
        return convert(this.dtoClass, obj);
    }

    toDTOs(objs: E[]) {
        const result : T[] = [];
        for (let obj of objs) {
            const t : T = convert(this.dtoClass, obj);
            result.push(t);
        }
        return result;
    }

    toEnitty(obj : T){
        return convert(this.dtoClass, obj);
    }

}



