export type PreProcessingResult = {
    str: string,
    arr: string[]
}

export type ApiResponse = {
    status : boolean;
    code?  : number;
    message: string;
    data?  : any;
};