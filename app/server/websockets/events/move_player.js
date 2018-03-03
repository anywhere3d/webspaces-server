// doublechok@anywhere3d-FRNK1:~/webspaces.app/app/server/websockets/events/move_player.js

//  CAUTION:
//  Always use 'try', 'catch(err)' block statement,
//  or (promises?) to avoid application crashing in errors.
//  Data to be always in json format.

var debugMode = true;


module.exports = function(client){

    client.on('player move', function(data){

    //  debugMode && console.log("debugLog:\tReceiving 'player move' message from client:", client.id );
        
        data.clientid = client.id;
    //  debugMode && console.log("player move data:", data );

        debugMode && console.log("##debugLog:\tBroadcasting player move:", 
        data.clientid, "to every player in room:", data.namespace, "except:", client.id);

    //  Broadcast.
        client.broadcast.to(data.namespace).emit('player move', data);

    });

    client.on('player jump', function(data){

    //  debugMode && console.log("debugLog:\tReceiving 'player jump' message from client:", client.id );
        
        data.clientid = client.id;
    //  debugMode && console.log("player jump data:", data );

        debugMode && console.log("debugLog:\tBroadcasting player jump:", 
        data.clientid, "to every player in room:", data.namespace, "except:", client.id);

    //  Broadcast.
        client.broadcast.to(data.namespace).emit('player jump', data);

    });



//  DEPRECATED SOCKET EVENTS:



    client.on('directionChange', function(data){

        debugMode && console.log( 
        "\t##DEPRECATED## Event 'directionChange' is deprecated:", "Use 'player move' event instead. ##DEPRECATED##" );

    //  debugMode && console.log("debugLog:\tReceiving 'directionChange' message from client:", client.id );
        
        data.clientid = client.id;
    //  debugMode && console.log("directionChange data:", data );

        debugMode && console.log("debugLog:\tBroadcasting directionChange:", 
        data.clientid, "to every player in room:", data.namespace, "except:", client.id);

    //  Broadcast.
        client.broadcast.to(data.namespace).emit('directionChange', data);

    });

    client.on('move player', function(data){

        debugMode && console.log( 
        "\t##DEPRECATED## Event 'move player' has renamed to 'player move' ##DEPRECATED##" );

    //  debugMode && console.log("debugLog:\tReceiving 'move player' message from client:", client.id );
        
        data.clientid = client.id;
    //  debugMode && console.log("move player data:", data );

        debugMode && console.log("debugLog:\tBroadcasting move player:", 
        data.clientid, "to every player in room:", data.namespace, "except:", client.id);

    //  Broadcast.
        client.broadcast.to(data.namespace).emit('move player', data);

    });

    client.on('startJumping', function(data){

        debugMode && console.log( 
        "\t##DEPRECATED## Event 'startJumping' has renamed to 'player jump' ##DEPRECATED##" );

    //  debugMode && console.log("debugLog:\tReceiving 'startJumping' message from client:", client.id );
        
        data.clientid = client.id;
    //  debugMode && console.log("startJumping data:", data );

        debugMode && console.log("debugLog:\tBroadcasting startJumping:", 
        data.clientid, "to every player in room:", data.namespace, "except:", client.id);

    //  Broadcast.
        client.broadcast.to(data.namespace).emit('startJumping', data);

    });

    client.on('endJumping', function(data){

        debugMode && console.log( 
        "\t##DEPRECATED## Event 'endJumping' is deprecated ##DEPRECATED##" );

    //  debugMode && console.log("debugLog:\tReceiving 'endJumping' message from client:", client.id );
        
        data.clientid = client.id;
    //  debugMode && console.log("endJumping data:", data );

        debugMode && console.log("debugLog:\tBroadcasting endJumping:", 
        data.clientid, "to every player in room:", data.namespace, "except:", client.id);

    //  Broadcast.
        client.broadcast.to(data.namespace).emit('endJumping', data);

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

