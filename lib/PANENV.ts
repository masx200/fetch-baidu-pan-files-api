import fsextra from "fs-extra";
import { jsonfile } from "./files.js";
import { generatelogid } from "./generatelogid.js";
import { getbdstokenanduser } from "./init.js";
import { objtostrcookie } from "./objtostrcookie.js";
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
