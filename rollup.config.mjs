// import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import { terser } from "rollup-plugin-terser";
import ts from "rollup-plugin-ts";
import rollupExternalModules from "rollup-external-modules";
const terserplugin = terser({
    compress: {
        ecma: 2015,
        toplevel: true,
        unused: true,

        drop_debugger: true,
    },
    module: true,
    mangle: true,
    output: { comments: false, beautify: true },
});
// const external = [
//     "@masx200/async-task-current-limiter",
//     "@masx200/mini-cli-args-parser",
//     "btoa",
//     "fs-extra",
//     "cross-fetch",
//     "cookie",
// ];
const external = rollupExternalModules;
const banner = `#!/usr/bin/env node`;
export default defineConfig([
    {
        external,
        input: "lib/index.ts",
        output: [
            { sourcemap: true, file: "./dist/index.js", format: "esm" },
            { sourcemap: true, file: "./dist/index.cjs", format: "cjs" },
        ],
        plugins: [
            resolve(),
            commonjs(),
            ts({ transpiler: "typescript" }),
            terserplugin,
        ],
    },
    {
        external,
        input: "cli/save-cookie.ts",
        output: [
            {
                banner,
                sourcemap: true,
                file: "./dist/save-cookie.js",
                format: "esm",
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            ts({ transpiler: "typescript" }),
            ,
            terserplugin,
        ],
    },
    {
        external,
        input: "test/index.ts",
        output: [{ sourcemap: true, file: "./dist/test.js", format: "esm" }],
        plugins: [
            resolve(),
            commonjs(),
            ts({ transpiler: "typescript" }),
            terserplugin,
        ],
    },
]);
