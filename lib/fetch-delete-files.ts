import { posix } from "path";
import { taskquerydeletepoll } from "./fetch-task-query-delete.js";
import { listonedir } from "./fetchlistdir.js";
// import fetch from "node-fetch";
//一次删除操作的文件数量
import { fetchdeletetaskid } from "./fetchdeletetaskid.js";
//一次删除的文件太多会失败
const listlimit = 200;
const splitlimit = 2000;
export async function deletefiles(rawfiles: Array<string>): Promise<void> {
    if (!rawfiles.length) {
        return;
    }

    //文件太多就拆分
    if (rawfiles.length > splitlimit) {
        const sliced = slicearray(rawfiles, splitlimit);
        for (let filelist of sliced) {
            await deletefiles(filelist);
        }
    }
    /* 先获取文件列表 */
    const filestoremove = await excludenotexistfiles(rawfiles);
    console.log("需要删除的文件", filestoremove);
    /* 如果没有需要删除的文件,则不需要执行 */
    if (filestoremove.length) {
        await slicedelete(filestoremove);
    } else {
        console.log("没有需要删除的文件");
    }
}
export const operationurl = `https://pan.baidu.com/api/filemanager`;
/* 每次不能太多2000个1000个500个 */
function slicearray<T>(data: Array<T>, count: number): Array<T>[] {
    var result = [];
    for (var i = 0; i < data.length; i += count) {
        result.push(data.slice(i, i + count));
    }
    return result;
}
async function excludenotexistfiles(
    rawfiles: Array<string>
): Promise<Array<string>> {
    const filedirs = Array.from(new Set(rawfiles.map((f) => posix.dirname(f))));
    console.log("获取文件信息", filedirs);
    const filepool: string[] = (
        await Promise.all(
            filedirs.map(async (f) => {
                return (await listonedir(f))
                    .filter((o) => !o.isdir)
                    .map((o) => o.path);
            })
        )
    ).flat();

    /* 先把不存在的文件从删除列表中去除 */
    const filestoremove = rawfiles.filter((f) => {
        return filepool.includes(f);
    });

    return filestoremove;
}

async function slicedelete(filestoremove: string[]): Promise<void> {
    if (!filestoremove.length) {
        return;
    }

    const sliced = slicearray(filestoremove, listlimit);
    // return await sliced.reduce(async (prev, filelist) => {
    // await prev;
    for (let filelist of sliced) {
        await deletetaskquerypoll(filelist);
    }
    ///* const taskid = await fetchdeletetaskid(filelist);

    //   if (!taskid) {
    //      return;
    //   }
    //  console.log("获取到删除的任务id", taskid);
    //  await taskquerydeletepoll(taskid /*  filelist */);
    //   console.log("删除文件成功", filelist);*/

    // }, Promise.resolve());
}
async function deletetaskquerypoll(filelist: string[]) {
    const taskid = await fetchdeletetaskid(filelist);

    if (!taskid) {
        return;
    }
    console.log("获取到删除的任务id", taskid);
    await taskquerydeletepoll(taskid /*  filelist */);
    console.log("删除文件成功", filelist);
}
/* 12 部分文件已存在于目标文件夹中 */

