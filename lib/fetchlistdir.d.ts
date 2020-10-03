import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";
export declare const listurl = "https://pan.baidu.com/api/list";
export declare const numlimit = 1000;
export declare function listonedir(dir: string): Promise<Array<PANFILE | PANDIR>>;
