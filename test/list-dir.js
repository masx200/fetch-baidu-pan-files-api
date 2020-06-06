import { listonedir } from "../lib/fetchlistdir.js";
const dirdata = listonedir("/");
dirdata.then(console.log);
listonedir(`/我的图片`).then(console.log);
process.on("unhandledRejection", (err) => {
    throw err;
});
