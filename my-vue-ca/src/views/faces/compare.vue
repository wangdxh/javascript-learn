<template>
    <div style="height:100vh;background-color:black;">
        <br>

        <el-row>
          <el-col :span="20" :offset="2">
            <imagelist :imglists="imglists" @clickitem="clickimglist"></imagelist>
          </el-col>
        </el-row>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

        <el-row :gutter="10" >
          
          <el-col :span="10" :offset="2">
              <canvasrect imagesrc=""  style="width:100%;height:300px"></canvasrect>
          </el-col>
          <el-col :span="10">
              <canvasrect imagesrc=""  style="width:100%;height:300px"></canvasrect>
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
      
    };
  },
  methods: {
    
    clickimglist(index) {
      //this.setbigimg(this.imglists[index]);
    }
  }
};
</script>

<style scoped>

</style>
