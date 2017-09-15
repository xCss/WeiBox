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
   * Initial menu options
   */
  const template = [
    {
      label: '窗口',
      submenu: [
        {
          label:'最小化',
          role: 'minimize',
        },
        {
          label:'退出(X)',
          role: 'close',
        }
      ],
    },
    {
      label:'设置',
      submenu:[
        {
          label:'切换微博账号',
          accelerator:'CmdOrCtrl+ALT+C',
          click(){
            //mainWindow.loadURL(winURL)
            //ipc.send('changeLogin')
            console.log(ipcMain)
          }
        },{
          label:'清空历史记录',
          accelerator:'CmdOrCtrl+ALT+H',
          click(){
            ipc.send('clearHistory')
            //mainWindow.loadURL(winURL + '#/history')
          }
        },{
          type: 'separator',
        },{
          label:'开发者工具',
          role:'toggledevtools'
        }
      ]
    },
    {
      label:'关于',
      role: 'about',
      click(){require('electron').shell.openExternal('https://github.com/xCss/WeiBox')}
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });
  }

  mainMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(mainMenu);


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
