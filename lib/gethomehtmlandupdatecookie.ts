import fsextra from "fs-extra";
import { jsonfile } from "./files.js";
import { limitedfetch as fetch } from "./limitfetch.js";
import { homeurl } from "./init.js";
import { objtostrcookie } from "./objtostrcookie.js";
import { savecookies } from "./savecookies.js";
export async function gethomehtmlandupdatecookie(): Promise<string> {
    if (!fsextra.existsSync(jsonfile)) {
        throw Error("没有找到cookie文件,请先登陆网盘,并保存 cookie");
    }
    const panobj = await fsextra.readJSON(jsonfile);
    const coostr = objtostrcookie(panobj);
    const req = await fetch(homeurl, {
        headers: {
            "Accept-Encoding": ` gzip, deflate, br`,
            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12`,
            Connection: `keep-alive`,
            Host: `pan.baidu.com`,
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language":
                "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "cache-control": "max-age=0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            cookie: coostr,
            Referer: "https://pan.baidu.com/disk/home?"
        },
        body: undefined,
        method: "GET"
    });
    if (req.ok) {
        // console.log(req.headers);
        const setcookie = req.headers.get("set-cookie");
        if (setcookie) {
            // console.log(setcookie);
            await savecookies(setcookie);
        }
        return req.text();
    } else {
        throw Error(
            "fetch failed " + req.status + " " + req.statusText + " " + homeurl
        );
    }
}
