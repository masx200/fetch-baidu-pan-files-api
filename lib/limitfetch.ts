import currentlimiter from "@masx200/async-task-current-limiter";
import fetch from "node-fetch";
const fetchlimiter = currentlimiter(17);
// const listener = (data: any) => console.log(JSON.stringify(data));
import https from "https";
// fetchlimiter.target.on("free", listener);

// fetchlimiter.target.on("full", listener);
export const limitedfetch = fetchlimiter.asyncwrap(function(url, opt) {
    const agent = new https.Agent({
        keepAlive: true
    });
    // @ts-ignore
    return fetch.default(url, {
        agent: url.startsWith("http:") ? undefined : agent,
        ...opt
    });
});
