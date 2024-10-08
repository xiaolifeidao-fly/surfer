
export function convert<T>(clazz: { new (...args: any[]): T }, source : any, rebuild?:(t : T)=>void) : T | undefined {
    if (source == undefined){
        return undefined;
    }
    let target = new clazz();
    Object.assign(target, source);
    if(rebuild){
        rebuild(target);
    }
    return target
}



export function convertToList<T>(clazz: { new (...args: any[]): T }, source : any[], rebuild?:(t : T)=>void) : T[] | undefined {
    let target_list : T[] = []
    source.forEach(function (item){
        let target = new clazz();
        Object.assign(target, item);
        if(rebuild){
            rebuild(target);
        }
        target_list.push(target)
    })
    return target_list
}

