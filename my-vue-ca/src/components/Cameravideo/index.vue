<template>
  <div ref="cameravideobaba">
    <video ref="myvideo" playsinline controls
                       style="border:1px solid gray">
    </video>
  </div>
</template>

<script>
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
  name: "Cameravideo",
  data() {
    return {      
      cacheCanvas:null,
      videowidth: 0,
      videoheight: 0,
      localstream: null,
      ro: null
    };
  },
  
  methods: {
    opencamera(){
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
        this.$alert("浏览器不支持摄像头，chrome下 试试localhost登陆或者https访问", "kedacom");
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
      video.onloadedmetadata = ()=>{
        this.videowidth = video.videoWidth;
        this.videoheight = video.videoHeight;
        this.cacheCanvas.width = this.videowidth;
        this.cacheCanvas.height = this.videoheight;
        console.log('video image width ,height', video.videoWidth, video.videoHeight, this)
      }
      video.srcObject = stream;
      video.play();
    },
    error(error) {
      this.$alert(`访问摄像头失败: ${error.name}, ${error.message}`, "kedacom");
    },
    getvideoblob(blobfunc){
      let ctx = this.cacheCanvas.getContext("2d")
      console.log(this.cacheCanvas.width, this.cacheCanvas.height, this.videowidth, this.videoheight)
      ctx.clearRect(0, 0, this.cacheCanvas.width, this.cacheCanvas.height)
      ctx.drawImage(this.$refs.myvideo, 0, 0, this.videowidth, this.videoheight);
      this.cacheCanvas.toBlob(blobfunc, "image/jpeg", 0.95);
    }

  },
  mounted() {
    this.cacheCanvas = document.createElement('canvas');
    this.cacheCanvas.width = 300;
    this.cacheCanvas.height = 150;    

    this.$refs.myvideo.width =
      this.$refs.myvideo.parentNode.clientWidth || 300; //this.$props.width
    this.$refs.myvideo.height =
      this.$refs.myvideo.parentNode.clientHeight || 150;

    this.ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { left, top, width, height } = entry.contentRect;
        if ("DIV" == entry.target.nodeName) {
          if (this.$refs.myvideo) {
            console.log(width, height, entry.target);
            //alert(`width ${width} height ${height} ${entry.contentRect}` )
            this.$refs.myvideo.width = width || 300; //this.$props.width
            this.$refs.myvideo.height = height || 150;            
          }
        }
        /*console.log(`Element's size: ${width}px x ${height}px`);
        console.log(`Element's paddings: ${top}px ; ${left}px`);*/
      }
    });

    this.ro.observe(this.$refs.cameravideobaba);
  },
  beforeDestroy() {    
    if (this.ro) {
      this.ro.unobserve(this.$refs.cameravideobaba);
    }
    this.cacheCanvas = null
  }
};
</script>

