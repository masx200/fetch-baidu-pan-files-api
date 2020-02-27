import { deletefiles } from "./fetch-delete-files.js";
import { listonedir } from "./fetchlistdir.js";
interface PANENV {
    logid: string;
    bdstoken: string;
    user: string;
    cookie: string;
}
export declare function initPANENV(): Promise<PANENV>;
export { listonedir, deletefiles };
