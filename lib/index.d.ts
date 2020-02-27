import { deletefiles } from "./fetch-delete-files.js";
import { listonedir } from "./fetchlistdir.js";
export declare const PANENV: {
    logid: string;
    bdstoken: string | undefined;
    user: string | undefined;
    cookie: string | undefined;
};
export { listonedir, deletefiles };
