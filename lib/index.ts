import process from "process";
import { generatelogid } from "./generatelogid.js";
import { deletefiles } from "./fetch-delete-files.js";
import { listonedir } from "./fetchlistdir.js";

process.on("unhandledRejection", err => {
    throw err;
});
export const PANENV: {
    logid: string;
    bdstoken: string | undefined;
    user: string | undefined;
    cookie: string | undefined;
} = {
    logid: generatelogid(),
    bdstoken: undefined,
    user: undefined,
    cookie: undefined
};
export { listonedir, deletefiles };
