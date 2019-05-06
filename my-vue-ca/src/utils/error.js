import { MessageBox, Message, Alert} from "element-ui";

export default {
  message: err => {
    console.error(err);
    Message({
      message: err.message,
      type: "error",
      duration: 5 * 1000
    });
  },
  log: err => {
    console.error(err);
  },
  alert:(msg, cb)=>{
    MessageBox.alert(msg, "kedacom", { confirmButtonText: "确定" }).then(cb)
  }  
};
