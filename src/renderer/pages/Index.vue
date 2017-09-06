<template>
    <div class="home">
        <el-upload
        class="upload-demo"
        drag
        :on-success="success"
        :on-error="error"
        action="https://bird.ioliu.cn/v2?url=http://picupload.service.weibo.com/interface/pic_upload.php?ori=1&mime=image%2Fjpeg&data=base64&url=0&markpos=1&logo=&nick=0&marks=1&app=miniblog"
        multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
    </div>
</template>
<script>
import {Button,ElUpload} from 'element-ui'
export default{
    compnents:{Button,ElUpload},
    methods:{
        success(res,file,fileList){
            console.log(fileList)
        },
        error(err, file, fileList){
            console.log(err)
        }
    }
}
</script>
<style scoped lang="scss">

</style>