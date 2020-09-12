import { operationurl } from "./fetch-delete-files.js";
import { fetchresjson } from "./limitfetch.js";
import { initPANENV } from "./PANENV.js";
import { response_error_handler } from "./response-error-handler.js";
export async function fetchdeletetaskid(filestoremove) {
    if (!filestoremove.length) {
        return;
    }
    const panenv = await initPANENV();
    const params = {
        async: "2",
        opera: "delete",
        onnest: "fail",
        channel: "chunlei",
        web: "1",
        app_id: "250528",
        bdstoken: panenv.bdstoken,
        logid: panenv.logid,
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
        const taskid = data === null || data === void 0 ? void 0 : data.taskid;
        const info = data === null || data === void 0 ? void 0 : data.info;
        if (
            (data === null || data === void 0 ? void 0 : data.errno) === 0 &&
            typeof taskid === "number"
        ) {
            return taskid;
        } else if (
            (data === null || data === void 0 ? void 0 : data.errno) === 12 &&
            Array.isArray(info)
        ) {
            const restfilestodel = new Set(filestoremove);
            for (let file of info) {
                let filepath =
                    file === null || file === void 0 ? void 0 : file.path;
                let errno =
                    file === null || file === void 0 ? void 0 : file.errno;
                if (errno === -9) {
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
        }
    } catch (e) {
        console.error("删除文件错误,5秒后重试.");
        console.error(e);
        await new Promise((r) => {
            setTimeout(r, 5000);
        });
        return fetchdeletetaskid(filestoremove);
    }
}