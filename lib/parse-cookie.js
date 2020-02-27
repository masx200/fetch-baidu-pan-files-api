import cookie from "cookie";
import fsextra from "fs-extra";
import { jsonfile, txtfile } from "./files.js";
export const parsecookie = async () => {
    const buf = await fsextra.readFile(txtfile);
    const cookiestr = buf.toString();
    console.log(cookiestr);
    const parsedobj = cookie.parse(cookiestr, {});
    console.log(parsedobj);
    await fsextra.writeJSON(jsonfile, parsedobj, { spaces: 4 });
};
