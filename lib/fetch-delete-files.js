import { posix } from "path";
import { listonedir } from "./fetchlistdir.js";
import { limitedfetch as fetch } from "./limitfetch.js";
import { initPANENV } from "./index.js";
const operationurl = `https://pan.baidu.com/api/filemanager`;
function slicearray(data, count) {
    var result = [];
    for (var i = 0; i < data.length; i += count) {
        result.push(data.slice(i, i + count));
    }
    return result;
}
async function fetchdelete(filestoremove) {
    const panenv = await initPANENV();
    const params = {
        opera: "delete",
        async: "1",
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
            const info = data === null || data === void 0 ? void 0 : data.info;
            if (Array.isArray(info) && info.length) {
                return info;
            }
            else {
                throw Error("data error " + JSON.stringify(data));
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
        return fetchdelete(filestoremove);
    }
}
export async function deletefiles(rawfiles) {
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
    console.log("需要删除的文件", filestoremove);
    if (filestoremove.length) {
        await slicedelete(filestoremove);
    }
}
const listlimit = 200;
async function slicedelete(filestoremove) {
    let oprearesults;
    if (listlimit < filestoremove.length) {
        oprearesults = (await Promise.all(slicearray(filestoremove, listlimit).map(list => {
            return fetchdelete(list);
        }))).flat();
    }
    else {
        oprearesults = await fetchdelete(filestoremove);
    }
    console.log(oprearesults);
    const newfiles = oprearesults
        .filter(o => (o === null || o === void 0 ? void 0 : o.errno) === 111)
        .map(o => o === null || o === void 0 ? void 0 : o.path);
    if (newfiles.length) {
        console.log("删除失败的文件,10秒后再次尝试删除", newfiles);
        await new Promise(r => setTimeout(r, 10000));
        await deletefiles(newfiles);
    }
}
