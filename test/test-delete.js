import { deletefiles } from "../lib/fetch-delete-files.js";
deletefiles([
    "/管理员取得权限.reg",
    "/引导启动相关工具/管理员取得权限.reg",
    "/装机软件/管理员取得权限.reg",
    "/装机软件/管理员取得权限(1).reg",
]).then(() => {
    console.log("删除文件成功");
});
