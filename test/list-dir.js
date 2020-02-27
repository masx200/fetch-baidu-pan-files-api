import { listonedir } from "../lib/fetchlistdir.js";
const dirdata = listonedir("/");
dirdata.then(console.log);
