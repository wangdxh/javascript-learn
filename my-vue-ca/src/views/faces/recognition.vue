<template>
    <div style="height:100vh;background-color:black;">
        <br>
        <el-row>
            <el-col :span="20" :offset="2">
                <div class="imageslist">
                  <button class="imgleftdiv" @click="clickleftbtn">                
                        <i class="el-icon-arrow-left"></i>
                  </button>

                    <div class="content" id="imglist">
                        <img v-for="(item, index) in imglists" :key="index" class="img" :class="curimgindex==index? 'active' : '' " :src="item" @click="clickimglist(index)"
                            alt="">
                    </div>                                            

                    <button class="imgrightdiv" @click="clickrightbtn">                
                      <i class="el-icon-arrow-right"></i>                  
                    </button>
                </div>

                
            </el-col>

        </el-row>
        <br>


        <el-row type="flex" justify="center">
            <el-col :span="10">
                    <canvas id="mycanvas" width="500px" height="400px"  style="float:right">
                    </canvas>
            </el-col>

            <el-col :span="4" >
                  <div class="imageslist-column" v-show="objectlist.length > 1">
                        <button  class="imgleftdiv-column" @click="clickupbtn"> 
                          <i class="el-icon-arrow-up"></i>      
                        </button>

                        <div class="content-column" id="imglist-column">
                          <div class="imgborder-column" v-for="(item, index) in objectlist" :key="index" :class="curobjectinx==index? 'active' : '' ">
                              <img  class="img-column"  :src="previewimgsrc" @click="selectobject(index)"
                                alt="" :style="objectimgstyle(index)">
                          </div> 
                            
                        </div>              

                        <button class="imgrightdiv-column" @click="clickdownbtn"> 
                          <i class="el-icon-arrow-down"></i>      
                        </button>
                      </div>
            </el-col>

        </el-row>
        
    </div>
</template>

<style scoped>
.imgleftdiv-column,
.imgrightdiv-column {
  background-color: #34353d;
  width: 76px;
  height: 15px;
  border: 0px;
  outline: none;
}
.imgleftdiv-column {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: 1px;
}

.imgrightdiv-column {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-top: 1px;
}

.imageslist-column {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 96px;
  justify-content: space-between;
  align-items: center;
  /*height:100px;*/
  /*background-color: rgb(26, 26, 32);
  border: 1px solid gray;*/
}

.imageslist-column .imgborder-column{
  width: 76px;
  height: 76px;
  margin-top: 2px;
  margin-bottom: 2px;
  overflow: hidden;
  cursor: pointer;
}
.imageslist-column .imgborder-column.active {
  border: 1px solid #1989fa;
  opacity: 1;
}

.imageslist-column .content-column::-webkit-scrollbar {
  display: none;
}

.imageslist-column .content-column {
  width: 76px;
  height: 375px;
  overflow-y: scroll;
  overflow-x: auto;
  white-space: nowrap;
}

/*----------------------------------*/

.imgleftdiv,
.imgrightdiv {
  background-color: #34353d;
  width: 25px;
  height: 100px;
  border: 0px;
  outline: none;
}
.imgleftdiv {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-right: 1px;
}

.imgrightdiv {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-left: 1px;
}

.imageslist {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 120px;
  justify-content: space-between;
  align-items: center;
  /*height:100px;*/
  background-color: black;
  /*border: 1px solid gray;*/
}

.imageslist .img {
  cursor: pointer;
  width: 100px;
  height: 100px;
  opacity: 0.3;
  margin-left: 2px;
  margin-right: 2px;
}

.imageslist .img:hover {
  /*opacity: 0.6;*/
  opacity: 1;
}

.imageslist .img.active {
  /*border: 1px solid #1989fa;
  opacity: 1;*/
}

.imageslist .content::-webkit-scrollbar {
  display: none;
}

.imageslist .content {
  width: 100%;
  height: 100px;
  overflow-x: scroll;
  overflow-y: auto;
  white-space: nowrap;
}

canvas {
  margin: 3px;
  border: 1px solid gray;
}
</style>



<script>
import myaxios from "@/utils/myaxios";

