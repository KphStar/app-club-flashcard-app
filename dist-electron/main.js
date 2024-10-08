import { ipcMain, app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
ipcMain.handle("read-all-metadata", async () => {
  try {
    const flashcardsDir = path.join(__dirname, "../flashcards");
    const sets = [];
    const directories = fs.readdirSync(flashcardsDir, { withFileTypes: true });
    for (const dir of directories) {
      if (dir.isDirectory()) {
        const metadataPath = path.join(flashcardsDir, dir.name, "metadata.json");
        if (fs.existsSync(metadataPath)) {
          const metadata = fs.readFileSync(metadataPath, "utf8");
          sets.push(JSON.parse(metadata));
        }
      }
    }
    return sets;
  } catch (error) {
    console.error("Error reading metadata files:", error);
    return [];
  }
});
ipcMain.handle("read-flashcards", async (event, setId) => {
  try {
    const flashcardsPath = path.join(__dirname, "../flashcards", setId, "flashcards.json");
    if (fs.existsSync(flashcardsPath)) {
      const flashcardsData = fs.readFileSync(flashcardsPath, "utf-8");
      return JSON.parse(flashcardsData);
    } else {
      throw new Error("Flashcards file not found");
    }
  } catch (error) {
    console.error("Error reading flashcards file:", error);
    return null;
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
