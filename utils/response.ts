class WebResponse<T> {
    code : number
    data : T

    constructor(code: number, data : T) {
        this.code = code
        this.data = data
    }
}


const success = <T> (data : T) => {
    return new WebResponse(1, data)
}

const errorToData = <T> (data : T) => {
    return new WebResponse(1, data)
}
const error =  (message : string) => {
    return new WebResponse(0, message)
}

export {
    success,
    errorToData,
    error
}