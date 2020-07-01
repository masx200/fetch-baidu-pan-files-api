import fsextra from "fs-extra";
import { jsonfile } from "./files.js";
import { generatelogid } from "./generatelogid.js";
import { getbdstokenanduser } from "./init.js";
import { objtostrcookie } from "./objtostrcookie.js";
let cacheenv;
let resolve = (result) => {};
let rejecet = (reason) => {};
export async function initPANENV() {
    if (cacheenv) {
        return cacheenv;
    } else {
        cacheenv = new Promise((res, rej) => {
            resolve = res;
            rejecet = rej;
        });
    }
    try {
        let bdstoken = await getbdstokenanduser();
        const panobj = await fsextra.readJSON(jsonfile);
        let coostr = objtostrcookie(panobj);
        const panenv = {
            logid: generatelogid(),
            bdstoken: bdstoken,
            cookie: coostr,
        };
console.log(panenv)
        resolve(panenv);
        return panenv;
    } catch (error) {
        rejecet(error);
        return Promise.reject(error);
    }
}
