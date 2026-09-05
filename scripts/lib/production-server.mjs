import { spawn } from "node:child_process";
import { once } from "node:events";
export async function withProductionServer(run) {
  const port = Number(process.env.SEO_TEST_PORT ?? 3217);
  const origin = `http://127.0.0.1:${port}`;
  let logs = "";
  const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "0.0.0.0", "--port", String(port)], {
    env: { ...process.env, NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1", SERVICE_REQUEST_WEBHOOK_URL: "", SERVICE_REQUEST_WEBHOOK_TOKEN: "" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const capture = (chunk) => { logs = (logs + chunk.toString()).slice(-30000); };
  child.stdout.on("data", capture); child.stderr.on("data", capture);
  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Server startup timed out:\n${logs}`)), 60000);
      const ready = () => { if (logs.includes("Ready in")) { clearTimeout(timeout); child.stdout.off("data", ready); resolve(); } };
      child.stdout.on("data", ready);
      child.once("error", (error) => { clearTimeout(timeout); reject(error); });
      child.once("exit", (code) => { clearTimeout(timeout); reject(new Error(`Server exited ${code}:\n${logs}`)); });
    });
    return await run(origin);
  } finally {
    if (child.exitCode === null && child.signalCode === null) {
      const exited = once(child, "exit"); child.kill("SIGTERM");
      const force = setTimeout(() => child.kill("SIGKILL"), 5000);
      await exited; clearTimeout(force);
    }
  }
}
