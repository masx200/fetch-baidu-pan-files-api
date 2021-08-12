#!/usr/bin/env node
import o from "path";

import e from "fs-extra";

import r from "process";

import i from "os";

import s from "cookie";

import n from "@masx200/mini-cli-args-parser";

const a = o.join(i.homedir(), "baidupan", "./userdata"), t = o.resolve(a, "./bdstoken.txt"), l = o.resolve(a, "./cookies.json");

console.log(r.argv.slice(2));

const c = n(r.argv.slice(2)), m = c.cookie, p = c.bdstoken;

r.on("unhandledRejection", (o => {
    throw o;
})), console.log(c), (async () => {
    if (console.log(m), !m) throw new TypeError("invalid cookie");
    if (await e.ensureDir(o.dirname(l)), await (async o => {
        console.log(o);
        const r = s.parse(o, {});
        console.log(r), await e.writeJSON(l, r, {
            spaces: 4
        });
    })(m), console.log("cookie 保存成功"), console.log(p), !p) throw new TypeError("invalid bdstoken");
    await e.ensureDir(o.dirname(t)), await e.writeFile(t, p), console.log("bdstoken 保存成功");
})();
//# sourceMappingURL=save-cookie.js.map
