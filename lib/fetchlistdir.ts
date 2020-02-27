// import fetch from "node-fetch";
import { limitedfetch as fetch } from "./limitfetch.js";
import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";
import { initPANENV } from "./index.js";
const listurl = `https://pan.baidu.com/api/list`;
// export let coostr: string | undefined;
const numlimit = 1000;
export async function listonedir(
    dir: string
    // bdstoken: string,
    // logid: string
): Promise<Array<PANFILE | PANDIR>> {
    let page = 1;
    const alldata: (PANFILE | PANDIR)[] = [];
    while (true) {
        const datalist: (PANFILE | PANDIR)[] = await listdirpage(dir, page);

        alldata.push(...datalist);
        if (datalist.length < numlimit) {
            break;
        }
        page++;
    }
    return alldata;
}
function gettimestamp() {
    return String(new Date().getTime());
}
/* 需要拆分1000个最多每次 */
async function listdirpage(
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
        num: "1000",
        channel: "chunlei",
        app_id: "250528",
        bdstoken: panenv.bdstoken,
        logid: panenv.logid,
        clienttype: "0",
        startLogTime: gettimestamp()
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
        cookie: panenv.cookie
    };
    const listapi = new URL(listurl);
    listapi.search = String(new URLSearchParams(params));
    const urlhref = String(listapi);
    try {
        const req = await fetch(urlhref, {
            headers: headers,

            body: undefined,
            method: "GET"
        });
        if (req.ok) {
            const data = await req.json();
            const errno = data?.errno;
            const listdata = data?.list;
            if (
                typeof errno === "number" &&
                errno === 0 &&
                Array.isArray(listdata)
            ) {
                return listdata;
            } else {
                throw Error(
                    "data error " + " " + urlhref + JSON.stringify(data)
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
        console.error("获取文件列表错误,5秒后重试." + dir);
        console.error(e);
        await new Promise(r => {
            setTimeout(r, 5000);
        });
        return listdirpage(dir, page /* , bdstoken, logid */);
    }
}

// /* GET /api/list?order=time&desc=1&showempty=0&web=1&page=1&dir=%2F&t=0.5937695130287173&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjUyMDA2MTIyNzAuOTI0Mjc0NDIyOTg2MzAyMg==&clienttype=0&startLogTime=1582520061227 HTTP/1.1
// Host: pan.baidu.com
// Connection: keep-alive
// accept: application/json, text/javascript, */*; q=0.01
// x-requested-with: XMLHttpRequest
// accept-language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://pan.baidu.com/disk/home?
// Accept-Encoding: gzip, deflate, br
// Cookie: BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582435770,1582439059,1582458059,1582507482; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582519632; PANPSC=6954538119870771888%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4BkARd%2BGmRi%2FKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG
//  */
// category: 6
// fs_id: 457850713458220
// isdir: 0
// local_ctime: 0
// local_mtime: 0
// md5: "8c65e1da8n09268f98bfec59e157a067"
// oper_id: 0
// path: "/密码破解RAR-Password-Recovery含注册码.zip"
// server_ctime: 1582448700
// server_filename: "密码破解RAR-Password-Recovery含注册码.zip"
// server_mtime: 1582448700
// share: 0
// size: 4411681
// unlist: 0
//
// category: 6
// dir_empty: 0
// empty: 0
// fs_id: 268065844320272
// isdir: 1
// local_ctime: 1582359185
// local_mtime: 1582359185
// oper_id: 0
// path: "/我的安卓应用"
// server_ctime: 1582359185
// server_filename: "我的安卓应用"
// server_mtime: 1582359185
// share: 0
// size: 0
// unlist: 0
// https://github.com/iikira/BaiduPCS-Go/blob/master/docs/file_data_apis_list.md
// /* // {"errno":0,"guid_info":"","list":[{"server_filename":"\u6211\u7684\u5b89\u5353\u5e94\u7528",
// "category":6,"unlist":0,"isdir":1,"dir_empty":0,"oper_id":0,"server_ctime":1582359185,
// "local_mtime":1582359185,"size":0,"share":0,"server_mtime":1582359185,"path":"\/
// \u6211\u7684\u5b89\u5353\u5e94\u7528","local_ctime":1582359185,"empty":0,"fs_id":268065844320272},
// {"server_filename":"PanDownload","category":6,"unlist":0,"isdir":1,"dir_empty":1,
// "oper_id":1157661021,"server_ctime":1582353469,"local_mtime":1582353468,"size":0,"share":0,
// "server_mtime":1582353469,"path":"\/PanDownload","local_ctime":1582353468,"empty":0,
// "fs_id":154839466487292},{"server_filename":"\u6211\u7684\u56fe\u7247","category":6,"unlist":0,

// "isdir":1,"dir_empty":1,"oper_id":0,"server_ctime":1582252484,"local_mtime":1582252484,"size":0,
// "share":0,"server_mtime":1582252484,"path":"\/\u6211\u7684\u56fe\u7247","local_ctime":1582252484,
// "empty":0,"fs_id":769245128764691},{"server_filename":"\u6211\u7684\u8d44\u6e90","category":6,
// "unlist":0,"isdir":1,"dir_empty":1,"oper_id":0,"server_ctime":1582087140,"local_mtime":1582087140,
// "size":0,"share":0,"server_mtime":1582087140,"path":"\/\u6211\u7684\u8d44\u6e90",
// "local_ctime":1582087140,"empty":0,"fs_id":130798388676430},
// fetch(
//     "https://pan.baidu.com/api/list?dir=%2F&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjUwODQ1NTk5MzAuOTUyNTQxODE2MTU2MjE1NA==&num=100&order=time&desc=1&clienttype=0&showempty=0&web=1&page=1&channel=chunlei&web=1&app_id=250528",
//     {
//         headers: {
//             accept: "*/*",
//             "accept-language":
//                 "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             cookie:
//                 "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582435770,1582439059,1582458059,1582507482; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582507482; PANPSC=15151495637702843426%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl43nyaTe1ucW7KGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//         },
//         referrer: "https://pan.baidu.com/disk/home?",
//         referrerPolicy: "no-referrer-when-downgrade",
//         body: null,
//         method: "GET",
//         mode: "cors"
//     }
// );
// fetch(
//     "https://pan.baidu.com/api/list?order=time&desc=1&showempty=0&web=1&page=1&num=100&dir=%2F%E6%88%91%E7%9A%84%E5%AE%89%E5%8D%93%E5%BA%94%E7%94%A8%2Fapps&t=0.6913972743505943&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjUwNzUxMzI5MTAuOTA2MDQyODMxOTE4MTkxOQ==&clienttype=0&startLogTime=1582507513291",
//     {
//         headers: {
//             accept: "application/json, text/javascript, */*; q=0.01",
//             "accept-language":
//                 "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "x-requested-with": "XMLHttpRequest",
//             cookie:
//                 "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582435770,1582439059,1582458059,1582507482; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582507482; PANPSC=17104741590485773119%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4V4y6jLL5Rb3KGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//         },
//         referrer: "https://pan.baidu.com/disk/home?",
//         referrerPolicy: "no-referrer-when-downgrade",
//         body: null,
//         method: "GET",
//         mode: "cors"
//     }
// );
// /* GET /api/list?dir=%2F&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjUxNTU0OTg3MjAuNzA5NzgyMTkyMDQzODMxNA==&num=100&order=time&desc=1&clienttype=0&showempty=0&web=1&page=1&channel=chunlei&web=1&app_id=250528 HTTP/1.1
// Host: pan.baidu.com
// Connection: keep-alive
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.17 Safari/537.36 Edg/81.0.416.12
// Accept: */*
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://pan.baidu.com/disk/home?
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
// Cookie: BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582435770,1582439059,1582458059,1582507482; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582508457; PANPSC=17979515407805339668%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4ehK7255rgBXKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG
//  */