/* {
  errno: 12,
  info: [
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/4898c885e112644d2274d5298b0ac269.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/202b188ce11041619835c64fcb032953.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月18日/Rainight魈雨/微博配图/微博配图/99ab34c8e11730409fd1385aeecf2655.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/ce28dcf6e11661650c9559511269c206.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/9d5d5667e116abba141ece5930b54363.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/2004ce03e114206003380de3bc5f9e99.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/6df5977ae11486e08df6e5083c8201df.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/0c86bec6e11b747d3b5abdb1feadba64.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/6bad4e82e11a0237604d0146f8bea0de.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/9fa36d05e11ff046786c40e24ab61687.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/503e0a12e11ded3374719fc9b6952964.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/1bb94bf4e1637482869e21b66a044e94.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/5aebf0ace16304da2c031db50660c5a4.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/3bb5394fe1638521fca7531d876cd741.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/1724dca4e163bfb400ba0d532bf6df66.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/6cc377f7e16251ff341f02b6d554a3e7.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/c1c9bd56e162ee7906518861065f60a9.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/bdfa97bce1615c663dfee56ac93571e9.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/262a59a2e1678d81ad45526da9e40dd8.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/a9e63b0ce166ab518a57c5ace9d3d317.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/6218399ce165c4d3e3389ce901d6155b.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/2f7073c2e1644e547d941122fcd2b107.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月18日/Rainight魈雨/微博配图/微博配图/74130a05e164481063455bcb92a717ab.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/b8ce0097e16aa584f730e4362f3b0c09.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/88ea8ca3e16939a41200647c4d5e9b58.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/05479ac5e16856c796424cb213a534de.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/28b799f5e168dea8242220414bdb7627.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/9b2eac98e16cef3ecc8c64bda3276324.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/91e29fc2e17367a0da88dfe7cd5de1fc.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/ae7d5449e1730d7e9ba45be79781caf5.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/0da3aff5e171fbef4434580c58926d1b.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/cfa7e903e1774d3b086e65c99977a3a6.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/aff89cf9e177c1e23b5ea8b7790a76f0.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/85df483ee177ec5d1b6d99bdd64b5391.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/26f84497e177ef87e5284e43c6a2b06f.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/bcce543ce176d8272d1b1b3c292dc185.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/6a339e22e174d7608a743e69f79c575d.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/2061fdebe17b8cb48e3f372ee6a758f1.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/神楽坂真冬/微博配图/微博配图/7d633d56e17b8a917f3a0915002aff2c.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/a7dfad62e17a1b4ec7da69ebb4e13656.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/微博美图相册-2020年6月13日/wwWeisa/微博配图/11726643e178fd785b99e7a793c0f5d6.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/1aa2b82ce17ff2dd672cddddbbd5e07d.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/7962d3fce17d9f52ab60dc2f5e5d2ecc.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/19f72387e17c24518137910ca3217f53.webp'
    },
    {
      errno: -9,
      path: '/我的图片-2020年6月25日/已压缩图片/爱看资源网-2020年6月20日162801/快手网红“沫沫”换衣走光漏点事件，水友纷纷录屏发666~ – 爱看资源网/bc93e55be17c841fd2e1697da0515784.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/4b5ecf8ce1433ecab32ce419b745e3cb.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/水母柒/微博配图/微博配图/70f7e050e143a0bb6c17553065d1ba6a.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/da551ad0e14212fa25349bda375cce97.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/Cheri-小婕x/Cheri-小婕x/微博配图/ecd83577e140f61a4804dde3c11954eb.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/微博美图相册-2020年6月13日/wwWeisa/微博配图/83ca4b1ce14661b43e55e82e656a8165.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月18日/Rainight魈雨/微博配图/微博配图/03976d60e145a36194a3f6fdbc131a5d.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-02-10/手机相册微博图片图片合集-20200210/手机相册-微博图片+写真+cosplay+美图+截屏+相机-合集-2020-02-10/2020年2月9日/图片webp压缩/ 贝儿酱Miki+嶋葵+Kitaro_绮太郎+歌罢海西流-20200203/334a6417e14481f95bbacc5706b61eb0.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/52b76186e14b3a18e3a03bef16131d2c.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/微博美图相册-2020年6月13日/wwWeisa/微博配图/2b48154be14bcd40bd29df51ed2d69ce.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/水母柒/微博配图/微博配图/ac1f1472e14acd67718747f6a854b82c.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-02-10/微博美图合集-2020-02-15+2020-02-14/图片压缩输出/微博美图合集-2020-02-14/咕咕板面/微博配图/5c896037e149038f77275b393c89ac1c.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/32ee73ade149f0a40d465dc3f721850d.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/神楽坂真冬/微博配图/微博配图/223c1d13e148d000833e7928915cca5d.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/神楽坂真冬/微博配图/微博配图/c984a9d1e148b4c457666b9df0c0c096.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/神楽坂真冬/微博配图/微博配图/29f156eee1534fbb854b84d18c8b0e51.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/7e96c06ae1525d2846dc9cf56c01c06e.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/神楽坂真冬/微博配图/微博配图/e1c4ce3fe1521242c91a5749f347fa44.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-02-10/微博美图合集-2020-02-15+2020-02-14/图片压缩输出/微博美图合集-2020-02-14/咕咕板面/微博配图/8550069de151689c9fc80aeb650db923.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/bee11784e1504585b8e474299976b7d4.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/d854afa8e157484d872c4e0a021b1068.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/3977bccae157d740bb41ebbbd217ef3b.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/水母柒/微博配图/微博配图/ba6ea1e4e157b0805bf9873ad1e40dc4.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/6dd083ede15607ccbcbb9a745e038f9f.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/微博美图相册-2020年6月13日/wwWeisa/微博配图/19062e54e15424767782b26ecc2fba14.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/878b46c6e15b52829286a5ca00963fec.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/adcac7c2e15b61bd510b31f380ae6725.webp'
    },
    {
      errno: -9,
      path: '/我的图片-2020年6月25日/已压缩图片/爱看资源网-2020年6月20日162801/斗鱼ASMR四大女主播之一@小女巫露娜，邻家女孩的那种哦！ – 爱看资源网/10e4c549e15b0eb48c51a5c1fb2f632d.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月18日/Rainight魈雨/微博配图/微博配图/a1d55b59e15bab32a3cc5b7ce1468bf9.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/285dfb74e15aa8ca6629de6537f3f932.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/0508e9b9e15938708150cd54a8b4cad9.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/b9ad1ca9e15ebaca4f391576eef2c533.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/24d7a0a0e15dc3b206f1cc3b50b3893e.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/神楽坂真冬/微博配图/微博配图/3f5f8ab8e15c43923ab9c66383b8df4f.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/632adab7e15c6f4a50f551e94451e8ae.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/366d7a59e15c88b603c419380c630630.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/7277ea5be1a37830fe60f46882c8b01b.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月18日/Rainight魈雨/微博配图/微博配图/6ab815d3e1a3026c7c19d4128e48a55e.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-02-10/微博美图合集-2020-02-15+2020-02-14/图片压缩输出/微博美图合集-2020-02-14/咕咕板面/微博配图/fd397c52e1a3b3b2035aacbb32469e1b.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-02-10/手机相册微博图片图片合集-20200210/手机相册-微博图片+写真+cosplay+美图+截屏+相机-合集-2020-02-10/2020年2月9日/图片webp压缩/ 贝儿酱Miki+嶋葵+Kitaro_绮太郎+歌罢海西流-20200203/d4350825e1a274d08025a7914816a1ff.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/9d56afe4e1a10222718246c4280fb8bb.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/白白白白火华/微博配图/微博配图/fcfb5f8de1a0fc63d731fd069622ca4d.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月13日/水母柒/微博配图/微博配图/61cfcaf0e1a78d73ddc6eb97db345f4c.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/52cbd85de1a6e909b6a0415b250adcce.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/7f1a56ebe1a5ab91018c20817cfa5025.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/3fbf0385e1abcfad9167e6c0ba6a27d4.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/微博美图相册-2020年6月13日/wwWeisa/微博配图/c76f26c7e1af56341b44a9892a7a5c60.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/c0c1894de1ae1ae7b258c5a05fb8b50c.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/a59f9832e1adc3b8d1ac1d32c3b4d9c8.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/a5e11745e1adfca0f887c8d5a814c919.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/8965f728e1ac024a963c53c7f3ce41ea.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月18日/Rainight魈雨/微博配图/微博配图/4cbbc590e1ac8677c10c6b11425ff1a2.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/8e3bb179e1b36d5f98de6df4284f3c8a.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/6aa47b17e1b55474a522cbe15a445234.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/长图切割压缩-2020年6月19日/微博美图相册-2020年6月13日/少女相册/微博配图/200a3592e1b4e19fc6cc0a788e737fee.webp'
    },
    {
      errno: -9,
      path: '/!我的图片-2020-06-19/微博美图相册-2020年6月18日/Rainight魈雨/微博配图/微博配图/189df61ee1b498fa4638ee4316a0f7dd.webp'
    },
    ... 100 more items
  ],
  request_id: 4212658712952001000
} */

