#!/usr/bin/env node
import fsextra from "fs-extra";
import process from "process";
import { txtfile } from "./files.js";
import { parsecookie } from "./parse-cookie.js";
const cookiestr = process.argv[2];
process.on("unhandledRejection", err => {
    throw err;
});

(async () => {
    console.log(cookiestr);
    if (cookiestr) {
        await fsextra.writeFile(txtfile, cookiestr);
        await parsecookie();
    } else {
        throw new TypeError("invalid cookie");
    }
})();
