"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var PORT = 3000;
app.get("/", function (req, res) { res.send("Hello from server!"); });
app.listen(PORT, function () { return console.log("\u26A1Server is running here \uD83D\uDC49 https://localhost:".concat(PORT)); });
//console.log('Hello World!')
