import cookie from "cookie";
import fsextra from "fs-extra";
import { jsonfile } from "../lib/files.js";
export const parsecookiesave = async (cookiestr) => {
    console.log(cookiestr);
    const parsedobj = cookie.parse(cookiestr, {});
    console.log(parsedobj);
    await fsextra.writeJSON(jsonfile, parsedobj, { spaces: 4 });
};
