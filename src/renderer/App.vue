<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
import Index from './pages/Index'
export default {
  components:{Index},
  name: 'weibox',
  mounted(){
    let self = this
    let electron = self.$electron
    let ipc = electron.ipcRenderer
    let Menu = electron.remote.Menu

    /**
     * Initial menu options
     */
    const template = [
      {
        label: '文件',
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
              ipc.send('changeLogin')
            }
          },{
            label:'清空历史记录',
            accelerator:'CmdOrCtrl+ALT+H',
            click(){
              ipc.send('clearHistory')
            }
          },{
            type: 'separator'
          },{
            label:'开发者工具',
            role:'toggledevtools'
          }
        ]
      },
      {
        label:'帮助',
        submenu:[{
          label:'问题反馈',
          accelerator:'ALT+R',
          click(){require('electron').shell.openExternal('https://github.com/xCss/WeiBox/issues/new')}
        },{
            type: 'separator'
        },{
          label:'关于',
          role:'about',
          accelerator:'ALT+I',
          click(){require('electron').shell.openExternal('https://github.com/xCss/WeiBox')}
        }]
      },
    ];

    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      });
    }

    let mainMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(mainMenu);
  }
}
</script>

<style lang="scss">
/* CSS */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Exo 2", "Trebuchet MS","Helvetica","Arial",'PingFang SC','Hiragino Sans GB','STHeiti Light','Microsoft YaHei','SimHei','WenQuanYi Micro Hei',sans-serif ;
}
html,body,#app{
  color:#58666e;
  height:100%;
  font-size:62.5%;
  position:relative;
}
</style>
