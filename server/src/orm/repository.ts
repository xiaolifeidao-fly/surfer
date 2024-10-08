import { Repository} from 'typeorm';
import { CustomNamingStrategy } from './orm.config';


export interface PaginatedResult<T> {
  items: T[];
  total: number;
}
const namingStrategy = new CustomNamingStrategy();

function convertSqlAndParams(sql: string, params?: {}):{ formattedSQL: string, sortedParams: any[] }{
    // 提取 SQL 中的命名参数
    const namedParams = sql.match(/:\w+/g);
    // 将命名参数替换为问号
    let formattedSQL : string = "";
    const sortedParams = [];
    if(namedParams == undefined){
        formattedSQL = sql;
        return { formattedSQL, sortedParams };
    }
    namedParams.forEach((param) => {
        formattedSQL = sql.replace(param, "?");
    });
    // 按照在 SQL 中出现的顺序对参数进行排序
    namedParams.forEach((param) => {
        const paramName = param.substring(1); // 去掉冒号
        sortedParams.push(params[paramName]);
    });

    return { formattedSQL, sortedParams };

}

export async function findPage<T>(repository : Repository<T>, sql: string, pageIndex : number, pageSize : number, params?: {}): Promise<PaginatedResult<any>> {
    if (pageIndex === undefined){
        pageIndex = 1;
    }
    if (pageSize === undefined){
        pageSize = 10;
    }
    if (pageIndex < 1){
        pageIndex = 1;
    }
    const index = (pageIndex - 1) * pageSize;
    const query_sql = `${sql} limit ${index},${pageSize} `
    let items: any[] = await query(repository, query_sql, params );
    let total = await countBySql(repository, sql, params);
    return {
        items,
        total: total
    };
}

export async function countBySql<T>(repository : Repository<T>, sql: string, params?: {}): Promise<number> {
    sql = `select count(1) as total from (${sql}) as count_result`
    let reuslt = await query(repository, sql, params)
    return Number(reuslt[0].total)
}

export async function query<T>(repository : Repository<T>, sql: string, params?: {}): Promise<any> {
    const convertResult = convertSqlAndParams(sql, params);
    const resultList = await repository.query(convertResult.formattedSQL, convertResult.sortedParams);
    if(!resultList || resultList.length === 0){
        return resultList;
    }
    const newResultList : {}[] = [];
    for(let result of resultList ){
        const newResult = {};
        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                newResult[snakeToCamel(key)] = result[key];
            }
        }
        newResultList.push(newResult);
    }
    return newResultList;
}

function snakeToCamel(snakeCase: string): string {
    return snakeCase.replace(/(_\w)/g, match => match[1].toUpperCase());
  }
  


