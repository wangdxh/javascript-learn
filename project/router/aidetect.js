const axios = require("axios");
const express = require("express");

var router = express.Router();

router.post("/face", (req, res) => {
  console.log(req.body);
  axios
    .post("https://atlab.ai/v1/face/detect", data=req.body)
    .then(rsp => {
      console.log(rsp.data);
      return res.json(rsp.data);
    })
    .catch(err => {
      console.log(err);
      return res.json({
        code:404,
        message:err.message
      })
    });
});



module.exports = router;
