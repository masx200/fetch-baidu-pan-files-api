import currentlimiter from "@masx200/async-task-current-limiter";
import https from "https";
import fetch from "node-fetch";
const fetchlimiter = currentlimiter(15);
const agent = new https.Agent({
    keepAlive: true,
});
https.globalAgent = agent;



const customfetch=function (
    url: string,
    opt: RequestInit
): Promise<Response> {
    // @ts-ignore
    opt = Object.assign(
        { agent: url.startsWith("https:") ? agent : undefined },
        opt
    );


onrequest(url,opt)
    // const req = new fetch.Request(url, opt);
    //@ts-ignore
    return fetch(url, opt) as Response;
}


const limitedfetch = fetchlimiter.asyncwrap(customfetch);
export { limitedfetch as fetch };
function onrequest(url,opt){

console.log("request",url)
}
