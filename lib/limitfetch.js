import currentlimiter from "@masx200/async-task-current-limiter";
import https from "https";
import fetch from "node-fetch";
const fetchlimiter = currentlimiter(15);
const agent = new https.Agent({
    keepAlive: true,
});
https.globalAgent = agent;
const customfetch = function (url, opt) {
    opt = Object.assign(
        { agent: url.startsWith("https:") ? agent : undefined },
        opt
    );
    onrequest(url, opt);
    return fetch(url, opt);
};
const limitedfetch = fetchlimiter.asyncwrap(customfetch);
export { limitedfetch as fetch };
function onrequest(url, opt) {
    const { method = "GET", headers = {}, body } = opt;
    console.log("request", method, url, headers, body);
}