// async function slicedelete(filestoremove: string[]) {
//     let oprearesults;
//     if (listlimit < filestoremove.length) {
//         oprearesults = (
//             await Promise.all(
//                 slicearray(filestoremove, listlimit).map(list => {
//                     return fetchdelete(list);
//                 })
//             )
//         ).flat();
//     } else {
//         oprearesults = await fetchdelete(filestoremove);
//     }
//     console.log(oprearesults);
//     const newfiles = oprearesults
//         .filter(o => o?.errno === 111)
//         .map(o => o?.path);
//     /* 把删除失败的文件再次删除 */

//     if (newfiles.length) {
//         /* 延时10秒 */

//         console.log("删除失败的文件,10秒后再次尝试删除", newfiles);
//         await new Promise(r => setTimeout(r, 10000));
//         await deletefiles(newfiles);
//     }
// }
// 删除失败的代码是111,但是也可能删除成功
// {
//     "errno": 111,
//     "path": "/!我的图片-20190604/微博美图暴力切割-2020-01-05 225127/微博美图cosplay-暴力切割图片-2020-01-05 225127-8(2).rar_20200108075529/8/dc26db61b2faab81d1c5f5734fc3a97d.webp"
//   },
// /*
// 删除成功的代码是0
// {
//     "errno": 0,
//     "path": "/!我的图片-20190604/微博美图合集-20191229/半次元cosplay频道-20191229-5.rar_20200108075443/5/452699b2cfe50d35ee2884ba81ed3dcb.webp"
//   },

