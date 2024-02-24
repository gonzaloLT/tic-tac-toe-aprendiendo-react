import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "https://gonzaloLT.github.io/tic-tac-toe-aprendiendo-react/",
});
