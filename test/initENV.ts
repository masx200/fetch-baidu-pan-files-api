import { initPANENV } from "../lib/PANENV.js";
process.on("unhandledRejection", (err) => {
    throw err;
});
Array(5)
    .fill(undefined)
    .forEach(() => {
        initPANENV().then(console.log);
    });
