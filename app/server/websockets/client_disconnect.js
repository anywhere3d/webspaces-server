// doublechok@anywhere3d-FRNK1:~/webspaces.app/app/server/websockets/client_disconnect.js

//  CAUTION:
//  Always use 'try', 'catch(err)' block statement,
//  or (promises?) to avoid application crashing in errors.
//  Data to be always in json format.

var debugMode = true;

module.exports = function(client){

    client.on('disconnect', function(){
    //  debugMode && console.log("debugLog:\tcurrent players length:", players.length );

    //  var removePlayer = getPlayerById(client.id);
    //  debugMode && console.log("debugLog:\tremovePlayer:", removePlayer );

    //  Remove player from collection.
        
        var removedPlayer = {"clientid": client.id};

        PlayersRemove( removedPlayer ).then( function( result ){

        //  Disconnect completed.

            debugMode && console.log("debugLog:\tClient", client.id, "has disconnected:", result );            
            
            PlayersCount({});

        }).then(function(){

        //  Send delete player message to remaining clients.
        
            debugMode && console.log("debugLog:\tBroadcasting 'delete player'", 
            "clientid:", client.id, "message to remaining clients." );

            client.broadcast.emit('delete player', removedPlayer );
            
            
        });

    });

    function PlayersRemove(selectors){
        return new Promise( function( resolve, reject ){
            Players.remove(selectors, function(err, resultObj){
                if (err){ 
                    debugMode && console.log("Players remove failure:", err);
                } else {
                    debugMode && console.log("Players remove success:", resultObj.result);
                    resolve( resultObj.result );
                }
            });
        });
    }

    function PlayersCount(selectors){
        return new Promise( function( resolve, reject ){
            Players.count(selectors, function(err, num){
                if (err) {
                    debugMode && console.log("Players count failure:", err);
                } else {
                    debugMode && console.log("Current players count:", num, "\n");
                    resolve( num );
                }
            })
        });
    }

};

//  SOCKET USAGE:
//  socket.sockets.emit('message', data) send to everyone in every room including client.
//  socket.sockets.to('this room').emit('message', data) send to everyone including client if client is in this room
//  client.emit('message', data) send only to client.
//  client.broadcast.emit('message', data) send to everyone except client.
//  client.to('this room').emit('message', data) send only to client if client is in this room.
//  client.broadcast.to('this room').emit('message', data) send to everyone in this room except client.
//  client.broadcast.to(otherClient.id).emit('message', data) send to specific client only (private chat).

/*
Players.count(function(err, num){
    if (err) {
        debugMode && console.log("Players count failure:", err);
    } else {
        debugMode && console.log("Current players count:", num, "\n");
    }
})
*/


/*
//  Find player by ID.

function getPlayerById(id) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    };
    return false;
};
*/

/*
    //  Player not found.

        if (!removePlayer) {

            debugMode && console.log("debugLog:\tRemove player not found:", client.id);

            return;
        }
    
    //  Player found.

        debugMode && console.log("debugLog:\tRemove player found:", removePlayer.id);

    //  Remove player from players array.

        players.splice(players.indexOf(removePlayer), 1);
        debugMode && console.log("debugLog:\tPlayer:", client.id, "removed.");

        if (players.length > 0) {

        //  Broadcast removed player to connected clients.

            debugMode && console.log("debugLog:\tBroadcasting 'remove player' to all connected clients.");

            try {

                client.broadcast.emit("remove player", {id: client.id});
                debugMode && console.log("debugLog:\tremovePlayer:", removePlayer.id, "has send to everyone except:", client.id);

            } catch(err) {

            //  Send the error to this client only.
                console.log("client.on('disconnect') error:\n", 
                "cannot broadcast remove player to connected clients:\n", err);

            }

        //  Send a broadcast chat message to every connected client.

            try {
            
                var message = {
                    id:"system", 
                    name:"admin", 
                    text: removePlayer.username + " disconnected from world."
                };

                client.broadcast.emit( 'message', message );

            } catch(err) {

                console.log( "client.on('disconnect') error:\n",
                "cannot broadcast message to connected clients:\n", err );

            }

        }

    //  Disconnect completed.
        debugMode && console.log("debugLog:\tClient has disconnected:", client.id );
        debugMode && console.log("debugLog:\tcurrent players length:", players.length + "\n");
*/


