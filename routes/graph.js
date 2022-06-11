// Graph router back-end code
// by: T.C. Tantokusumo
// 2022

"use strict";
var express = require("express");
var app = express();
let router = express.Router();
var path = require('path');

router
.route('')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '/../graph.htm')) //__dirname + 'C:/Users/Debby/Documents/thesistrial/thesistrial/graph.htm'
})

module.exports = router;