export declare function taskquerydeletepoll(
    taskid: number,
    filelist: string[]
): Promise<void>;
export declare function taskquerydeleteonce(
    taskid: number,
    filelist: string[]
): Promise<{
    status: string;
    progress: any;
}>;
