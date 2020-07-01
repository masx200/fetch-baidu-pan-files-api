#!/usr/bin/env node
import path from "path";
import fsextra from "fs-extra";
import process from "process";
import { txtfile } from "../lib/files.js";
import { parsecookiesave } from "./parse-cookie-save.js";
const cookiestr = process.argv[2];
process.on("unhandledRejection", (err) => {
    throw err;
});
(async () => {
    console.log(cookiestr);
    if (cookiestr) {
        await fsextra.ensureDir(path.dirname(txtfile));
        await fsextra.writeFile(txtfile, cookiestr);
        await parsecookiesave();
        console.log("cookie 保存成功");
    } else {
        throw new TypeError("invalid cookie");
    }
})();
