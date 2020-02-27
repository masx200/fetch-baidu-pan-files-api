import { gethomehtmlandupdatecookie } from "../lib/gethomehtmlandupdatecookie.js";
const htmldata = gethomehtmlandupdatecookie();
htmldata.then(html => console.log(html.slice(0, 100000)));
