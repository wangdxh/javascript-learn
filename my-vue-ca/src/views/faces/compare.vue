<template>
    <div>
        <div class="imageslist">

            <el-button class="btn btn-info btn-sm h-75" @click="clickleftbtn"> &lt;</el-button>

            <div class="outer-container">
                <div class="inner-container" id="imglist">
                    <div class="content">
                        <img v-for="(item, index) in imglists" :key="index" class="img m-1" :class="curimgindex==index? 'active' : '' " :src="item" @click="clickimglist(index)"
                            alt="">
                    </div>
                </div>
            </div>

            <el-button size="mini" @click="clickrightbtn"> &gt;</el-button>

        </div>
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
    clickimglist(index) {
      this.curimgindex = index;
      //this.setbigimg(this.imglists[index]);
    }
  }
};
</script>

<style scoped>
.imageslist {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  /*height:100px;*/
  background-color: rgb(179,179,179);
  margin: 2px 2px 2px 2px;
}

.imageslist .img {
  cursor: pointer;
  width: 76px;
  height: 76px;
  opacity: 0.3;
  margin:2px 2px 2px 2px;
}

.imageslist .img:hover {
  opacity: 0.6;
}

.imageslist .img.active {
  border: 1px solid #1989fa;
  opacity: 1;
}

.outer-container,
.content {
  width: 500px;
  height: 80px;
}

.outer-container {
  position: relative;
  overflow: hidden;
}

.inner-container {
  position: absolute;
  left: 0;
  overflow-x: scroll;
  overflow-y: auto;
}

.content {
  white-space: nowrap;
}
</style>
