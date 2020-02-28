import fetch from "node-fetch";
// import { limitedfetch as fetch } from "./limitfetch.js";
import { initPANENV } from "./index.js";
const operationurl = `https://pan.baidu.com/share/taskquery`;
/* 轮询任务状态 */
export async function taskquerydeletepoll(
    taskid: number,
    filelist: string[]
): Promise<void> {
    while (true) {
        console.log("开始查询任务状态", taskid);
        const status = await taskquerydeleteonce(taskid, filelist);
        console.log("查询到任务状态成功", taskid, status);
        if (status === "success") {
            return;
        } else {
            await new Promise(r => {
                setTimeout(r, 5000);
            });
        }
    }
}
// type status = "running" | "success" | "pending";
async function taskquerydeleteonce(
    taskid: number,
    filelist: string[]
): Promise<string> {
    const panenv = await initPANENV();
    const params = {
        taskid: String(taskid),

        channel: "chunlei",
        web: "1",
        app_id: "250528",
        bdstoken: panenv.bdstoken,
        logid: panenv.logid,
        clienttype: "0"
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
            Cookie: panenv.cookie
        };
        const req = await fetch(urlhref, { method: "POST", body, headers });
        if (req.ok) {
            const data = await req.json();
            const status = data?.status;
            if (data?.errno === 0 && typeof status === "string") {
                return status;
            } else {
                throw Error(
                    "data error " + urlhref + " " + JSON.stringify(data)
                );
            }
        } else {
            throw Error(
                "fetch failed " +
                    req.status +
                    " " +
                    req.statusText +
                    " " +
                    urlhref
            );
        }
    } catch (e) {
        console.error("查询文件错误,5秒后重试.");
        console.error(e);
        await new Promise(r => {
            setTimeout(r, 5000);
        });
        return taskquerydeleteonce(taskid, filelist);
    }
}
// /* POST /share/taskquery?taskid=65546456840230&channel=chunlei&web=1&app_id=250528&bdstoken=603a14a94befd0d5b90cd1431d9c87ef&logid=MTU4MjgxMzI4Njg5ODAuOTcwOTU0MzU4NzY2MzM4Nw==&clienttype=0 HTTP/1.1
// Host: pan.baidu.com
// Connection: keep-alive
// Content-Length: 147
// Accept: application/json, text/javascript, */*; q=0.01
// Sec-Fetch-Dest: empty
// X-Requested-With: XMLHttpRequest
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36
// Content-Type: application/x-www-form-urlencoded; charset=UTF-8
// Origin: https://pan.baidu.com
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Referer: https://pan.baidu.com/disk/home?
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9
// Cookie: BAIDUID=5986DDBE5028B133EC9A8D8BE483EA83:FG=1; pan_login_way=1; PANWEB=1; BIDUPSID=5986DDBE5028B133EC9A8D8BE483EA83; PSTM=1577711388; cflag=13%3A3; BDCLND=4FLUxVCJ4YB0UHJXBEPk5%2FtPQ72egy%2Bx8Labn81I4cA%3D; BDUSS=2pXdnB5LTlqU21weTMxNVRpUnd5N3NPbFV0T2hWdG1PQzVxLXFLajlEV004bmxlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIxlUl6MZVJea; STOKEN=ac56ddf1a146efb3ae1be2043fd1c121cc67c041f11fb28f8f84586e650a6366; SCRC=539b1dfb67ef188b367eeb4401910f5f; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582727187,1582785732,1582798284,1582813243; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582813243; PANPSC=1696914687074727721%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4IYhv1go3v8%2FKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG
//  */

// query string

// taskid: 65546456840230
// channel: chunlei
// web: 1
// app_id: 250528
// bdstoken: 603a14a94befd0d5b90cd1431d9c87ef
// logid: MTU4MjgxMzI4Njg5ODAuOTcwOTU0MzU4NzY2MzM4Nw==
// clienttype: 0

//request body

// formdata
// filelist: ["/cameyo-app/360chrome-ram-mode-noneisolated.cameyo.exe","/cameyo-app/360chrome-disk-mode-noneisolated.cameyo.exe"]

// response body
// {"errno":0,"request_id":1343596840069063582,"task_errno":0,"status":"success","list":[{"path":"\/cameyo-app\/360chrome-ram-mode-noneisolated.cameyo.exe"},{"path":"\/cameyo-app\/360chrome-disk-mode-noneisolated.cameyo.exe"}],"total":2}
