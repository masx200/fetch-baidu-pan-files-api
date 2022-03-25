import { fatalerrorcheck } from "./fatalerrorcheck.js";
import { listurl, numlimit } from "./fetchlistdir.js";
import { fetchresjson } from "./limitfetch.js";
import { initPANENV } from "./PANENV.js";
import { response_error_handler } from "./response-error-handler.js";
import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";
/*function gettimestamp() {
    return String(new Date().getTime());
}*/
/* 需要拆分1000个最多每次 */
export async function listdirpage(
    dir: string,
    page: number
    // bdstoken: string,
    // logid: string
): Promise<Array<PANFILE | PANDIR>> {
    const panenv = await initPANENV();
    const params = {
        order: "time",
        desc: "1",
        showempty: "0",
        web: "1",
        page: String(page),
        dir: dir,
        num: String(numlimit),
        channel: "chunlei",
        app_id: "250528",
        // bdstoken: panenv.bdstoken,
        "dp-logid": panenv.logid,
        clienttype: "0",
    };
    const headers = {
        "Accept-Encoding": "gzip, deflate, br",
        Referer: `https://pan.baidu.com/disk/home?`,
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12",
        Connection: "keep-alive",
        Host: "pan.baidu.com",
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie: panenv.cookie,
    };
    const listapi = new URL(listurl);
    listapi.search = String(new URLSearchParams(params));
    const urlhref = String(listapi);
    try {
        const data = await fetchresjson(urlhref, {
            headers: headers,

            body: undefined,
            method: "GET",
        });
        fatalerrorcheck(data);
        // if (req.ok) {
        //     const data: any = await req.json();
        const errno = data?.errno;
        const listdata = data?.list;
        /* 如果目录不存在则返回空数组 */
        if (errno === -9) {
            //  "-9": "文件被所有者删除，操作失败",
            return [];
        }
        if (
            typeof errno === "number" &&
            errno === 0 &&
            Array.isArray(listdata)
        ) {
            return listdata;
        } else {
            response_error_handler(data, urlhref);
            return [];
            /*   const errno = data.errno;
                assert(typeof errno === "number");

                throw Error(
                    "data error \n" +
                        urlhref +
                        " \n" +
                        errno +
                        Reflect.get(错误码表, errno)
                );*/
        }
        // } else {
        //     throw Error(
        //         "fetch failed :" +
        //             urlhref +
        //             " " +
        //             req.status +
        //             " " +
        //             req.statusText
        //     );
        // }
    } catch (e) {
        console.error("获取文件列表错误,5秒后重试." + dir);
        console.error(e);
        await new Promise((r) => {
            setTimeout(r, 5000);
        });
        return listdirpage(dir, page /* , bdstoken, logid */);
    }
}
