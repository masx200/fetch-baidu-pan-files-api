import 错误码表 from "./errno.js";
function fatalerrorcheck(data) {
    if (data?.errno === -6) {
        const e = new Error("response data error \n" +
            JSON.stringify(data) + "\n" +
            Reflect.get(错误码表, data?.errno));
        console.error(e);
        process.exit(1);
    }
}
export { fatalerrorcheck };
