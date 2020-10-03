#!/usr/bin/env node
import path from "path";
import fsextra from "fs-extra";
import process from "process";
import { bdstokenfile, jsonfile } from "../lib/files.js";
import { parsecookiesave } from "./parse-cookie-save.js";
import parse from "@masx200/mini-cli-args-parser";
console.log(process.argv.slice(2));
const opts = parse(process.argv.slice(2));
const cookiestr = opts["cookie"];
const bdstoken = opts["bdstoken"];
process.on("unhandledRejection", (err) => {
    throw err;
});
console.log(opts);
~(async () => {
    console.log(cookiestr);
    if (cookiestr) {
        await fsextra.ensureDir(path.dirname(jsonfile));
        await parsecookiesave(cookiestr);
        console.log("cookie 保存成功");
    } else {
        throw new TypeError("invalid cookie");
    }
    console.log(bdstoken);
    if (bdstoken) {
        await fsextra.ensureDir(path.dirname(bdstokenfile));
        await fsextra.writeFile(bdstokenfile, bdstoken);
        console.log("bdstoken 保存成功");
    } else {
        throw new TypeError("invalid bdstoken");
    }
})();
