import { gethomehtmlandupdatecookie } from "../lib/gethomehtmlandupdatecookie.js";
const htmldata = gethomehtmlandupdatecookie();
htmldata.then((html) => console.log(html.slice(0, 10000)));
process.on("unhandledRejection", (err) => {
    throw err;
});
