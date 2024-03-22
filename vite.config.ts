import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

const plugins = [react()] as any[];
if (process.env.NODE_ENV === "development") {
    plugins.push(basicSsl());
}

// https://vitejs.dev/config/
export default defineConfig({
    // server: {
    //     https:
    //         process.env.NODE_ENV === "development" &&
    //         process.env.SSL_CERT &&
    //         process.env.SSL_KEY
    //             ? {
    //                   cert: fs.readFileSync("./cert/localhost.crt"),
    //                   key: fs.readFileSync("./cert/localhost.key"),
    //               }
    //             : {},
    // },
    plugins: plugins,
    build: {
        rollupOptions: {
            /**
             * Ignore "use client" waning since we are not using SSR
             * @see {@link https://github.com/TanStack/query/pull/5161#issuecomment-1477389761 Preserve 'use client' directives TanStack/query#5161}
             */
            onwarn(warning, warn) {
                if (
                    warning.code === "MODULE_LEVEL_DIRECTIVE" &&
                    warning.message.search(`"use client"`)
                ) {
                    return;
                }
                warn(warning);
            },
        },
    },
});
