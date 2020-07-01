import { listdirpage } from "./listdirpage.js";
export const listurl = `https://pan.baidu.com/api/list`;
export const numlimit = 1000;
export async function listonedir(dir) {
    let page = 1;
    const alldata = [];
    while (true) {
        const datalist = await listdirpage(dir, page);
        alldata.push(...datalist);
        if (datalist.length < numlimit) {
            break;
        }
        page++;
    }
    return alldata;
}
