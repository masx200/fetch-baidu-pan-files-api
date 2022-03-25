import { gethomehtmlandupdatecookie } from "../lib/gethomehtmlandupdatecookie";
const htmldata = gethomehtmlandupdatecookie();
htmldata.then((html) => console.log(html.slice(0, 1000)));
process.on("unhandledRejection", (err) => {
    throw err;
});
