import { posix } from "path";
import { taskquerydeletepoll } from "./fetch-task-query-delete.js";
import { listonedir } from "./fetchlistdir.js";
import { fetchdeletetaskid } from "./fetchdeletetaskid.js";
const listlimit = 200;
const splitlimit = 1600;
export async function deletefiles(rawfiles) {
    if (!rawfiles.length) {
        return;
    }
    if (rawfiles.length > splitlimit) {
        const sliced = slicearray(rawfiles, splitlimit);
        for (let filelist of sliced) {
            await deletefiles(filelist);
        }
    }
    const filestoremove = await excludenotexistfiles(rawfiles);
    console.log("需要删除的文件", filestoremove);
    if (filestoremove.length) {
        await slicedelete(filestoremove);
    } else {
        console.log("没有需要删除的文件");
    }
}
export const operationurl = `https://pan.baidu.com/api/filemanager`;
function slicearray(data, count) {
    var result = [];
    for (var i = 0; i < data.length; i += count) {
        result.push(data.slice(i, i + count));
    }
    return result;
}
async function excludenotexistfiles(rawfiles) {
    const filedirs = Array.from(new Set(rawfiles.map((f) => posix.dirname(f))));
    console.log("获取文件信息", filedirs);
    const filepool = (
        await Promise.all(
            filedirs.map(async (f) => {
                return (await listonedir(f))
                    .filter((o) => !o.isdir)
                    .map((o) => o.path);
            })
        )
    ).flat();
    const filestoremove = rawfiles.filter((f) => {
        return filepool.includes(f);
    });
    return filestoremove;
}
async function slicedelete(filestoremove) {
    if (!filestoremove.length) {
        return;
    }
    const sliced = slicearray(filestoremove, listlimit);
    for (let filelist of sliced) {
        await deletetaskquerypoll(filelist);
    }
}
async function deletetaskquerypoll(filelist) {
    const taskid = await fetchdeletetaskid(filelist);
    if (!taskid) {
        return;
    }
    console.log("获取到删除的任务id", taskid);
    await taskquerydeletepoll(taskid);
    console.log("删除文件成功", filelist);
}
