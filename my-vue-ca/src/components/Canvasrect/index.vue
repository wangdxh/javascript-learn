<template>
  <div ref="baba">
    <canvas ref="mycanvas"  @click="clickitem" :class="isactive ? 'active' : ''">

    </canvas>
  </div>
</template>

<script>
import ResizeObserver from "resize-observer-polyfill";

export default {
  name: "Canvasrect",
  data() {
    return {
      imgpreview: null,
      imgwidth: 0,
      imgheight: 0,
      ro: null
    };
  },
  props: {
    imagesrc: {
      type: String,
      require: true
    },
    objectlist: {
      type: Array,
      //required: true
      default: () => {
        return [];
      }
    },
    curobjectindex: {
      type: Number,
      default: -1
    },
    isactive: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    imagesrc(newValue, oldValue) {
      if (0 == oldValue.indexOf("blob:null")) {
        window.URL.revokeObjectURL(oldValue);
        console.log("clear old blob img src", oldValue);
      }

      // draw new
      this.imgwidth = 0;
      this.imgheight = 0;
      this.imgpreview.src = newValue;
    },
    curobjectindex(newValue, oldValue) {
      // draw
      this.redraw();
    },
    objectlist: {
      handler(newValue, oldValue) {
        this.redraw();
      },
      deep: true
    }
  },

  methods: {
    previewimgloaded() {
      this.imgwidth = this.imgpreview.width;
      this.imgheight = this.imgpreview.height;
      console.log("img loaded:", this.imagesrc, this.imgwidth, this.imgheight);
      this.redraw();
    },
    clickitem() {
      this.$emit("clickitem");
    },
    redraw() {
      let objlst = this.$props.objectlist;
      let curobjectinx = this.$props.curobjectindex;

      let canvas = this.$refs.mycanvas;
      let ctx = canvas.getContext("2d");
      let dstwidth = canvas.width;
      let dstheight = canvas.height;
      ctx.clearRect(0, 0, dstwidth, dstheight);

      if (this.imgwidth && this.imgheight) {
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

        if (objlst.length > 0) {
          for (let index = 0; index < objlst.length; index++) {
            const element = objlst[index];
            let x = xmargin + parseInt(element.left * scale);
            let y = ymargin + parseInt(element.top * scale);
            let w = parseInt(element.width * scale);
            let h = parseInt(element.height * scale);
            ctx.lineWidth = 2;
            if (objlst.length > 1 && curobjectinx == index) {
              ctx.lineWidth = 4;
            }
            ctx.strokeStyle = "#1989fa";
            //console.log(x, y, w, h);
            ctx.strokeRect(x, y, w, h);
          }
        }
      }
    }
  },
  mounted() {
    this.imgpreview = new Image();
    this.imgpreview.onload = this.previewimgloaded;
    this.imgpreview.onerror = () => {
      consolg.log("load image error", this.imgpreview.src);
    };

    this.$refs.mycanvas.width =
      this.$refs.mycanvas.parentNode.clientWidth || 300; //this.$props.width
    this.$refs.mycanvas.height =
      this.$refs.mycanvas.parentNode.clientHeight || 150;

    this.ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { left, top, width, height } = entry.contentRect;
        if ("DIV" == entry.target.nodeName) {
          if (this.$refs.mycanvas) {
            console.log(width, height, entry.target);
            //alert(`width ${width} height ${height} ${entry.contentRect}` )
            this.$refs.mycanvas.width = width || 300; //this.$props.width
            this.$refs.mycanvas.height = height || 150;
            this.$nextTick(this.redraw);
          }
        }
        /*console.log(`Element's size: ${width}px x ${height}px`);
        console.log(`Element's paddings: ${top}px ; ${left}px`);*/
      }
    });

    this.ro.observe(this.$refs.baba);
  },
  beforeDestroy() {
    if (this.ro) {
      this.ro.unobserve(this.$refs.baba);
    }
  }
};
</script>

<style scoped>
canvas {
  /*margin: 3px;*/
  border: 1px solid gray;
}

canvas.active {
  border: 2px solid #1989fa;
}
</style>
