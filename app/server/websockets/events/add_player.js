// doublechok@anywhere3d-FRNK1:~/webspaces.app/app/server/websockets/events/add_player.js

//  CAUTION:
//  Always use 'try', 'catch(err)' block statement,
//  or (promises?) to avoid application crashing in errors.
//  Data to be always in json format.

var debugMode = true;


module.exports = function(client){

    client.on('add player', function(data){

        debugMode && console.log("debugLog:\tReceiving 'add player' message from client:", client.id + "\nadd player data:", data);

        broadcastAddPlayer( data ).then( function(){
            
            debugMode && console.log( "debugLog:\tadd player:", client.id, "has send to everyone except:", client.id );

        }).catch( function(err){
            
            console.log("client.on('add player') error:\n", "cannot broadcast add player:", client.id + "\n", err );

        //  Send the error to this client only.
            client.emit( 'error', "ERROR: Cannot broadcast add player." );

        });

        function broadcastAddPlayer( data ){
            return new Promise(function(resolve, reject){
                debugMode && console.log("debugLog:\tBroadcasting 'add player' message to all connected clients in room:", data.namespace);
            //  client.broadcast.emit("add player", data);
                client.broadcast.to(data.namespace).emit("add player", data);
                resolve(); reject(err);
            })
        }

    });

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
    //  Broadcast new player to all connected clients.

        try {
        
        //  if (players.length > 0) {
    
            debugMode && console.log("debugLog:\tBroadcasting 'add player' message to all connected clients.");

            client.broadcast.emit("add player", data);
            
            debugMode && console.log(
            "debugLog:\tadd player:", client.id, 
            "has send to everyone except:", client.id );
        //  }                

        } catch(err) {

            console.log("client.on('add player') error:\n", 
            "cannot broadcast add player:", client.id, err );

        //  Send the error to this client only.
            client.emit( 'error', "ERROR: Cannot broadcast add player." );

        }
*/


/*
    //  Create the new player.

        var newPlayer;

        try {

            newPlayer = {
                "id": client.id,
            //  "username": data.username,
                "spacename": data.spacename,
                "nickname": data.nickname,
                "gender": data.gender,
                "position": data.position,     // array.
                "quaternion": data.quaternion, // array.
                "scale": data.scale
            };
    
            debugMode && console.log("debugLog:\tNew player created:", newPlayer);
            
        } catch(err) {

            console.log("client.on('new player') error:\n", "cannot create new player:", err );
        //  Send an error to this client only.
            client.emit( 'error', "ERROR: on new player: cannot create new player." );
            
        }


    //  New player not created.

        if (!newPlayer) { debugMode && console.log("debugLog:\tNew player did not created."); return; }
*/


/*
        var selectors = {
            "id": client.id, 
        //  "spacename": data.spacename
        };
*/

/*
        try {

        //  Add new player to players [memory] array.
            players.push(newPlayer);
            debugMode && console.log("debugLog:\tNew player has added to players list:", players.length + "\n");

        } catch(err) {

            console.log("client.on('new player') error:\n",
            "Cannot add new player", newPlayer.id, "to players list:\n", err );

        //  Send the error to this client only.
            client.emit( 'error', "ERROR: Cannot add new player to players list." );
        }
*/


