import { spawn } from "node:child_process";
import { readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const protoDir = resolve(root, "packages/rpc");
const intervalMs = 500;

let running = false;
let pending = false;
let lastSnapshot = new Map<string, string>();

async function listProtoFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listProtoFiles(path)));
    } else if (entry.isFile() && entry.name.endsWith(".proto")) {
      files.push(path);
    }
  }

  return files;
}

async function snapshotProtoFiles(): Promise<Map<string, string>> {
  const files = await listProtoFiles(protoDir);
  const snapshot = new Map<string, string>();

  for (const file of files) {
    const info = await stat(file);
    snapshot.set(file, `${info.mtimeMs}:${info.size}`);
  }

  return snapshot;
}

function changed(
  prev: Map<string, string>,
  next: Map<string, string>
): boolean {
  if (prev.size !== next.size) {
    return true;
  }

  for (const [file, signature] of next) {
    if (prev.get(file) !== signature) {
      return true;
    }
  }

  return false;
}

function runCodegen(reason: string) {
  if (running) {
    pending = true;
    return;
  }

  running = true;
  pending = false;
  console.log(`[proto-watch] running TS codegen (${reason})`);

  const child = spawn("pnpm", ["--filter", "web", "codegen"], {
    cwd: root,
    env: process.env,
    stdio: "inherit",
  });

  child.on("exit", (code: number | null, signal: NodeJS.Signals | null) => {
    running = false;
    if (code === 0) {
      console.log("[proto-watch] TS codegen complete");
    } else {
      console.error(`[proto-watch] TS codegen failed: ${signal ?? code}`);
    }

    if (pending) {
      runCodegen("queued change");
    }
  });
}

lastSnapshot = await snapshotProtoFiles();
runCodegen("startup");

setInterval(async () => {
  try {
    const nextSnapshot = await snapshotProtoFiles();
    if (changed(lastSnapshot, nextSnapshot)) {
      lastSnapshot = nextSnapshot;
      runCodegen("proto change");
    }
  } catch (error) {
    console.error("[proto-watch] failed to scan proto files", error);
  }
}, intervalMs);

console.log(`[proto-watch] watching ${protoDir}`);
