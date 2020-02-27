import currentlimiter from "@masx200/async-task-current-limiter";
import fetch from "node-fetch";
const fetchlimiter = currentlimiter(17);
export const limitedfetch = fetchlimiter.asyncwrap(fetch);
