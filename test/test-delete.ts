import { deletefiles } from "../lib/fetch-delete-files";
deletefiles([
    "/管理员取得权限.reg",
    "/引导启动相关工具/管理员取得权限.reg",
    "/装机软件/管理员取得权限.reg",
    "/装机软件/管理员取得权限(1).reg",
])
    .then(() => {
        console.log("删除文件成功");
    })
    .catch((e) => {
        console.error("delete test failed");
        throw e;
    });
process.on("unhandledRejection", (err) => {
    throw err;
});
