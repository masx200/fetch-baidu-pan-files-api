import { operationurl } from "./fetch-task-query-delete.js";
import { fetchresjson } from "./limitfetch.js";
import { initPANENV } from "./PANENV.js";
import { response_error_handler } from "./response-error-handler.js";
/*

{"errno":0,"request_id":4219930869770444291,"task_errno":4,"status":"failed","list":[{"error_code":-7,"path":"\/apps\/baidu_shurufa\/\u6211\u7684\u56fe\u7247\/20140920221912_Ic6M8KOEXM.jpg"}]}

*/
// type status = "running" | "success" | "pending";

export async function taskquerydeleteonce(
    taskid: number
    // filelist: string[]
): Promise<{
    status: string;
    progress: any;
}> {
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
        // const body = "filelist=" + encodeURIComponent(JSON.stringify(filelist));
        //查询任务的状态不需要带上文件的路径
        // const body = "filelist=" + encodeURIComponent(JSON.stringify([]));
        /* 实测发现其实没有请求体都可以了,甚至使用get方法也可以了 */
        const body = undefined;
        /* 其实不带查询的文件路径也可以的 */
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
        // if (req.ok) {
        //     const data: any = await req.json();
        const status = data?.status;
        const progress = data?.progress;
        if (data?.errno === 0 && typeof status === "string") {
            return { status, progress };
        } else {
            response_error_handler(data, urlhref);
            //@ts-ignore
            return {};
            /* const errno = data.errno;
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
        console.error("查询文件错误,5秒后重试.");
        console.error(e);
        await new Promise((r) => {
            setTimeout(r, 5000);
        });
        return taskquerydeleteonce(taskid /*  filelist */);
    }
}
