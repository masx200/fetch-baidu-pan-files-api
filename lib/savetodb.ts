import { posix } from "path";
import { panDircollect, panFilecollect } from "./collections.js";
import { PANDIR } from "./schemadir.js";
import { PANFILE } from "./schemafile.js";

const mapfileobjdir = (obj: PANFILE | PANDIR) => {
    return { ...obj, dir: posix.dirname(obj.path) };
};
export default async function(fileslist: Array<PANFILE | PANDIR>, dir: string) {
    const files = fileslist.filter(fileobj => !fileobj.isdir);
    const dirs = fileslist.filter(fileobj => fileobj.isdir === 1);
    const filetosave = files.map(mapfileobjdir);
    const dirtosave = dirs.map(mapfileobjdir);
    // const savepro1 = panFilecollect.updateMany(,files.map(mapfileobjdir),);
    // const savepro2 = panDircollect.updateMany(dirs.map(mapfileobjdir));
    // [options.upsert = false] «布尔»如果为true，并且找不到文档，请插入新文档
    //防止内存溢出   把map改为reduce
    const savefilepro = filetosave.reduce(async (prev, obj) => {
        await prev;
        return panFilecollect
            .updateMany({ path: obj.path }, obj, {
                upsert: true
            })
            .exec();
    }, Promise.resolve());
    const savedirpro = dirtosave.reduce(async (prev, obj) => {
        await prev;
        return panDircollect
            .updateMany({ path: obj.path }, obj, {
                upsert: true
            })
            .exec();
    }, Promise.resolve());
    /* const savedirpro = dirtosave.map(async obj => {
        return panDircollect
            .updateMany({ path: obj.path }, obj, {
                upsert: true
            })
            .exec();
    });*/
    await Promise.all([savefilepro, savedirpro]);
    /* 如果有已经保存过目录的信息,则设置finished 为true */
    // await panDircollect.updateMany({ path: dir }, { finished: true });
    // .find({ path: dir })
    // .update({})
    // .exec();
    // await Promise.all(
    //     fileslist.map(async (fileobj) => {
    //         if (fileobj.isdir) {
    //             await panDir.create(fileobj);
    //         } else {
    //             await panFile.create(fileobj);
    //         }
    //     })
    // );
}
