import os from "os";
import path from "path";
const datadirname = path.join(os.homedir(), "baidupan", "./userdata");
const bdstokenfile = path.resolve(datadirname, "./bdstoken.txt");
const jsonfile = path.resolve(datadirname, "./cookies.json");
export { jsonfile, bdstokenfile };
