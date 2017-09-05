import { app, BrowserWindow, Menu, Tray } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow,mainMenu,appIcon
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {

  /**
   * Initial menu options
   */
  const template = [
    {
      role: 'editMenu',
    },
    {
      label: 'Window',
      submenu: [
        {
          role: 'minimize',
        },
        {
          role: 'close',
        },
        {
          type: 'separator',
        },
        {
          label: 'QBox',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            app.emit('activate');
          },
        },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Document',
          click() { require('electron').shell.openExternal('https://github.com/xCss/WeiBox/blob/master/README.md'); },
        },
        {
          type: 'separator',
        },
        {
          label: 'Open Source',
          click() { require('electron').shell.openExternal('https://github.com/xCss/WeiBox'); },
        },
        {
          label: 'License',
          click() { require('electron').shell.openExternal('https://github.com/xCss/WeiBox/blob/master/LICENSE'); },
        },
        {
          type: 'separator',
        },
        {
          label: 'About',
          click() { require('electron').shell.openExternal('https://github.com/xCss'); },
        },
      ],
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
    width: 1000
  })

  mainWindow.loadURL(winURL)

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
