// app.js
/**
    * Node.js Anywhere3d Realtime Multiuser app.
    * Copyright (c) 2016-2018 anywhere3d.com
**/

var path = require('path');
var http = require('http');
var io = require('socket.io');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var MongoClient = require("mongodb").MongoClient;
var expressHandlebars = require('express-handlebars');

var app = express();

app.locals.pretty = true;
app.set('port', process.env.PORT || 8080);
app.set('trust proxy', 'loopback');

app.set('views', __dirname + '/views/');
var handlebars = expressHandlebars.create({
    defaultLayout: "default",
});

app.engine(".html", expressHandlebars({extname: ".html"}));
app.engine("handlebars", handlebars.engine);
app.set("view engine", ".html");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));
app.use(express.static('~/anywhere3d.com'));

var dbUser = process.env.DB_URER || 'DATABASEUSER';
var dbPass = process.env.DB_PASS || 'XXXXXXXXXXXXXXX';
var dbHost = process.env.DB_HOST || 'XXX.XXX.XXX.XXX';
var dbPort = process.env.DB_PORT || 27017;
var dbName = process.env.DB_NAME || 'database_NAME';
var dbURL = ["mongodb://", dbUser, ":", dbPass, "@", dbHost, ":", dbPort, "/", dbName].join("");

app.use(session({
    secret: "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx",
    proxy: true,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: dbURL })
}));

//  ROUTES.

    require(__dirname + '/app/server/routes.js')(app);


//  ERROR HANDLERS.
/*
app.use(function(req, res) {
    console.log("Error 404: Page Not Found:", req.url);
    res.status(404);
    res.render("404", {layout: false, title: "404: Page Not Found"});
});

app.use(function(err, req, res, next) {
    console.log("Error 500: Internal Server Error:", err);
    res.status(500);
    res.render("500", {layout: false, title:"Internal Server Error", error: err});
});
*/


//  HTTP SERVER.

var server = http.createServer(app);

server.listen(app.get("port"), function(){

    console.log("\n\tExpress server listening on port", app.get("port") + ".\n" );

    MongoClient.connect(dbURL, function (error, database) {
        if (error) { console.log("MongoClient Connection Error:", error); throw error; }

        db = database;

        console.log("\tCollections:\n");
        Users = db.collection('users');            console.log("\t\t", Users.s.name );
        Objects = db.collection('objects');        console.log("\t\t", Objects.s.name );
        Geometries = db.collection('geometries');  console.log("\t\t", Geometries.s.name );
        Materials = db.collection('materials');    console.log("\t\t", Materials.s.name );
        Textures = db.collection('textures');      console.log("\t\t", Textures.s.name );
        Images = db.collection('images');          console.log("\t\t", Images.s.name );
        Bones = db.collection('bones');            console.log("\t\t", Bones.s.name );
        Files = db.collection('files');            console.log("\t\t", Files.s.name );
        Assets = db.collection('assets');          console.log("\t\t", Assets.s.name );
        Outfits = db.collection('outfits');        console.log("\t\t", Outfits.s.name );
        Avatars = db.collection('avatars');        console.log("\t\t", Avatars.s.name );
        Scenes = db.collection('scenes');          console.log("\t\t", Scenes.s.name );
        Poses = db.collection('poses');            console.log("\t\t", Poses.s.name );
        Animations = db.collection('animations');  console.log("\t\t", Animations.s.name );
        TestCollection = db.collection('test');    console.log("\t\t", TestCollection.s.name );
        Snapshots = db.collection('snapshots');    console.log("\t\t", Snapshots.s.name );
        Players = db.collection('players');        console.log("\t\t", Players.s.name );

        console.log("\n\tMongoClient connected to database", db.databaseName + ".\n");

    //  Players collection cleanup.
        PlayersRemove({}).then(function(){ PlayersCount({}); });

    });

});



//  WEBSOCKET SERVER.

//  Socket.io websocket server.

    var socket = io.listen(server);

//  Configure Socket.IO

//  Use WebSockets only.
    socket.set("transports", ["websocket"]);
    socket.set("flash policy server", false);

//  Restrict log output.
    socket.set("log level", 1);

//  Start listening for events.
    require(__dirname + "/app/server/websockets/client_connection.js")(socket);




//  PLAYERS COLLECTION.

//  Players collection cleanup.
    function PlayersRemove(selectors){
        return new Promise( function( resolve, reject ){
            Players.remove(selectors, function(err, resultObj){
                if (err){
                    console.log("Players cleanup failure:", err);
                } else {
                    console.log("Players cleanup success:", resultObj.result.ok);
                    console.log("Players cleanup deleted:", resultObj.result.n);
                    resolve ( resultObj.result );
                }
            });
        });
    }

    function PlayersCount(selectors){
        return new Promise( function( resolve, reject ){
            Players.count(selectors, function(err, num){
                if (err) {
                    console.log("Players count failure:", err);
                } else {
                    console.log("Current players counted:", num, "\n");
                    resolve( num );
                }
            })
        });
    }
