import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'fs';

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

//my handlers

ipcMain.handle('read-all-metadata', async () => {
  try {
    const flashcardsDir = path.join(__dirname, '../flashcards'); // Adjust to your structure
    const sets = [];

    // Read directories inside the flashcards folder
    const directories = fs.readdirSync(flashcardsDir, { withFileTypes: true });

    // Loop through each directory in the flashcards folder
    for (const dir of directories) {
      if (dir.isDirectory()) {
        const metadataPath = path.join(flashcardsDir, dir.name, 'metadata.json');

        // Check if metadata file exists
        if (fs.existsSync(metadataPath)) {
          const metadata = fs.readFileSync(metadataPath, 'utf8');
          sets.push(JSON.parse(metadata)); // Push parsed metadata to the array
        }
      }
    }

    return sets; // Return all the metadata files as an array
  } catch (error) {
    console.error('Error reading metadata files:', error);
    return []; // Return an empty array if there’s an error
  }
});

ipcMain.handle('read-flashcards', async (event, setId) => {
  try {
    const flashcardsPath = path.join(__dirname, '../flashcards', setId, 'flashcards.json'); // Adjust path based on structure
    if (fs.existsSync(flashcardsPath)) {
      const flashcardsData = fs.readFileSync(flashcardsPath, 'utf-8');
      return JSON.parse(flashcardsData); // Return the parsed flashcards data
    } else {
      throw new Error('Flashcards file not found');
    }
  } catch (error) {
    console.error('Error reading flashcards file:', error);
    return null; // Return null or handle error in some way
  }
});



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
