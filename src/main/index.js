import { app,ipc, ipcMain,BrowserWindow, Menu, Tray } from 'electron'
const path = require('path')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow,mainMenu,appIcon
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const iconPath = `${__static}/assets/icon.png`
function createWindow () {

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    titleBarStyle: 'hidden-inset',
    resizable: false,
    show: false,
    icon:iconPath
  })

  mainWindow.loadURL(winURL)

  // disable white loading page by 'ready-to-show' event
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // icon in menu bar
  if (appIcon === null) {
    appIcon = new Tray(`${__static}/assets/icon.png`);
    appIcon.setToolTip('WeiBox');
    appIcon.on('click', () => {
      if (mainWindow === null) {
        createWindow();
      }
    });
  }

  // 清空历史记录
  ipcMain.on('clearHistory',function(evt,args){
    evt.sender.send('clearHistory',true)
  })
  // 切换登录账号
  ipcMain.on('changeLogin',function(evt,args){
    evt.sender.send('changeLogin',true)
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
