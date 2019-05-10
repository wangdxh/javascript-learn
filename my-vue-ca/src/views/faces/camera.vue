<template>
    <div style="height:100vh;background-color:black;">
        <br>
        <el-row :gutter="20">
            <el-col :span="10" :offset="2">              
              <cameravideo ref="camera" style="width:100%;height:320px"> </cameravideo>
            </el-col>            

            <el-col :span="10">
                  <canvasrect style="width:100%;height:320px;" :imagesrc="imagesrc" :objectlist="objectlist">
                  </canvasrect>
            </el-col>                            

        </el-row>
        
        <br>
        <br>
        <br>

        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-button type="primary" size="small" @click="opencamera">打开摄像头</el-button>
                <el-button type="primary" size="small" @click="closecamera">关闭摄像头</el-button>
                <el-button type="primary" size="small" @click="screenshot">截屏</el-button>
            </el-col>
        </el-row>        
        
        
        <br>
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-input :rows="10" type="textarea" readonly="readonly" autosize placeholder="请输入内容" v-model="resulttext">
                </el-input>
            </el-col>                            
        </el-row>        
        
        
    </div>
</template>


<style>
.el-textarea .el-textarea__inner{
  background-color: black !important;
  color: white !important;
}
</style>

<script>
import myaxios from "@/utils/myaxios";
import ResizeObserver from "resize-observer-polyfill";


export default {
  data() {
    return {
      imagesrc: "",
      objectlist: [],      
      tmpcurimgtag: 0,
      resulttext:'\n\n\n\n',      
    };
  },
  methods: {
    opencamera() {
      this.$refs.camera.opencamera()
    },
    closecamera(){
      this.$refs.camera.closecamera()
    },
    screenshot() {
      //canvas.toBlob(this.blobcallback, "image/jpeg", 0.95);
      this.$refs.camera.getvideoblob(this.blobcallback);
    },
    blobcallback(blob) {
      this.imagesrc = window.URL.createObjectURL(blob);
      console.log("get image blob:", this.imagesrc);
      this.getfaceresult("image_file", blob);
    },

    getfaceresult(url, urldata) {
      this.objectlist = [];
      this.resulttext = '\n\n\n\n';

      let tag = ++this.tmpcurimgtag;
      // send axios
      let formdata = new FormData();
      formdata.append("api_key", "YHlShnzToe1pqvnTXTYupi5Fst0kMnkC");
      formdata.append("api_secret", "fYBk6261SF-NjJUrJjp1-rZBO8p9JJBq");
      formdata.append("return_landmark", 0);
      formdata.append("return_attributes", "gender,age,eyestatus,mouthstatus");
      formdata.append(url, urldata);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      myaxios
        .post(
          "https://api-cn.faceplusplus.com/facepp/v3/detect",
          formdata,
          config
        )
        .then(res => {
          console.log(res);
          if (tag != this.tmpcurimgtag) {
            console.log("error tag: ", tag, this.tmpcurimgtag);
            return;
          }

          // imgwidth and imgheight have got
          for (let inx = 0; inx < res.faces.length; inx++) {
            const item = res.faces[inx];
            this.objectlist.push(item.face_rectangle);
            if (this.resulttext == "\n\n\n\n") {
                
                this.resulttext = `岁数：${item.attributes.age.value}\n` + 
                                  (item.attributes.age.value > 35 ? '\t\t人生七十古来稀，你已经稀一半了\n' :'\t\t很年轻，骚年\n') +
                                  `性别：${item.attributes.gender.value}\n`+
                                  `嘴的状态 close:${item.attributes.mouthstatus.close}\n`+
                                  `嘴的状态 open:${item.attributes.mouthstatus.open}\n`
            }
          }
        });
    }
  },
  mounted() {
    
  },

  beforeDestroy() {    
    this.closecamera();
  }
};
</script>
