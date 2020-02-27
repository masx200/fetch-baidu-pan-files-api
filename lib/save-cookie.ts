import fsextra from "fs-extra";
import process from "process";
import { txtfile } from "./files.js";
const cookiestr = process.argv[2];
process.on("unhandledRejection", err => {
    throw err;
});

(async () => {
    console.log(cookiestr);
    if (cookiestr) {
        await fsextra.writeFile(txtfile, cookiestr);
    } else {
        throw new TypeError("invalid cookie");
    }
})();
