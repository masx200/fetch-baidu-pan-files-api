#!/usr/bin/env node
import path from "path";
import fsextra from "fs-extra";
import process from "process";
import { txtfile } from "../lib/files.js";
import { parsecookie } from "../lib/parse-cookie.js";
const cookiestr = process.argv[2];
process.on("unhandledRejection", (err) => {
    throw err;
});

(async () => {
    console.log(cookiestr);
    if (cookiestr) {
        await fsextra.ensureDir(path.dirname(txtfile));
        await fsextra.writeFile(txtfile, cookiestr);
        await parsecookie();
    } else {
        throw new TypeError("invalid cookie");
    }
})();
