export declare function deletefiles(rawfiles: Array<string>): Promise<void>;

export declare function fetchdeletetaskid(
    filestoremove: string[]
): Promise<number | undefined>;

export declare function initPANENV(): Promise<PANENV>;

export declare function listdirpage(
    dir: string,
    page: number
): Promise<Array<PANFILE | PANDIR>>;

export declare function listonedir(
    dir: string
): Promise<Array<PANFILE | PANDIR>>;

export declare type PANDIR = {
    dir_empty: number;
    empty: number;
    category: number;
    fs_id: number;
    isdir: 1;
    local_ctime: number;
    local_mtime: number;
    oper_id: number;
    path: string;
    server_ctime: number;
    server_filename: string;
    server_mtime: number;
    share: number;
    size: number;
    unlist: number;
};

export declare interface PANENV {
    logid: string;
    bdstoken: string;
    cookie: string;
}

export declare type PANFILE = {
    category: number;
    fs_id: number;
    isdir: 0;
    local_ctime: number;
    local_mtime: number;
    md5: string;
    oper_id: number;
    path: string;
    server_ctime: number;
    server_filename: string;
    server_mtime: number;
    share: number;
    size: number;
    unlist: number;
};

export declare function taskquerydeleteonce(
    taskid: number,
    filelist: string[]
): Promise<{
    status: string;
    progress: any;
}>;

export declare function taskquerydeletepoll(
    taskid: number,
    filelist: string[]
): Promise<void>;

export {};
