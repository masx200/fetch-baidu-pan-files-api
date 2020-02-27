const homepath = `/`;
import mongoose from "mongoose";
import process from "process";
import { generatelogid } from "./generatelogid.js";
import { getbdstokenanduser } from "./init.js";
import { listandsave } from "./listandsave.js";
process.on("unhandledRejection", err => {
    throw err;
});
export const PANENV = {
    logid: generatelogid(),
    bdstoken: undefined,
    user: undefined,
    cookie: undefined
};
export const start = async () => {
    if (!PANENV.bdstoken || !PANENV.user) {
        let [bdstoken, user] = await getbdstokenanduser();
        PANENV.bdstoken = bdstoken;
        PANENV.user = user;
    }
    const connection = mongoose.connect("mongodb://127.0.0.1/", {
        poolSize: 10,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        dbName: "pan_" + PANENV.user
    });
    connection.then(() => {
        console.log("mongodb conneted");
    });
    console.log("登陆成功");
    console.log(JSON.stringify(PANENV));
    await listandsave(homepath);
    console.log("文件数据库全部建立完成");
    process.exit();
};
