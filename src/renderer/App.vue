<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
import Index from './pages/Index'
export default {
  components:{Index},
  name: 'weibox'
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
.menu{
  position:absolute;
  right:1.5rem;
  bottom:1.5rem;
  font-size:1.2rem;
  i{
    font-size:2.2rem;
    &:hover{
      color:#20a0ff;
    }
  }
}
.menu-slide{
  font-size:1.4rem;
}
</style>
