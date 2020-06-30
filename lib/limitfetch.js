import currentlimiter from "@masx200/async-task-current-limiter";
import https from "https";
import fetch from "node-fetch";
const fetchlimiter = currentlimiter(15);
const agent = new https.Agent({
    keepAlive: true,
});
https.globalAgent = agent;
const limitedfetch = fetchlimiter.asyncwrap(function (url, opt) {
    opt = Object.assign(
        { agent: url.startsWith("https:") ? agent : undefined },
        opt
    );
    return fetch(url, opt);
});
export { limitedfetch as fetch };
