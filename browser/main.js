var app = require('app');
var BrowserWindow = require('browser-window');

// Maybe enable crash reporting later or something
// require('crash-reporter').start();

// GARBAGE COLLECTOR?!?!?!
var mainWindow = null;

var express = require('express');
var expSrv = express();
expSrv.use("/", express.static("./client"));

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});


app.on('ready', function () {
  var server = expSrv.listen(15257, function () {
    mainWindow = new BrowserWindow({width: 800, height: 600, frame: false});

    //var index = 'file://' + __dirname + '/client/index.html';
    //this is dumb, there's gotta be a better way
    var index = "http://127.0.0.1:15257/index.html";
    console.log("Loading file " + index);
    mainWindow.loadUrl(index);

    mainWindow.on('closed', function () {
      // Left this comment from the example code for maybe info later
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
  });
});