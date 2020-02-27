import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonfile = path.resolve(__dirname, "../userdata", "./cookies.json");
export { jsonfile };
export const txtfile = path.resolve(__dirname, "../userdata", "./cookies.txt");
