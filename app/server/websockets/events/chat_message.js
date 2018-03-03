// doublechok@anywhere3d-FRNK1:~/anywhere3d.app/server/websockets/events/chat_message.js

var debugMode = true;

//  Always use 'try', 'catch(err)' block statement,
//  to avoid application crashing in errors.
//  Data to be always in json string format.

module.exports = function(client){

    client.on('chat message', function(data){
    //  debugMode && console.log("this:", this); // "client" is "this"

        debugMode && console.log( 
        "##debugLog:\tReceiving chat message from client:", client.id, "data:", data );

    //  Add this client id to chat message data.
        data.clientid = client.id;

        try {

        //  Broadcast message object to connected clients.
            debugMode && console.log(
            "##debugLog:\tBroadcasting chat message to all connected clients in room:", data.namespace);

            client.broadcast.to(data.namespace).emit('chat message', data); // send to everyone to this room except client.
            client.emit('echo message', data);                              // send only to client.

        } catch(err) {

        //  Send the error to this client only.
            client.emit( 'error', "ERROR: " + err );
            console.log("!!!ERROR!!!\tclient.on('chat message'):", err);
        }
    });

};

//  SOCKET USAGE:
//  socket.sockets.emit('message', data) send to everyone in every room including client.
//  socket.sockets.to('this room').emit('message', data) send to everyone including client if client is in this room
//  client.emit('message', data) send only to client.
//  client.in('this room').emit('message', data) send only to client if client is in this room.
//  client.to('this room').emit('message', data) send only to client if client is in this room.
//  client.broadcast.emit('message', data) send to everyone except client.
//  client.broadcast.to('this room').emit('message', data) send to everyone in this room except client.
//  client.broadcast.to(otherClient.id).emit('message', data) send to specific client only (private chat).







