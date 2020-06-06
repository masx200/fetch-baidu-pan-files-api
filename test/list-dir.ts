import { listonedir } from "../lib/fetchlistdir.js";
const dirdata = listonedir("/");
// listonedir(
//     `/!我的图片-20190604/微博美图合集-20191229/半次元cosplay频道/微博配图`
// ).then(console.log);
dirdata.then(console.log);
listonedir(`/我的图片`).then(console.log);
process.on("unhandledRejection", (err) => {
    throw err;
});
