<template>
    <div style="height:100vh;background-color:black;">
        <br>
        <el-row>
            <el-col :span="20" :offset="2">
                <div class="imageslist" style="padding:2px">
                    <el-button class="btn btn-info btn-sm h-75" @click="clickleftbtn"> &lt;</el-button>

                    
                            <div class="content" id="imglist">
                                <img v-for="(item, index) in imglists" :key="index" class="img m-1" :class="curimgindex==index? 'active' : '' " :src="item" @click="clickimglist(index)"
                                    alt="">
                            </div>
                        

                    <el-button size="mini" @click="clickrightbtn"> &gt;</el-button>
                </div>

            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="12" :offset="5">
                    <canvas class="faceresult">

                    </canvas>

            </el-col>

            <el-col :span="4" >
                <div class="imageslist-column">
                    <el-button style="height:10px;width:80px"  class="btn btn-info btn-sm h-75" @click="clickupbtn"> &lt;</el-button>
                        <div class="content-column" id="imglist-column">
                            <img v-for="(item, index) in imglists" :key="index" class="img-column" :class="curimgindex==index? 'active' : '' " :src="item" @click="clickimglist(index)"
                                alt="">
                        </div>                        
                    <el-button type="primary" @click="clickdownbtn"> &gt;</el-button>
                </div>
            </el-col>

        </el-row>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      imglists: [
        "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic28.jpg",
        "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic29.jpg",
        "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic30.jpg",
        "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic37.jpg",
        "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic32.jpg",
        "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic33.jpg",
        "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic34.jpg",
        "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic35.jpg",
        "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic36.jpg",
        "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic37.jpg"
      ],
      curimgindex: 0
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
    clickimglist(index) {
      this.curimgindex = index;
      //this.setbigimg(this.imglists[index]);
    }
  }
};
</script>

<style scoped>
.imageslist-column {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 96px;
  justify-content: space-between;
  align-items: center;
  /*height:100px;*/
  background-color: rgb(26,26,32);  
  border: 1px solid gray;
}

.imageslist-column .img-column {
  display: block;
  cursor: pointer;
  width: 76px;
  height: 76px;
  opacity: 0.3;
  margin-top:2px;  
  margin-bottom:2px;
}

.imageslist-column .img-column:hover {
  opacity: 0.6;
}

.imageslist-column .img-column.active {
  border: 1px solid #1989fa;
  opacity: 1;
}

.imageslist-column .content-column::-webkit-scrollbar{
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
  margin-left:2px;  
  margin-right:2px;
}

.imageslist .img:hover {
  opacity: 0.6;
}

.imageslist .img.active {
  border: 1px solid #1989fa;
  opacity: 1;
}

.imageslist .content::-webkit-scrollbar{
    display: none;
}

.imageslist .content {
  width: 88%;
  height: 100px;
  overflow-x: scroll;
  overflow-y: auto;
  white-space: nowrap;
}

.faceresult{
    width:95%;
    height:375px;
}
</style>
