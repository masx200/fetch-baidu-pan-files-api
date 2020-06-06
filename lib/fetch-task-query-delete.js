import fetch from "node-fetch";
import { initPANENV } from "./PANENV.js";
import assert from "assert";
import 错误码表 from "./errno";
const operationurl = `https://pan.baidu.com/share/taskquery`;
export async function taskquerydeletepoll(taskid, filelist) {
    while (true) {
        const [status, progress] = await taskquerydeleteonce(taskid, filelist);
        console.log("查询到任务状态成功", taskid, status, progress);
        if (status === "success") {
            return;
        } else {
            await new Promise((r) => {
                setTimeout(r, 5000);
            });
        }
    }
}
async function taskquerydeleteonce(taskid, filelist) {
    const panenv = await initPANENV();
    const params = {
        taskid: String(taskid),
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
        const body = "filelist=" + encodeURIComponent(JSON.stringify(filelist));
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
        const req = await fetch(urlhref, { method: "POST", body, headers });
        if (req.ok) {
            const data = await req.json();
            const status =
                data === null || data === void 0 ? void 0 : data.status;
            const progress =
                data === null || data === void 0 ? void 0 : data.progress;
            if (
                (data === null || data === void 0 ? void 0 : data.errno) ===
                    0 &&
                typeof status === "string"
            ) {
                return [status, progress];
            } else {
                const errno = data.errno;
                assert(typeof errno === "number");
                throw Error(
                    "data error " +
                        urlhref +
                        " \n" +
                        Reflect.get(错误码表, errno)
                );
            }
        } else {
            throw Error(
                "fetch failed :" +
                    urlhref +
                    " " +
                    req.status +
                    " " +
                    req.statusText
            );
        }
    } catch (e) {
        console.error("查询文件错误,5秒后重试.");
        console.error(e);
        await new Promise((r) => {
            setTimeout(r, 5000);
        });
        return taskquerydeleteonce(taskid, filelist);
    }
}
