import os from "os";
import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const datadirname = path.join(os.homedir(), "baidupan", "./userdata");
const txtfile = path.resolve(datadirname, "./cookies.txt");
const jsonfile = path.resolve(datadirname, "./cookies.json");
export { jsonfile, txtfile };
