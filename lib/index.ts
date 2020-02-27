import fsextra from "fs-extra";
import process from "process";
import { deletefiles } from "./fetch-delete-files.js";
import { listonedir } from "./fetchlistdir.js";
import { jsonfile } from "./files.js";
import { generatelogid } from "./generatelogid.js";
import { getbdstokenanduser } from "./init.js";
import { objtostrcookie } from "./objtostrcookie.js";

process.on("unhandledRejection", err => {
    throw err;
});
interface PANENV {
    logid: string;
    bdstoken: string;
    user: string;
    cookie: string;
}
let cacheenv: PANENV | undefined;
export async function initPANENV(): Promise<PANENV> {
    if (cacheenv) {
        return cacheenv;
    }
    let [bdstoken, user] = await getbdstokenanduser();
    const panobj = await fsextra.readJSON(jsonfile);
    let coostr = objtostrcookie(panobj);
    const panenv: PANENV = {
        logid: generatelogid(),
        bdstoken: bdstoken,
        user: user,
        cookie: coostr
    };
    cacheenv = panenv;
    return panenv;
}
export { listonedir, deletefiles };
