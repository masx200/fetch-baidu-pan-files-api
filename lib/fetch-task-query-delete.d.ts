export declare function taskquerydeletepoll(taskid: number): Promise<void>;
export declare function taskquerydeleteonce(
    taskid: number
): Promise<{
    status: string;
    progress: any;
}>;
