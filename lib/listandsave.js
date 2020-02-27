import { listonedir } from "./fetchlistdir.js";
import savetodb from "./savetodb.js";
export async function listandsave(dir) {
    {
        const fileslist = await listonedir(dir);
        console.log(" successfully fetch file list ", dir);
        const savepro = savetodb(fileslist, dir).then(() => {
            console.log(" successfully save data to db ", dir);
        });
        const dirslist = fileslist
            .filter(fileobj => {
            return fileobj.isdir;
        })
            .map(obj => {
            return obj.path;
        });
        const nextpros = dirslist.map(async (dir) => {
            await listandsave(dir);
        });
        await savepro;
        await Promise.all(nextpros);
    }
}
