import currentlimiter from "@masx200/async-task-current-limiter";
import https from "https";
import fetch from "node-fetch";
const fetchlimiter = currentlimiter(17);
const limitedfetch = fetchlimiter.asyncwrap(function (url, opt) {
    const agent = new https.Agent({
        keepAlive: true,
    });
    return fetch.default(url, {
        agent: url.startsWith("http:") ? undefined : agent,
        ...opt,
    });
});
export { limitedfetch as fetch };
