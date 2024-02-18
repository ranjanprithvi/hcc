import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
