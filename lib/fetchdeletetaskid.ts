import { fatalerrorcheck } from "./fatalerrorcheck.js";
import { operationurl } from "./fetch-delete-files.js";
import { fetchresjson } from "./limitfetch.js";
import { initPANENV } from "./PANENV.js";
import { response_error_handler } from "./response-error-handler.js";
export async function fetchdeletetaskid(
    filestoremove: string[]
): Promise<number | undefined> {
    if (!filestoremove.length) {
        return;
    }
    const panenv = await initPANENV();
    const params = {
        async: "2",
        opera: "delete",
        // async: "1",
        onnest: "fail",
        channel: "chunlei",
        web: "1",
        app_id: "250528",
        // bdstoken: panenv.bdstoken,
        "dp-logid": panenv.logid,
        clienttype: "0",
    };
    try {
        const listapi = new URL(operationurl);
        listapi.search = String(new URLSearchParams(params));
        const urlhref = String(listapi);
        const body =
            "filelist=" + encodeURIComponent(JSON.stringify(filestoremove));
        const headers = {
            Host: "pan.baidu.com",
            Connection: "keep-alive",

            Accept: "application/json, text/javascript, */*; q=0.01",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.26 Safari/537.36 Edg/81.0.416.16`,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: "https://pan.baidu.com",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            Referer: " https://pan.baidu.com/disk/home?",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language":
                "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            Cookie: panenv.cookie,
        };
        const data = await fetchresjson(urlhref, {
            method: "POST",
            body,
            headers,
        });
        fatalerrorcheck(data);
        // if (req.ok) {
        // const data: any = await req.json();
        const taskid = data?.taskid;
        const info = data?.info;
        if (data?.errno === 0 && typeof taskid === "number") {
            return taskid;
        } else if (data?.errno === 12 && Array.isArray(info)) {
            const restfilestodel = new Set(filestoremove);

            for (let file of info) {
                let filepath = file?.path;
                let errno = file?.errno;
                if (errno === -9) {
                    // 文件不存在的
                    restfilestodel.delete(filepath);
                }
            }
            const filelist = Array.from(restfilestodel);
            if (!filelist.length) {
                return;
            }
            return fetchdeletetaskid(filelist);
        } else {
            response_error_handler(data, urlhref);
            return 0;
            /* const errno = data.errno;
                assert(typeof errno === "number");
console.error("response body error",data)
                throw Error(
                    "data error \n" +
                        urlhref +
                        " \n" +
                        errno +" "+
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
        console.error("删除文件错误,5秒后重试.");
        console.error(e);
        await new Promise((r) => {
            setTimeout(r, 5000);
        });
        return fetchdeletetaskid(filestoremove);
    }
}
