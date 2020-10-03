import {
    taskquerydeleteonce,
    fetchdeletetaskid,
    taskquerydeletepoll,
} from "../lib/index.js";
fetchdeletetaskid(["/sssssssssssssssssss/notfound", "/testssss/notfound"])
    .then((taskid) => {
        console.log("taskid", taskid);
        if (taskid) {
            taskquerydeletepoll(taskid);
            return taskquerydeleteonce(taskid);
        }
        return;
    })
    .then(console.log);
process.on("unhandledRejection", (err) => {
    throw err;
});
