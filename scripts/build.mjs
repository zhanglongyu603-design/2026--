import { spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const startedAt = Date.now();
const vinextEntry = import.meta.resolve('vinext');
const vinextCli = fileURLToPath(new URL('./cli.js', vinextEntry));
const result = spawnSync(process.execPath, [vinextCli, 'build'], {
  cwd: process.cwd(),
  stdio: 'inherit',
});

if (result.error) {
  throw result.error;
}

const requiredFiles = ['dist/client/index.html', 'dist/client/404.html'];
const staticExportIsFresh = requiredFiles.every((file) => {
  if (!existsSync(file)) return false;
  const stats = statSync(file);
  return stats.size > 0 && stats.mtimeMs >= startedAt - 2000;
});

if (result.status === 0) {
  process.exit(0);
}

// Vinext beta can hit a libuv shutdown assertion on Windows after reporting a
// completed static export. Only accept that platform-specific exit when this
// run produced fresh, non-empty HTML entry files. Linux/Netlify failures remain
// hard failures.
if (process.platform === 'win32' && staticExportIsFresh) {
  console.warn('[build] Static export verified after a Windows-only Vinext shutdown error.');
  process.exit(0);
}

process.exit(result.status ?? 1);
