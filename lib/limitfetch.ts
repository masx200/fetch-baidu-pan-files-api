import currentlimiter from "@masx200/async-task-current-limiter";
import fetch from "node-fetch";
const fetchlimiter = currentlimiter(17);
// const listener = (data: any) => console.log(JSON.stringify(data));

// fetchlimiter.target.on("free", listener);

// fetchlimiter.target.on("full", listener);
export const limitedfetch = fetchlimiter.asyncwrap(fetch);
