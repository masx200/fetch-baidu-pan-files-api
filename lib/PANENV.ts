import fsextra from "fs-extra";
import { jsonfile } from "./files.js";
import { generatelogid } from "./generatelogid.js";
import { getbdstokenanduser } from "./init.js";
import { objtostrcookie } from "./objtostrcookie.js";
export interface PANENV {
    logid: string;
    bdstoken: string;
    // user: string;
    cookie: string;
}
let cacheenv: Promise<PANENV> | undefined;
let resolve: {
    (arg0: PANENV): void;
    (value?: PANENV | PromiseLike<PANENV> | undefined): void;
} = (result: any) => {};
let rejecet: (reason: any) => void = (reason: any) => {};
export async function initPANENV(): Promise<PANENV> {
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
        const panenv: PANENV = {
            logid: generatelogid(),
            bdstoken: bdstoken,
            // user: user,
            cookie: coostr,
        };
        // cacheenv = panenv;
        console.log(panenv);
        resolve(panenv);
        return panenv;
    } catch (error) {
        rejecet(error);
        return Promise.reject(error);
    }

    // return cacheenv;
}
/*  UnhandledPromiseRejectionWarning: SyntaxError: C:\Users\ma\baidupan\userdata\cookies.json: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at D:\Documents\GitHub\fetch-baidu-pan-files\node_modules\jsonfile\index.js:33:18
    at D:\Documents\GitHub\fetch-baidu-pan-files\node_modules\graceful-fs\graceful-fs.js:123:16
    at FSReqCallback.readFileAfterClose [as oncomplete] (internal/fs/read_file_context.js:63:3) */
