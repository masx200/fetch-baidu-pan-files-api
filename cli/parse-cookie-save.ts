import cookie from "cookie";
import fsextra from "fs-extra";

import { jsonfile } from "../lib/files.js";

export const parsecookiesave = async (cookiestr: string) => {
    // const buf = await fsextra.readFile();
    // const cookiestr = buf.toString();
    console.log(cookiestr);
    const parsedobj = cookie.parse(cookiestr, {});
    console.log(parsedobj);
    await fsextra.writeJSON(jsonfile, parsedobj, { spaces: 4 });
};
