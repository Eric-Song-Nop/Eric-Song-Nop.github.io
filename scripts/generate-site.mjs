import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { delimiter, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const gocireDir = resolve(process.env.GOCIRE_DIR || join(repoRoot, "..", "gocire"));
const siteDir = join(repoRoot, ".gocire", "site");
const homeRedirectTarget = "/blogs/2025_12_14_gocire.go.html/";

if (!existsSync(join(gocireDir, "cmd", "gocire"))) {
  throw new Error(`GOCIRE_DIR does not point to a gocire checkout: ${gocireDir}`);
}

// Keep generated Astro output out of rust-analyzer's workspace scan.
await rm(siteDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

const env = {
  ...process.env,
  PATH: [join(repoRoot, "node_modules", ".bin"), process.env.PATH || ""].join(delimiter),
};

const result = spawnSync(
  "go",
  [
    "run",
    "./cmd/gocire",
    "-project",
    "-format",
    "astro",
    "-lsp",
    "-index",
    "",
    "-config",
    join(repoRoot, ".gocire.yml"),
  ],
  {
    cwd: gocireDir,
    env,
    stdio: "inherit",
  },
);

if (result.error) {
  throw result.error;
}
if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

await writeHomePage();

async function writeHomePage() {
  const navigationPath = join(siteDir, "src", "generated", "navigation.ts");
  const navigation = await readFile(navigationPath, "utf8");
  if (!navigation.includes(JSON.stringify(homeRedirectTarget))) {
    throw new Error(`Generated navigation does not include homepage target: ${homeRedirectTarget}`);
  }
  const target = homeRedirectTarget;
  const pagesDir = join(siteDir, "src", "pages");

  await mkdir(pagesDir, { recursive: true });
  await writeFile(
    join(pagesDir, "index.astro"),
    `---
const target = ${JSON.stringify(target)};
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {target !== "/" && <meta http-equiv="refresh" content={"0;url=" + target} />}
    <link rel="canonical" href={target} />
    <title>Ericoolen</title>
  </head>
  <body>
    <main>
      <p><a href={target}>Open the generated site</a></p>
    </main>
  </body>
</html>
`,
  );
}
