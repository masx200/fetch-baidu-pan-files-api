import cookie from "cookie";
import fsextra from "fs-extra";
import { jsonfile } from "./files.js";
export async function savecookies(setcookie) {
    const cooobj = {};
    setcookie
        .split(",")
        .map(s => s.split(";"))
        .flat()
        .forEach(coo => Object.assign(cooobj, cookie.parse(coo)));
    const panobj = await fsextra.readJSON(jsonfile);
    const outputcoo = { ...panobj, ...cooobj };
    Reflect.deleteProperty(outputcoo, "expires");
    console.log(outputcoo);
    await fsextra.writeJSON(jsonfile, outputcoo, { spaces: 4 });
}
