import { gethomehtmlandupdatecookie } from "./gethomehtmlandupdatecookie.js";
export const homeurl = `https://pan.baidu.com/disk/home`;
export async function getbdstokenanduser() {
    const homehtml = await gethomehtmlandupdatecookie();
    return parsehtmlstoken(homehtml);
}
function parsehtmlstoken(html) {
    const reg = /"bdstoken":"(.+)","is_vip"/g;
    const RegExpExecArray = reg.exec(html);
    if (RegExpExecArray) {
        const [, bdstoken] = RegExpExecArray;
        return bdstoken;
    }
    throw Error("failed parse bdstoken :" + html);
}
