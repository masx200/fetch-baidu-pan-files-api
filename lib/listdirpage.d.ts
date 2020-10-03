import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";
export declare function listdirpage(dir: string, page: number): Promise<Array<PANFILE | PANDIR>>;
