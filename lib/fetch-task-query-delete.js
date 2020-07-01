import { taskquerydeleteonce } from "./taskquerydeleteonce";
export const operationurl = `https://pan.baidu.com/share/taskquery`;
export async function taskquerydeletepoll(taskid) {
    while (true) {
        const { status, progress } = await taskquerydeleteonce(taskid);
        console.log("查询到任务状态成功", taskid, status, progress);
        if (status === "success" || status === "failed") {
            return;
        } else {
            await new Promise((r) => {
                setTimeout(r, 5000);
            });
        }
    }
}
