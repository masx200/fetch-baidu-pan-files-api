import process from "process";
import { deletefiles } from "./fetch-delete-files.js";
import { listonedir } from "./fetchlistdir.js";
import { PANFILE } from "./schemafile.js";
import { PANDIR } from "./schemadir.js";
export { PANDIR, PANFILE };
process.on("unhandledRejection", err => {
    throw err;
});
export { listonedir, deletefiles };
