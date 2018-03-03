// doublechok@anywhere3d-FRNK1:~/webspaces.app/app/server/websockets/client_connection.js

//  CAUTION:
//  Always use 'try', 'catch(err)' block statement,
//  or (promises?) to avoid application crashing in errors.
//  Data to be always in json format.

var debugMode = true;


module.exports = function(socket){

    socket.sockets.on("connection", function(client){
    //  debugMode && console.log("\tclinet:", client);    
        debugMode && console.log("##\tNew client has connected:", client.id);

        client.on("join", function (data) {
        //  We are using room of socket.io.
            client.join(data.namespace, function(err){
                if (err){
                    console.log("joinError:", err);
                } else {
                    debugMode && console.log("debugLog:\tClient", client.id, "has joined to room:", data.namespace);
                //  Send a new guest chat message to all clients.
                    client.broadcast.to(data.namespace).emit("message", "A guest has just joined in our worldspace.");
                    client.emit("message", ["You have joined to", data.namespace, "worldspace."].join(" "));
                }
            }); 
        });


    //  Default events.
        require(__dirname + "/client_message.js")(client);
        require(__dirname + "/client_error.js")(client);
        require(__dirname + "/client_disconnect.js")(client);

    //  Player events.
        require(__dirname + "/events/new_player.js")(client);
        require(__dirname + "/events/add_player.js")(client);
        require(__dirname + "/events/move_player.js")(client);
        require(__dirname + "/events/chat_message.js")(client);
    
    //  require(__dirname + "/events/remote_player_controls.js")(client);
    //  require(__dirname + "/events/idle_player.js")(client);
    //  require(__dirname + "/events/start_walk.js")(client);








    //  Send a new guest chat message to all clients.
        client.broadcast.emit("message", "A new guest has just arrived in our world.");
        client.emit("message", "Wellcome to our world.");
    });

};

//  Find player by ID.

function getPlayerById(id) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    };
    return false;
};


//  SOCKET USAGE:
//  socket.sockets.emit('message', data) send to everyone in every room including client.
//  socket.sockets.to('this room').emit('message', data) send to everyone including client if client is in this room
//  client.emit('message', data) send only to client.
//  client.broadcast.emit('message', data) send to everyone except client.
//  client.to('this room').emit('message', data) send only to client if client is in this room.
//  client.broadcast.to('this room').emit('message', data) send to everyone in this room except client.
//  client.broadcast.to(otherClient.id).emit('message', data) send to specific client only (private chat).


//  How to send a message to a particular client with socket.io.
//  source: "https://stackoverflow.com/questions/17476294/how-to-send-a-message-to-a-particular-client-with-socket-io"
/*
//  You can use socket.io rooms. From the client side emit an event 
//  ("join" in this case, can be anything) with any unique identifier (email, id).

//  Client Side:

    var socket = io.connect('http://localhost:6080');
    socket.emit('join', {email: user1@example.com});

//  Now, from the server side use that information to create an unique room for that user

//  Server Side:

    var io = require('socket.io').listen(80);

    io.sockets.on('connection', function (socket) {
        socket.on('join', function (data) {
            socket.join(data.email); // We are using room of socket io
        });
    });

//  So, now every user has joined a room named after user's email. 
//  So if you want to send a specific user a message you just have to.

//  Server Side:

    io.sockets.in('user1@example.com').emit('new_msg', {msg: 'hello'});

//  The last thing left to do on the client side is listen to the "new_msg" event.

//  Client Side:

    socket.on("new_msg", function(data) {
        alert(data.msg);
    }

//  I hope you get the idea.
*/
