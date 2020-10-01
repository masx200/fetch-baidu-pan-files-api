#!/usr/bin/env node
import path from "path";
import fsextra from "fs-extra";
import process from "process";
import { jsonfile } from "../lib/files.js";
import { parsecookiesave } from "./parse-cookie-save.js";
import parse from '@masx200/mini-cli-args-parser'

const opts = parse(process.argv.slice(2))
const cookiestr = opts['cookie']
process.on("unhandledRejection", (err) => {
    throw err;
});

(async () => {
    console.log(cookiestr);
    if (cookiestr) {
        await fsextra.ensureDir(path.dirname(jsonfile));
        // await fsextra.writeFile(, cookiestr);
        await parsecookiesave(cookiestr);
        console.log("cookie 保存成功");
    } else {
        throw new TypeError("invalid cookie");
    }

})();