//   */
/* 错误码-9是文件不存在,
错误码31034是服务器拒绝服务
*/
/* {"errno":-9,"request_id":1320659711141136779} */
// {
//   errno: 0,
//   info: [],
//   request_id: 1320023046338866700,
//   taskid: 823150949751162
// }
// /* {
//   errno: 3,
//   info: [],
//   request_id: 1319996614583890200,
//   num_limit: 2000
// } */
// POST /api/filemanager?opera=delete&async=2&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjcxMzgwODE4MjAuODAwNjQzMDEzMzE1OTA1NQ==&clienttype=0 HTTP/1.1
// Host: pan.baidu.com
// Connection: keep-alive
// Content-Length: 91
// Accept: application/json, text/javascript, */*; q=0.01
// X-Requested-With: XMLHttpRequest
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.26 Safari/537.36 Edg/81.0.416.16
// Content-Type: application/x-www-form-urlencoded; charset=UTF-8
// Origin: https://pan.baidu.com
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://pan.baidu.com/disk/home?
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
// Cookie: BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582549545,1582694989,1582711563,1582713642; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582713642; PANPSC=6576180501642569420%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4zAVEAOjn0RrKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG

// fetch("https://pan.baidu.com/api/filemanager?opera=delete&async=2&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjcxMzgwODE4MjAuODAwNjQzMDEzMzE1OTA1NQ==&clienttype=0", {
//   "headers": {
//     "accept": "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582549545,1582694989,1582711563,1582713642; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582713642; PANPSC=6576180501642569420%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4zAVEAOjn0RrKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//   },
//   "referrer": "https://pan.baidu.com/disk/home?",
//   "referrerPolicy": "no-referrer-when-downgrade",
//   "body": "filelist=%5B%22%2F%E7%AE%A1%E7%90%86%E5%91%98%E5%8F%96%E5%BE%97%E6%9D%83%E9%99%90.reg%22%5D",
//   "method": "POST",
//   "mode": "cors"
// });

