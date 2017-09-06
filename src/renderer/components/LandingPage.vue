<template>
  <div id="wrapper">
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    data(){
      return {
        electron: process.versions['atom-shell'],
        name: 'landing-page',
        node: process.versions.node,
        path: '/',
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    },
    mounted(){
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      send(){
        // let ipcRenderer = this.$electron.ipcRenderer
        // ipcRenderer.on('asynchronous-reply', (event, arg) => {
        //   //console.log(event) // prints "pong"
        //   window.location.reload()
        // })
        // ipcRenderer.send('asynchronous-message', 'ping')
      }
    }
  }
</script>

<style lang="scss" scoped>


</style>
