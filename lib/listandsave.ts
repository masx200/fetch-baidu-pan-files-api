import { listonedir } from "./fetchlistdir.js";
import savetodb from "./savetodb.js";

export async function listandsave(
    dir: string
    /*  bdstoken: string,
    logid: string */
) {
    {
        const fileslist = await listonedir(dir /* , bdstoken, logid */);
        console.log(" successfully fetch file list ", dir /* , fileslist */);
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
        const nextpros = dirslist.map(async dir => {
            await listandsave(dir /* , bdstoken, logid */);
        });
        // 放防止内存溢出,先保存到数据库
        await savepro;
        await Promise.all(nextpros);
        // await Promise.all([savepro, ...nextpros]);
    }

    /* 递归查找子文件夹下的文件 */
}
