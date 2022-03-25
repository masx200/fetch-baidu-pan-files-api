// #!/usr/bin/env node
import path from "path";
import fsextra from "fs-extra";
import process from "process";
import { /* bdstokenfile, */ jsonfile } from "../lib/files";
import { parsecookiesave } from "./parse-cookie-save";
import parse from "@masx200/mini-cli-args-parser";
import { gethomehtmlandupdatecookie } from "../lib/gethomehtmlandupdatecookie";
console.log(process.argv.slice(2));
const opts = parse(process.argv.slice(2));
const cookiestr = opts["cookie"];
// const bdstoken = opts["bdstoken"];
process.on("unhandledRejection", (err) => {
    throw err;
});
console.log(opts);
console.log("usage:");
console.log(
    'npx @masx200/fetch-baidu-pan-files-api "--cookie=BAIDUID=xxx; pan_login_way=xxx; PANWEB=xxx; BIDUPSID=xxx; PSTM=xxx; cflag=xxx; BDCLND=xxx; BDUSS=xxx; STOKEN=xxx; SCRC=xxx; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=xxx; PANPSC=xxx"'
);
~(async () => {
    console.log(cookiestr);
    if (cookiestr) {
        await fsextra.ensureDir(path.dirname(jsonfile));

        await parsecookiesave(cookiestr);
        console.log("cookie 保存成功");
    } else {
        throw new TypeError("invalid cookie");
    }
    await gethomehtmlandupdatecookie();
    // console.log(bdstoken);
    // if (bdstoken) {
    //     await fsextra.ensureDir(path.dirname(bdstokenfile));
    //     await fsextra.writeFile(bdstokenfile, bdstoken);

    //     console.log("bdstoken 保存成功");
    // } else {
    //     throw new TypeError("invalid bdstoken");
    // }
})();
