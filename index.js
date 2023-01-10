const { app, Menu, BrowserWindow, MenuItem } = require('electron');
const path = require('path');
const { ApplicationMenuTemplate, ContextMenuTemplate } = require('./menu');
require('update-electron-app')();

// modify your existing createWindow() function
const createWindow = () => {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: 'logo/192X192-dark.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true,
            nodeIntegration: true,
            spellcheck: true
        }
    })

    // This method will be called for customize menu
    const menu = Menu.buildFromTemplate(ApplicationMenuTemplate);
    Menu.setApplicationMenu(menu);

    // This method for context menu (right-click)
    const cntxtMenu = Menu.buildFromTemplate(ContextMenuTemplate);
    win.webContents.on("context-menu", () => {
        cntxtMenu.popup();
    });

    // and load the index.html of the app.
    win.loadFile('www/index.html');

    // Open the DevTools.
    // process.env.NODE_ENV !== 'production' && win.openDevTools();

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});