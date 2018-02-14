var debugMode = true;

module.exports = function(socket){

    socket.sockets.on("connection", function(client){
    
        debugMode && console.log("\tNew client has connected:", client.id);

        socket.on("join", function (data) {
            socket.join(data.namespace); //  We are using room of socket io.
        });

    //  Default events.

    //  Player events.
        require(__dirname + "/events/new_player.js")(client);
        require(__dirname + "/events/add_player.js")(client);






    });

};
