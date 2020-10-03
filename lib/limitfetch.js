import currentlimiter from "@masx200/async-task-current-limiter";
import https from "https";
import fetch from "node-fetch";
import assert from "assert";
const fetchlimiter = currentlimiter(15);
const agent = new https.Agent({
    keepAlive: true,
});
https.globalAgent = agent;
const customfetch = function (url, opt = {}) {
    opt = Object.assign({ agent: url.startsWith("https:") ? agent : undefined }, opt);
    onrequest(url, opt);
    return fetch(url, opt);
};
const limitedfetch = fetchlimiter.asyncwrap(customfetch);
export { limitedfetch as fetch };
function onrequest(url, opt = {}) {
    const { method = "GET", body } = opt;
    console.log("request", method, url, body);
}
export async function fetchresjson(url, opt = {}) {
    const method = opt.method || "GET";
    const response = await limitedfetch(url, opt);
    if (!response.ok) {
        throw Error("fetch failed \n" +
            " " +
            method +
            " " +
            url +
            " \n" +
            response.status +
            " " +
            response.statusText);
    }
    const resbody = await response.json();
    onresponse(resbody);
    return resbody;
}
function onresponse(data) {
    assert(data && typeof data === "object");
    const errno = data?.errno;
    if (errno !== 0) {
        console.error("response data error", data);
    }
}
