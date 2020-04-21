import process from "process";
import { deletefiles } from "./fetch-delete-files.js";
import { listonedir } from "./fetchlistdir.js";
process.on("unhandledRejection", err => {
    throw err;
});
export { listonedir, deletefiles };