export default {
  data() {
    return {
      imglists: [
        "https://ors35x6a7.qnssl.com/atshow-face-detection-20170703/1.png?imageslim",
        "https://ors35x6a7.qnssl.com/atshow-face-detection-20170703/2.png?imageslim",
        "https://ors35x6a7.qnssl.com/atshow-face-detection-20170703/3.png?imageslim",
        "https://ors35x6a7.qnssl.com/atshow-face-detection-20170703/4.png?imageslim",
        "https://ors35x6a7.qnssl.com/atshow-face-detection-20170703/5.png?imageslim",
        "https://ors35x6a7.qnssl.com/atshow-face-detection-20170703/6.png?imageslim",
        "https://ors35x6a7.qnssl.com/atshow-face-detection-20170703/7.png?imageslim",
        "https://ors35x6a7.qnssl.com/atshow-face-detection-20170703/8.png?imageslim",
        "https://ors35x6a7.qnssl.com/atshow-face-detection-20170703/9.png?imageslim",
        "https://ors35x6a7.qnssl.com/atshow-face-detection-20170703/10.png?imageslim"
      ],
      curimgindex: 0,

      objectlist: [],
      curobjectinx: 0,
      previewimgsrc: "",
      imgpreview: null,

      imgwidth: 0,
      imgheight: 0,
      tempobjectlist: null,
      tmpcurimgtag: 0
    };
  },
  methods: {
    clickleftbtn() {
      let item = document.getElementById("imglist");
      let x = item.scrollLeft;
      x -= 100;
      x < 0 ? (x = 0) : x;

      item.scrollLeft = x;
    },
    clickrightbtn() {
      let item = document.getElementById("imglist");
      let x = item.scrollLeft;
      x += 100;
      if (x + item.clientWidth > item.scrollWidth) {
        x = item.scrollWidth - item.clientWidth;
      }
      item.scrollLeft = x;
    },
    clickupbtn() {
      let item = document.getElementById("imglist-column");
      let x = item.scrollTop;
      x -= 100;
      x < 0 ? (x = 0) : x;

      item.scrollTop = x;
    },
    clickdownbtn() {
      let item = document.getElementById("imglist-column");
      let x = item.scrollTop;
      x += 100;
      if (x + item.clientHeight > item.scrollHeight) {
        x = item.scrollHeight - item.clientHeight;
      }
      item.scrollTop = x;
    },
    selectobject(index) {
      this.curobjectinx = index;
      this.drawresult();
    },
    clickimglist(index) {
      this.clear();

      this.curimgindex = index;
      this.imgpreview.onload = this.previewimgloaded;
      this.imgpreview.src = this.imglists[index];
      this.previewimgsrc = this.imglists[index];
      this.getfaceresult("image_url", this.imglists[index]);
    },
    previewimgloaded() {
      this.imgwidth = this.imgpreview.width;
      this.imgheight = this.imgpreview.height;
      console.log("img loaded", this, this.imgwidth);
      this.dealobjects(this.tmpcurimgtag);
    },
    dealobjects(tag) {
      if (
        tag == this.tmpcurimgtag &&
        this.tempobjectlist &&
        this.imgwidth &&
        this.imgheight
      ) {
        this.curobjectinx = 0;
        this.objectlist = [];
        // imgwidth and imgheight have got
        for (let inx = 0; inx < this.tempobjectlist.faces.length; inx++) {
          const item = this.tempobjectlist.faces[inx];          
          this.objectlist.push({
            left: item.face_rectangle.left,
            top: item.face_rectangle.top,
            width: item.face_rectangle.width,
            height: item.face_rectangle.height
          });
        }
        this.tempobjectlist = null;
      }
      this.drawresult();
    },
    getfaceresult(url, urldata) {
      let tag = ++this.tmpcurimgtag;

      // send axios
      let formdata = new FormData();
      formdata.append("api_key", "YHlShnzToe1pqvnTXTYupi5Fst0kMnkC");
      formdata.append("api_secret", "fYBk6261SF-NjJUrJjp1-rZBO8p9JJBq");
      formdata.append("return_landmark", 0);
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
          this.tempobjectlist = res;
          this.dealobjects(tag);
        });
    },
    clear() {
      this.objectlist = [];
      this.tempobjectlist = null;
      this.imgwidth = 0;
      this.imgheight = 0;
      this.curobjectinx = 0;
    },
    drawresult() {
      if (this.imgwidth && this.imgheight) {
        let canvas = document.getElementById("mycanvas");
        let ctx = canvas.getContext("2d");
        let dstwidth = canvas.width;
        let dstheight = canvas.height;
        ctx.clearRect(0, 0, dstwidth, dstheight);

        let xscale = dstwidth / this.imgwidth;
        let yscale = dstheight / this.imgheight;
        let scale = xscale > yscale ? yscale : xscale;
        if (xscale > 1 && yscale > 1) {
          scale = 1;
        }
        let xmargin = parseInt((dstwidth - this.imgwidth * scale) / 2);
        let ymargin = parseInt((dstheight - this.imgheight * scale) / 2);

        ctx.drawImage(
          this.imgpreview,
          0,
          0,
          this.imgwidth,
          this.imgheight,
          xmargin,
          ymargin,
          parseInt(this.imgwidth * scale),
          parseInt(this.imgheight * scale)
        );

        if (this.objectlist.length > 0) {
          for (let index = 0; index < this.objectlist.length; index++) {
            const element = this.objectlist[index];
            let x = xmargin + parseInt(element.left * scale);
            let y = ymargin + parseInt(element.top * scale);
            let w = parseInt(element.width * scale);
            let h = parseInt(element.height * scale);
            ctx.lineWidth = 2;
            if (this.objectlist.length > 1 && this.curobjectinx == index) {
              ctx.lineWidth = 4;
            }
            ctx.strokeStyle = "#1989fa";
            console.log(x, y, w, h);
            ctx.strokeRect(x, y, w, h);
          }
        }
        /*ctx.strokeRect();
        context.lineWidth = 1;
        context.strokeStyle = "#333";*/
      }
    },
    objectimgstyle(index) {
      
      let item = this.objectlist[index];
      let left = item.left + item.width / 2 - 38;
      let top = item.top + item.height / 2 - 38;   
      
      return `margin: -${top}px 0px 0px -${left}px;` // 上 右下左
    }
  },
  mounted() {
    this.imgpreview = new Image();
    this.clickimglist(0);
  }
};
</script>

