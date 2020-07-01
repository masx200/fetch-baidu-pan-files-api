// import fetch from "node-fetch";
import { taskquerydeleteonce } from "./taskquerydeleteonce";

export const operationurl = `https://pan.baidu.com/share/taskquery`;
/* 轮询任务状态 */
export async function taskquerydeletepoll(
    taskid: number
    // filelist: string[]
): Promise<void> {
    while (true) {
        // console.log("开始查询任务状态", taskid);
        const { status, progress } = await taskquerydeleteonce(
            taskid
            // filelist
        );
        console.log("查询到任务状态成功", taskid, status, progress);

        // 任务完成后第一次是  "success",后面是 "failed"
        if (status === "success" || status === "failed") {
            // 可能是成功或失败
            return;
        } else {
            await new Promise((r) => {
                setTimeout(r, 5000);
            });
        }
    }
}
