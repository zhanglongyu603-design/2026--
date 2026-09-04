import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

// This site is fully static. Keeping the build framework-neutral produces an
// index.html that can be hosted by Netlify, Sites, or any static file host.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';

export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  server: isCodexSeatbeltSandbox
    ? { watch: { useFsEvents: false, usePolling: true } }
    : undefined,
  plugins: [vinext()],
});
