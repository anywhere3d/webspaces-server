var debugMode = true;


module.exports = function(client){

    client.on('add player', function(data){

        debugMode && console.log("debugLog:\tReceiving 'add player' message from client:", client.id );

    //  Broadcast new player to all connected clients.

        try {
        
        //  if (players.length > 0) {
    
            debugMode && console.log("debugLog:\tBroadcasting 'add player' message to all connected clients.");

            client.broadcast.emit("add player", data);
            
            debugMode && console.log(
            "debugLog:\tnewPlayer:", client.id, 
            "has send to everyone except:", client.id );
        //  }                

        } catch(err) {

            console.log("client.on('add player') error:\n", 
            "cannot broadcast add player:", client.id, err );

        //  Send the error to this client only.
            client.emit( 'error', "ERROR: Cannot broadcast add player." );

        }

    });

};
