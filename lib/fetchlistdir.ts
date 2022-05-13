// import fetch from "cross-fetch";
import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";
import { listdirpage } from "./listdirpage.js";
export const listurl = `https://pan.baidu.com/api/list`;
// export let coostr: string | undefined;
export const numlimit = 1000;

export async function listonedir(
    dir: string
    // bdstoken: string,
    // logid: string
): Promise<Array<PANFILE | PANDIR>> {
    let page = 1;
    const alldata: (PANFILE | PANDIR)[] = [];
    while (true) {
        const datalist: (PANFILE | PANDIR)[] = await listdirpage(dir, page);

        alldata.push(...datalist);
        if (datalist.length < numlimit) {
            break;
        }
        page++;
    }
    return alldata;
}
