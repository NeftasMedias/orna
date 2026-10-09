// Lists every placeholder still on the site. Run with: npm run todo
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
let total = 0;
const section = (title) => console.log(`\n${title}\n${"-".repeat(title.length)}`);
const item = (text) => {
  total += 1;
  console.log(`  - ${text}`);
};

section("Settings (config/site.ts)");
const config = read("config/site.ts");
for (const match of config.matchAll(/^\s*(\w+):\s*"(\[[^\]]+\])"/gm)) item(`${match[1]}: ${match[2]}`);
if (/showPlaceholderMarkers:\s*true/.test(config)) item("showPlaceholderMarkers is true (set to false at launch)");
if (/heroImage:\s*""/.test(config)) item("heroImage: no home page photo yet");

section("Products (data/products.json)");
const products = JSON.parse(read("data/products.json"));
const byField = new Map();
for (const p of products) {
  const open = [...(p.todo ?? [])];
  if (p.images.length === 0 && !open.includes("photos")) open.push("photos");
  for (const key of open) byField.set(key, [...(byField.get(key) ?? []), p.slug]);
}
for (const [key, slugs] of byField) {
  item(`${key}: ${slugs.length} product${slugs.length === 1 ? "" : "s"}${slugs.length <= 6 ? ` (${slugs.join(", ")})` : ""}`);
}

section("Lookbook (data/lookbook.json)");
for (const look of JSON.parse(read("data/lookbook.json"))) {
  for (const key of look.todo ?? []) item(`${look.title}: ${key}`);
}

section("Draft page text marked <Todo> (owner to confirm)");
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : /\.tsx$/.test(name) ? [full] : [];
  });
for (const file of [...walk(join(root, "app")), ...walk(join(root, "components"))]) {
  const source = readFileSync(file, "utf8");
  if (file.endsWith("Todo.tsx")) continue;
  const count = (source.match(/<Todo\b/g) ?? []).length;
  if (count > 0) item(`${relative(root, file).replaceAll("\\", "/")}: ${count} marker${count === 1 ? "" : "s"} in the code`);
}

console.log(`\n${total} item${total === 1 ? "" : "s"} to finish before launch.\n`);
