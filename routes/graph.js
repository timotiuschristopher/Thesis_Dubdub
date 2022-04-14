"use strict";
const express = require("express");
let router = express.Router();

// let reqPath = path.join(__dirname,'../graph.htm')

router
.route('')
.get(function (req, res) {
  res.sendFile('C:/Users/Debby/Documents/thesistrial/thesistrial/graph.htm') //__dirname + 'C:/Users/Debby/Documents/thesistrial/thesistrial/graph.htm'
})

module.exports = router;