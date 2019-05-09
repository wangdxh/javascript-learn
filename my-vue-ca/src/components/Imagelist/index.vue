<template>
  <div class="imageslist">
      <button class="imgleftdiv" @click="clickleftbtn">                
            <i class="el-icon-arrow-left"></i>
      </button>

        <div class="content" ref="imglist">
            <img v-for="(item, index) in imglists" :key="index" class="img"
                 :class="curimgindex==index? 'active' : '' " :src="item" @click="clickitem(index)"
                 alt="" ref="imgitem">
        </div>                                            

        <button class="imgrightdiv" @click="clickrightbtn">                
          <i class="el-icon-arrow-right"></i>                  
        </button>
  </div>
</template>

<script>
export default {
  name: "Imagelist",
  props: {
    hasactive: {
      type: Boolean,
      default: false
    },
    imglists: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      curimgindex: 0
    };
  },
  methods: {
    clickitem(index) {
      this.curimgindex = index;
      console.log("in child click", index);
      this.$emit("clickitem", index);
    },
    clickleftbtn() {
      let item = this.$refs.imglist;
      let x = item.scrollLeft;
      x -= 100;
      x < 0 ? (x = 0) : x;

      item.scrollLeft = x;
    },
    clickrightbtn() {
      let item = this.$refs.imglist;
      let x = item.scrollLeft;
      x += 100;
      if (x + item.clientWidth > item.scrollWidth) {
        x = item.scrollWidth - item.clientWidth;
      }
      item.scrollLeft = x;
    },
    selectitembyinx(index) {
      this.curimgindex = index;
    },
    selectitem(item) {
      let findinx = -1;
      for (let index = 0; index < this.imglists.length; index++) {
        if (this.imglists[index] === item) {
          findinx = index;
          break;
        }
      }
      if (findinx != -1) {
        this.$refs.imgitem[findinx].scrollIntoView()
        //document.getElementsByClassName("img")[findinx].scrollIntoView();
      }
      this.curimgindex = findinx;
    }
  }
};
</script>

<style scoped>
.imgleftdiv,
.imgrightdiv {
  background-color: #34353d;
  width: 25px;
  height: 104px;
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
  opacity: 0.6;
  /*opacity: 1;*/
}

.imageslist .img.active {
  border: 1px solid #1989fa;
  opacity: 1;
}

.imageslist .content::-webkit-scrollbar {
  display: none;
}


.imageslist .content {
  width: 100%;
  height: 104px;
  overflow-x: scroll;
  /*overflow-y: auto;*/
  white-space: nowrap;
  -ms-overflow-style: none;  
}
</style>
