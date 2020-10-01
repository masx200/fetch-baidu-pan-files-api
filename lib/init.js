import fsextra from "fs-extra";
import { bdstokenfile } from "./files.js";
export async function getbdstoken() {
    return String(await fsextra.readFile(bdstokenfile));
}
export const homeurl = `https://pan.baidu.com/disk/home`;
