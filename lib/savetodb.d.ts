import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";
export default function (fileslist: Array<PANFILE | PANDIR>, dir: string): Promise<void>;
