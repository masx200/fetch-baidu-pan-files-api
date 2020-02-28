import os from "os";
import path from "path";
const datadirname = path.join(os.homedir(), "baidupan", "./userdata");
const txtfile = path.resolve(datadirname, "./cookies.txt");
const jsonfile = path.resolve(datadirname, "./cookies.json");
export { jsonfile, txtfile };
