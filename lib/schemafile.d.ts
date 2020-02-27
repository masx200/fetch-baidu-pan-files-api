import mongoose from "mongoose";
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
declare const panfileschema: mongoose.Schema<any>;
export default panfileschema;
