import fsextra from "fs-extra";
import { jsonfile } from "./files.js";
import { generatelogid } from "./generatelogid.js";
import { getbdstokenanduser } from "./init.js";
import { objtostrcookie } from "./objtostrcookie.js";
let cacheenv;
export async function initPANENV() {
    if (cacheenv) {
        return cacheenv;
    }
    let [bdstoken, user] = await getbdstokenanduser();
    const panobj = await fsextra.readJSON(jsonfile);
    let coostr = objtostrcookie(panobj);
    const panenv = {
        logid: generatelogid(),
        bdstoken: bdstoken,
        user: user,
        cookie: coostr
    };
    cacheenv = panenv;
    return panenv;
}
