import 错误码表 from "./errno.js";

export function response_error_handler(data:any,urlhref:string){


const errno = data?.errno;
                assert(typeof errno === "number");

if(

errno!==0

){

console.error("response body error",data)
                throw Error(
                    "response data error \n" +
                        urlhref +
                        " \n" +
                        errno +" "+
                        Reflect.get(错误码表, errno)
                );

}
}
