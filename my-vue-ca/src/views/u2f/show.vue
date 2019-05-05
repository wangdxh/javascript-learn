<template>    
    <div>
        <el-row>
            <el-col :span="18" :offset="3">
                <el-card class="box-card">
                    <div slot="header">
                        <h3>FIDO U2F register</h3>
                    </div>
                    <img src="/images/u2freg.png" alt="">
                </el-card>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="18" :offset="3">            
                <center>
                    <el-button type="primary" size="medium" @click="u2fregister"> 从服务器获取注册申请信息</el-button>
                </center>

                <span>req data:</span>
                <br>
                <textarea name="" id="" readonly v-text="regreq"></textarea>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="18" :offset="3">
                <br>
                <center>
                    <el-button type="primary" size="medium" @click="clientgeneratekeys"> 客户端生成新的公私钥等信息</el-button>
                </center>
                <span>客户端生成key 等信息:</span>
                <br>
                <textarea name="" id="" readonly v-text="reqclientgeneratekey"></textarea>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="18" :offset="3">
                <br>
                <center>
                    <el-button type="primary" size="medium" @click="u2fendregister"> 完成注册</el-button>
                </center>
                <span>服务器返回的信息
                    <br>（public key 和 key handler 不需要返回 这里用于调试）:</span>
                <br>
                <textarea name="" id="" readonly v-text="regresponse"></textarea>
            </el-col>
        </el-row>


        <el-row>
            <el-col :span="18" :offset="3">
                <el-card class="box-card">
                    <div slot="header">
                        <h3>FIDO U2F login</h3>
                    </div>
                    <img src="/images/u2flogin.png" alt="">
                </el-card>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="18" :offset="3">

                <center>
                    <el-button type="primary" size="medium" @click="u2fauth"> 从服务器获取某用户的keyhandler</el-button>
                </center>

                <span>req data:</span>
                <br>
                <textarea name="" id="" readonly v-text="authreq"></textarea>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="18" :offset="3">
                <br>
                <center>
                    <el-button type="primary" size="medium" @click="authclientsign"> 客户端对chanlleage进行签名</el-button>
                </center>
                <span>客户端针对本次认证生成的签名信息:</span>
                <br>
                <textarea name="" id="" readonly v-text="authclientsignresult"></textarea>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="18" :offset="3">
                <br>
                <center>
                    <el-button type="primary" size="medium" @click="u2fendrauth"> 完成认证</el-button>
                </center>
                <span>服务器返回的信息:</span>
                <br>
                <textarea name="" id="" readonly v-text="authresponse"></textarea>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import u2fApi from "u2f-api";
import axios from "axios";

export default {
  data() {
    return {
      regreq: "test",
      reqclientgeneratekey: "test2",
      regresponse: "test3",

      authreq: "test4",
      authclientsignresult: "test5",
      authresponse: "test6"
    };
  },
  methods: {
    u2fregister() {
      console.log("u2fregister");
      axios
        .get("https://172.16.64.92:4430/u2f/reg")
        .then(res => {
          //const registrationRequest = res.data.registrationRequest
          // Retrieve this from hitting the registration challenge endpoint
          this.regreq = res.data;
        })
        .catch(err => {
          alert(err);
        });
    },
    // next
    clientgeneratekeys() {
      alert("please insert u2f key，灯闪烁的时候，用手指触摸卡上的金属区域");
      console.log("u2f device over register");
      const registrationRequest = this.regreq.registrationRequest;
      u2fApi.register(
        registrationRequest
      ).then(registrationResponse => {
          console.log("u2f device over register");
          this.reqclientgeneratekey = registrationResponse;
        })
      .catch(err=>{
          alert(err)
      });
    },

    u2fendregister() {
      // Send this registration response to the registration verification server endpoint
      let registrationResponse = this.reqclientgeneratekey;
      axios
        .post("https://172.16.64.92:4430/u2f/reg", { registrationResponse })
        .then(res => {
          this.regresponse = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
    },

    u2fauth() {
      axios
        .get("https://172.16.64.92:4430/u2f/auth")
        .then(res => {
          //const registrationRequest = res.data.registrationRequest
          // Retrieve this from hitting the registration challenge endpoint
          this.authreq = res.data;
        })
        .catch(err => {
          alert(err);
        });
    },
    authclientsign() {
      alert("please insert u2f key，灯闪烁的时候，用手指触摸卡上的金属区域");
      const authRequest = this.authreq.authRequest;
      // Retrieve this from hitting the authentication challenge endpoint
      u2fApi.sign(
        authRequest
      ).then(authResponse => {
          // Send this authentication response to the authentication verification server endpoint
          this.authclientsignresult = authResponse;
        })
      .catch(err => {
          alert(err);
        });
    },
    u2fendrauth() {
      let authResponse = this.authclientsignresult;
      axios
        .post("https://172.16.64.92:4430/u2f/auth", { authResponse })
        .then(res => {
          this.authresponse = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
    }
  },
  mounted() {
    console.log("ok");
    /*this.$message({
          showClose: true,
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });*/
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 400px;
  resize: none;
}
</style>
