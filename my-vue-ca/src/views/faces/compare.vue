<template>
    <div style="height:100vh;background-color:black;">
        <br>

        <el-row>
          <el-col :span="20" :offset="2">
            <imagelist :imglists="imglists" @clickitem="clickimglist" ref="imagelist"></imagelist>
          </el-col>
        </el-row>
        
        
        <h5 style="color:white; text-align:center">{{compareresult}}</h5>
        
        
        

        <el-row :gutter="20"  type="flex" justify="center">
          
          <el-col :span="8" v-for="(item, index) in bigimglist" :key="index">
              <canvasrect :imagesrc="item" :isactive="index == curbigimginx"
                style="width:100%;height:375px" @clickitem="clickcanvas(index)"
                :objectlist="objectlist[index]">
              </canvasrect>
          </el-col>
          <!--<el-col :span="8">
              <canvasrect imagesrc=""  style="width:100%;height:375px"></canvasrect>
          </el-col>-->


        </el-row>

    </div>
</template>

<script>
import axios from 'axios'

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
      resulttxt: "比对结果：阿aaa",
      bigimglist: ["", ""],
      objectlist:[[],[]],
      curbigimginx: 0,

      curimgindex: 0,
      tmpcurimgtag: 0,
      compareresult: ""
    };
  },
  methods: {
    clickcanvas(index) {
      this.curbigimginx = index;
      //select item im imagelist
      this.$refs.imagelist.selectitem(this.bigimglist[index]);
    },
    clickimglist(index) {
      this.curimgindex = index;

      // can not just modify array
      this.$set(this.bigimglist, this.curbigimginx, this.imglists[index]);

      // start compare
      this.facecompare()
    },
    facecompare() {
      let tag = ++this.tmpcurimgtag;

      // send axios
      let formdata = new FormData();
      formdata.append("api_key", "YHlShnzToe1pqvnTXTYupi5Fst0kMnkC");
      formdata.append("api_secret", "fYBk6261SF-NjJUrJjp1-rZBO8p9JJBq");

      //formdata.append("image_url","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555339400025&di=61165fb9d80035d89ad21450ab403966&imgtype=0&src=http%3A%2F%2Fsports.sina.com.cn%2Fn.sinaimg.cn%2Fsports%2Ftransform%2F283%2Fw650h433%2F20190216%2FSt1O-htacqwv8021210.jpg")
      formdata.append("image_url1", this.bigimglist[0]);
      formdata.append("image_url2", this.bigimglist[1]);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post(
          "https://api-cn.faceplusplus.com/facepp/v3/compare",
          formdata,
          config
        )
        .then(res => {
          console.log(res.data);
          if (tag != this.tmpcurimgtag) {
            console.log("error tag: ", tag, this.tmpcurimgtag);
            return;
          }
          //this.comparejsondata = res.data;
          let similar = "完全不像";
          if (res.data.confidence > 95) {
            similar = "非常相似";
          } else if (res.data.confidence > 80) {
            similar = "有点像";
          }
          this.compareresult =
            "最后的比分是：" + res.data.confidence + "\n" + similar;
          //[[{}] [{}] ]
          this.$set(this.objectlist, 0, [res.data.faces1[0].face_rectangle])
          this.$set(this.objectlist, 1, [res.data.faces2[0].face_rectangle])
        })
        .catch(err => {
          console.log(tag, this.tmpcurimgtag, err);
          alert(err.message);
        });
    }
  },
  mounted() {
    this.bigimglist = [
      this.imglists[0],
      this.imglists[this.imglists.length - 2]
    ];
    this.facecompare();
  }
};
</script>

<style scoped>
</style>
