<template>
    <div>
        <h3>dashboard</h3>
        <br>
        <div style="width=100%;height:70vh">
                 
            <el-amap
                ref="map"
                vid="amapDemo"
                :center="center"
                :zoom="zoom">
                <!-- 在地图上标记点 -->
                <el-amap-marker
                v-for="(marker,index) in markers"
                :key="index"
                :position="marker" >
                </el-amap-marker>
                <!-- 坐标点 -->
                <el-amap-marker vid="amapDemo" :position="center"></el-amap-marker>
                
                <!-- 放置图片 -->
                <el-amap-ground-image v-for="(groundimage,index) in groundimages"
                :url="groundimage.url"
                :key="index"
                :bounds="groundimage.bounds"
                :events="groundimage.events">
                </el-amap-ground-image>
                
                 <el-amap-text v-for="(text,index) in texts"
                :text="text.text"
                :key="index"
                :offset="text.offset"
                :position="text.position"
                :events="text.events">
                </el-amap-text>
            </el-amap>
            
        </div>
        
    </div>
</template>

<script>
// 高德
// 引入vue-amap
import VueAMap from "vue-amap";
//Vue.use(VueAMap);

export default {
  created() {
    // 初始化vue-amap
    VueAMap.initAMapApiLoader({
      // 高德的key
      key: "160cab8ad6c50752175d76e61ef92c50",
      // 插件集合
      plugin: [
        "AMap.Autocomplete",
        "AMap.PlaceSearch",
        "AMap.Scale",
        "AMap.OverView",
        "AMap.ToolBar",
        "AMap.MapType",
        "AMap.PolyEditor",
        "AMap.CircleEditor"
      ],
      // 高德 sdk 版本，默认为 1.4.4
      v: "1.4.4"
    });
  },
  data() {
    return {
      zoom: 10,
      center: [121.59996, 31.197646], // 中心位置
      markers: [
        [121.49996, 31.297646],
        [121.40018, 31.197622],
        [121.49991, 31.207649]
      ],
      groundimages: [
        /*{
          url:
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
          bounds: [[121.5273285, 31.21515044], [122.9273285, 32.31515044]],
          events: {
            click() {
              alert("click groundimage");
            }
          }
        }*/
      ],
      texts: [
        {
          position: [121.5273285, 31.27515044],
          text: `<b>this is test from <br> Mr wangxiaohui</b>`,
          offset: [0, 0],
          events: {
            click: () => {
              //alert('click text')
            }
          }
        }
      ]
    };
  }
};
//from https://blog.csdn.net/qq_24147051/article/details/84763265
</script>