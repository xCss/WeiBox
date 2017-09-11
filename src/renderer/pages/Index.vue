<template>
    <div class="home">
        <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
<el-dialog :close-on-click-modal="false" title="请先登录微博" :visible.sync="dialogFormVisible">
  <el-form :model="weibo">
    <el-form-item>
      <el-input placeholder="邮箱/会员账号/手机号" v-model="weibo.userName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input placeholder="请输入密码" v-model="weibo.userPwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item class="quote"><i class="el-icon-information"></i> 账号信息不会上传，请放心登录</el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">登 录</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
import Weibo from '../utils/Weibo'
export default{
    data(){
        return {
            rember:false,
            dialogFormVisible:false,
            weibo:{
                userName:'',
                userPwd:''
            }
        }
    },
    mounted(){
        try {
            
        //new Weibo()
        } catch (error) {
            console.log(error)
        }
    },
    methods:{
        login(){
            let cookies = localStorage.getItem('weiboxCookies') || ''
            
        }
    }
}
</script>
<style scoped lang="scss">
.rember{
    color:#b5b4b4;
    cursor: pointer;
}
.quote{
    padding-left: 10px;
    border-left: 5px solid #dedede;
    color: #999;
}
</style>