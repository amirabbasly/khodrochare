import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  outputDir: "coverage/browser/results",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 60000,
  expect: { timeout: 15000 },
  reporter: [["list"], ["html", { outputFolder: "coverage/browser/report", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3218",
    serviceWorkers: "block",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, args: ["--no-sandbox", "--disable-dev-shm-usage"] } : {},
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 5"], viewport: { width: 360, height: 800 } } },
  ],
  webServer: {
    command: "npm run start -- --hostname 0.0.0.0 --port 3218",
    url: "http://127.0.0.1:3218",
    reuseExistingServer: false,
    timeout: 60000,
    env: { SERVICE_REQUEST_WEBHOOK_URL: "", SERVICE_REQUEST_WEBHOOK_TOKEN: "", NEXT_TELEMETRY_DISABLED: "1" },
  },
});
