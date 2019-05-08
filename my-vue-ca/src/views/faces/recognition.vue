<template>
    <div style="height:100vh;background-color:black;">
        <br>        

        <el-row>
          <el-col :span="20" :offset="2">
            <imagelist :imglists="imglists" @clickitem="clickimglist"></imagelist>
          </el-col>
        </el-row>
        <br>


        <el-row>
            <el-col :span="12" :offset="6">
                    
                  <canvasrect :imagesrc="previewimgsrc" :objectlist="objectlist" :curobjectindex="curobjectinx"
                  style="width:100%;height:400px;">
              
                  </canvasrect>
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

      objectlist: [],
      curobjectinx: 0,
      previewimgsrc: "",
      
      tmpcurimgtag: 0
    };
  },
  methods: {    
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
    },
    clickimglist(index) {
      this.clear();
      this.previewimgsrc = this.imglists[index];
      this.getfaceresult("image_url", this.imglists[index]);
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

          this.clear()
          // imgwidth and imgheight have got
          for (let inx = 0; inx < res.faces.length; inx++) {
            const item = res.faces[inx];          
            this.objectlist.push({
              left: item.face_rectangle.left,
              top: item.face_rectangle.top,
              width: item.face_rectangle.width,
              height: item.face_rectangle.height
            });
          }

        });
    },
    clear() {
      this.objectlist = [];
      this.curobjectinx = 0;
    },
    
    objectimgstyle(index) {
      
      let item = this.objectlist[index];
      let left = item.left + item.width / 2 - 38;
      let top = item.top + item.height / 2 - 38;   
      
      return `margin: -${top}px 0px 0px -${left}px;` // 上 右下左
    }
  },
  mounted() {
    this.clickimglist(0);
  }
};
</script>

