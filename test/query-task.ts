import {
    taskquerydeleteonce,
    fetchdeletetaskid,
    taskquerydeletepoll,
} from "../lib/index";
fetchdeletetaskid(["/sssssssssssssssssss/notfound", "/testssss/notfound"])
    .then((taskid) => {
        console.log("taskid", taskid);
        if (taskid) {
            taskquerydeletepoll(taskid);
            return taskquerydeleteonce(taskid);
        }
        return;
    })
    .then(console.log)
    .then(() => {
        console.log("fetchdeletetaskid success");
    })
    .catch((e) => {
        console.error("fetchdeletetaskid failed");
        throw e;
    });
process.on("unhandledRejection", (err) => {
    throw err;
});
