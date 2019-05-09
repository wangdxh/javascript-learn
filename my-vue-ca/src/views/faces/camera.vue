<template>
    <div style="height:100vh;background-color:black;">
        <br>
        <el-row :gutter="20">
            <el-col :span="10" :offset="2">
              <div ref="videobaba" style="width:100%;height:320px">
                <video ref="myvideo" playsinline controls
                       style="border:1px solid gray">
                </video>
              </div>
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

function getUserMedia(constraints, success, error) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //最新的标准API
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(success)
      .catch(error);
  } else if (navigator.webkitGetUserMedia) {
    //webkit核心浏览器
    navigator.webkitGetUserMedia(constraints, success, error);
  } else if (navigator.mozGetUserMedia) {
    //firfox浏览器
    navigator.mozGetUserMedia(constraints, success, error);
  } else if (navigator.getUserMedia) {
    //旧版API
    navigator.getUserMedia(constraints, success, error);
  }
}

export default {
  data() {
    return {
      imagesrc: "",
      objectlist: [],
      localstream: null,
      tmpcurimgtag: 0,
      resulttext:'\n\n\n\n',
      ro:null,
    };
  },
  methods: {
    opencamera() {
      if (this.localstream) {
        return;
      }
      console.log(navigator.mediaDevices, navigator);
      if (
        (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ||
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
      ) {
        //调用用户媒体设备, 访问摄像头
        getUserMedia(
          {
            video: {
              /*width: 320, height: 480, environment*/ facingMode: "user"
            },
            audio: false
          },
          this.success,
          this.error
        );
      } else {
        this.$alert("破电脑不支持摄像头", "kedacom");
      }
    },
    closecamera() {
      let video = this.$refs.myvideo;
      video.pause();
      video.srcObject = null;

      if (this.localstream) {
        console.log(this.localstream, this.localstream.getTracks().length);
        this.localstream.getTracks().forEach(element => {
          element.stop();
        });
        this.localstream = null;
      }
    },
    success(stream) {
      //将视频流设置为video元素的源
      console.log(stream);
      this.localstream = stream;
      let video = this.$refs.myvideo;
      video.srcObject = stream;
      video.play();
      console.log(video);
    },
    error(error) {
      this.$alert(`访问摄像头失败: ${error.name}, ${error.message}`, "kedacom");
    },
    screenshot() {
      // 小技巧
      let canvas = document.getElementsByTagName("canvas")[0];
      canvas
        .getContext("2d")
        .drawImage(this.$refs.myvideo, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(this.blobcallback, "image/jpeg", 0.95);
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
    // very ok
    this.$refs.myvideo.width =
      this.$refs.myvideo.parentNode.clientWidth || 300; //this.$props.width
    this.$refs.myvideo.height =
      this.$refs.myvideo.parentNode.clientHeight || 150;

    this.ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { left, top, width, height } = entry.contentRect;
        if ("DIV" == entry.target.nodeName) {
          if (this.$refs.myvideo) {
            console.log(width, height, entry.target)
            //alert(`width ${width} height ${height} ${entry.contentRect}` )
            this.$refs.myvideo.width = width || 300; //this.$props.width
            this.$refs.myvideo.height = height || 150;            
          }
        }
        /*console.log(`Element's size: ${width}px x ${height}px`);
        console.log(`Element's paddings: ${top}px ; ${left}px`);*/
      }
    });

    this.ro.observe(this.$refs.videobaba);
  },

  beforeDestroy() {
    this.ro.unobserve(this.$refs.videobaba);
    this.closecamera();
  }
};
</script>
