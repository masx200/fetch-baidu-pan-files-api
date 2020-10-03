import 错误码表 from "./errno.js";
function fatalerrorcheck(data) {
    if (data?.errno === -6) {
        console.error(
            "response data error \n",
            data,
            Reflect.get(错误码表, data?.errno)
        );
        process.exit(1);
    }
}
export { fatalerrorcheck };
