import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteDir = join(repoRoot, ".gocire", "site");
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

if (!existsSync(join(siteDir, "package.json"))) {
  throw new Error("Generated Astro site is missing. Run `pnpm run generate` first.");
}

await writeFile(
  join(siteDir, "pnpm-workspace.yaml"),
  `allowBuilds:
  esbuild: true
  sharp: false
`,
);
run(["--dir", siteDir, "install"]);

function run(args) {
  const result = spawnSync(pnpm, args, {
    cwd: repoRoot,
    env: process.env,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result;
}
