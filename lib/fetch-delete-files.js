export async function deletefiles(rawfiles) {
    const filestoremove = await excludenotexistfiles(rawfiles);
    console.log("需要删除的文件", filestoremove);
    if (filestoremove.length) {
        await slicedelete(filestoremove);
    }
    else {
        console.log("没有需要删除的文件");
    }
}
import { posix } from "path";
import { listonedir } from "./fetchlistdir.js";
import { limitedfetch as fetch } from "./limitfetch.js";
import { initPANENV } from "./index.js";
import { taskquerydeletepoll } from "./fetch-task-query-delete.js";
const operationurl = `https://pan.baidu.com/api/filemanager`;
function slicearray(data, count) {
    var result = [];
    for (var i = 0; i < data.length; i += count) {
        result.push(data.slice(i, i + count));
    }
    return result;
}
async function fetchdeletetaskid(filestoremove) {
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
        clienttype: "0"
    };
    try {
        const listapi = new URL(operationurl);
        listapi.search = String(new URLSearchParams(params));
        const urlhref = String(listapi);
        const body = "filelist=" + encodeURIComponent(JSON.stringify(filestoremove));
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
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            Cookie: panenv.cookie
        };
        const req = await fetch(urlhref, { method: "POST", body, headers });
        if (req.ok) {
            const data = await req.json();
            const taskid = data === null || data === void 0 ? void 0 : data.taskid;
            if ((data === null || data === void 0 ? void 0 : data.errno) === 0 && typeof taskid === "number") {
                return taskid;
            }
            else {
                throw Error("data error " + urlhref + " " + JSON.stringify(data));
            }
        }
        else {
            throw Error("fetch failed " +
                req.status +
                " " +
                req.statusText +
                " " +
                urlhref);
        }
    }
    catch (e) {
        console.error("删除文件错误,5秒后重试.");
        console.error(e);
        await new Promise(r => {
            setTimeout(r, 5000);
        });
        return fetchdeletetaskid(filestoremove);
    }
}
async function excludenotexistfiles(rawfiles) {
    const filedirs = Array.from(new Set(rawfiles.map(f => posix.dirname(f))));
    console.log("获取文件信息", filedirs);
    const filepool = (await Promise.all(filedirs.map(async (f) => {
        return (await listonedir(f))
            .filter(o => !o.isdir)
            .map(o => o.path);
    }))).flat();
    const filestoremove = rawfiles.filter(f => {
        return filepool.includes(f);
    });
    return filestoremove;
}
const listlimit = 500;
async function slicedelete(filestoremove) {
    const sliced = slicearray(filestoremove, listlimit);
    return await sliced.reduce(async (prev, filelist) => {
        await prev;
        const taskid = await fetchdeletetaskid(filelist);
        console.log("获取到删除的任务id", taskid);
        await taskquerydeletepoll(taskid, filelist);
        console.log("删除文件成功", filelist);
    }, Promise.resolve());
}
