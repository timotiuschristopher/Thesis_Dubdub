"use strict";
const express = require("express");
let router = express.Router();
var path = require("path");

// let reqPath = path.join(__dirname,'../graph.htm')

router
.route('')
.get(function (req, res) {
  res.sendFile(path.join(__dirname + '/../index.htm')) //__dirname + 'C:/Users/Debby/Documents/thesistrial/thesistrial/graph.htm'
})

module.exports = router;