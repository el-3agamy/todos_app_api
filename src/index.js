var express = require("express");
var cors = require("cors");
var app = express();
var PORT = 3000;
// cors middleware :
app.use(cors());

//app listening on port : 
app.listen(PORT, function () {
    console.log("server work on port ".concat(PORT));
});