// fetch("https://pan.baidu.com/api/filemanager?opera=delete&async=2&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjcxNDEzNTI2NTAuMjEzMzc5MDc5ODYxNjIzNTI=&clienttype=0", {
//   "headers": {
//     "accept": "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582549545,1582694989,1582711563,1582713642; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582713642; PANPSC=6576180501642569420%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4zAVEAOjn0RrKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//   },
//   "referrer": "https://pan.baidu.com/disk/home?",
//   "referrerPolicy": "no-referrer-when-downgrade",
//   "body": "filelist=%5B%22%2F%E7%AE%A1%E7%90%86%E5%91%98%E5%8F%96%E5%BE%97%E6%9D%83%E9%99%90.reg%22%2C%22%2FGraphicsMagick-1.3.34-Q16-win64-dll(1).exe%22%5D",
//   "method": "POST",
//   "mode": "cors"
// });

// HTTP/1.1 200 OK
// Cache-Control: no-cache
// Connection: keep-alive
// Content-Encoding: gzip
// Content-Type: application/json; charset=UTF-8
// Date: Wed, 26 Feb 2020 10:43:29 GMT
// Flow-Level: 3
// Logid: 1316893073357737816
// Server: nginx
// Vary: Accept-Encoding
// X-Powered-By: BaiduCloud
// Yld: 163971564590141272
// Yme: ZIGW+Sw8QE4TYysERnb+qnFLvvIAQwrrqANFwSWEmrzoExk/MHc=
// Content-Length: 95

// {"errno":0,"info":[],"request_id":1316893073357737816,"taskid":935102172499812}

// fetch("https://pan.baidu.com/api/filemanager?opera=delete&async=1&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=dd1601843e05e55609ed49d51dabba42&logid=MTU4MjcxNDEzNTI2NTAuMjEzMzc5MDc5ODYxNjIzNTI=&clienttype=0", {
//   "headers": {
//     "accept": "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "BAIDUID=FB4E6D238362ED1ED4E544B9850BEDC0:FG=1; BIDUPSID=FB4E6D238362ED1ED4E544B9850BEDC0; PSTM=1549849081; PANWEB=1; BDUSS=XBzT1B4MVBGVlU2Sjc5d1lKb34zSmx5VnpQTHlZN09OcFV0Q0h2b1V1YW5XeVZlSVFBQUFBJCQAAAAAAAAAAAEAAADPRYIEbWFzeDIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKfO~V2nzv1dY; STOKEN=e8edfa007b1d000fb1531ec76617ec0b95b615575fbacc337788e78925bfcd4f; SCRC=72ccb728ee6dacf2ba5938fd8d1351ca; cflag=13%3A3; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1582549545,1582694989,1582711563,1582713642; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1582713642; PANPSC=6576180501642569420%3AKkwrx6t0uHDoTFmRfJVxoMJKt428qvGu%2B%2FtD9xp6N5gr2wqYbSNJzAjY5VzUlGl4zAVEAOjn0RrKGWKyBagKrmlUQ2zB5GaPDtTCc6ZqWjGu2cUHmw770eVcjWJ40Swp0v29HoOyBxO7W09FU%2BvrLt8NRd7EA5d%2B2fNZfjs7wBY%2FcoIBUQpA2juoAeCl9TBG"
//   },
//   "referrer": "https://pan.baidu.com/disk/home?",
//   "referrerPolicy": "no-referrer-when-downgrade",
//   "body": "filelist=%5B%22%2F%E7%AE%A1%E7%90%86%E5%91%98%E5%8F%96%E5%BE%97%E6%9D%83%E9%99%90.reg%22%2C%22%2FGraphicsMagick-1.3.34-Q16-win64-dll(1).exe%22%5D",
//   "method": "POST",
//   "mode": "cors"
// });

// {"errno":12,"info":[{"errno":-9,"path":"\/\u7ba1\u7406\u5458\u53d6\u5f97\u6743\u9650.reg"},{"errno":-9,"path":"\/GraphicsMagick-1.3.34-Q16-win64-dll(1).exe"}],"request_id":1317091197014819351}

// response

// {"errno":0,"info":[],"request_id":1343596476256555324,"taskid":65546456840230}
