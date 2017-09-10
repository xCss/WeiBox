<template>
    <div class="home"><div class="el-upload el-upload--text"><i class="el-icon-plus avatar-uploader-icon"></i><input type="file" name="file" class="el-upload__input"></div>
    </div>
</template>
<script>
import Weibo from '../utils/Weibo'
export default{
    data(){
        return {

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
    }
}
</script>
<style scoped lang="scss">

</style>