import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/dhis2": {
        target: "https://ccdev.org/ichis",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/dhis2/, ""),
        cookieDomainRewrite: "localhost", // Rewrite cookie domain
        cookiePathRewrite: "/", // Rewrite cookie path
      },
    },
  },
});
