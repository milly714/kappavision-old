/// ts:ref=node.d.ts
/// <reference path="./defs/node.d.ts"/> ///ts:ref:generated
/// ts:ref=Twitch.ts
/// <reference path="./Twitch.ts"/> ///ts:ref:generated
/// ts:ref=TwitchIRC.ts
/// <reference path="./TwitchIRC.ts"/> ///ts:ref:generated

console.log("ALdJKL;kfjalsdjflkajsdf");

var app:any = require('app');
var BrowserWindow:any = require('browser-window');
var fs = require('fs');

// Maybe enable crash reporting later or something
// require('crash-reporter').start();

// GARBAGE COLLECTOR?!?!?!
var mainWindow:any = null;

//Useful datas
var dataPath = app.getPath("appData") + "/.kappavision/";
try {
  fs.mkdirSync(dataPath);
} catch (e) {
  //Don't care!
}

var twitch = new Twitch(dataPath, () => mainWindow.loadUrl('http://127.0.0.1:15257/index.html'));

var express:any = require('express');
var expSrv = express();

expSrv.get('/test', function (req, res) {
  res.send(dataPath);
});

expSrv.get('/twitchlogin.html', function (req, res) {
  res.sendFile('twitchloginexternal.html', {root: './client'});
});

expSrv.get('/token', function(req, res) {
  res.send("");
  twitch.login(req.query.access_token);
});

expSrv.get('/index.html', function (req, res) {
  if (twitch.loggedIn) {
    res.sendFile('index.html', {root: './client'});
  } else {
    res.sendFile('twitchlogin.html', {root: './client'});
    require('open')(twitch.loginUrl());
    //twitch.login("");
  }
});

expSrv.use('/', express.static('./client'));

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});


app.on('ready', function () {
  var server = expSrv.listen(15257, function () {
    mainWindow = new BrowserWindow({width: 950, height: 550, frame: false});

    //var index = 'file://' + __dirname + '/client/index.html';
    //this is dumb, there's gotta be a better way
    var index = 'http://127.0.0.1:15257/index.html';
    console.log('Loading file ' + index);
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