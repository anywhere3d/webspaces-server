// doublechok@anywhere3d-FRNK1:~/webspaces.app/app/server/websockets/client_message.js

//  CAUTION:
//  Always use 'try', 'catch(err)' block statement,
//  or (promises?) to avoid application crashing in errors.
//  Data to be always in json format.

var debugMode = true;

module.exports = function(client){

    client.on('message', function(data){
    //  debugMode && console.log("this:", this); // "client" is "this"

        try {
        
            debugMode && console.log(
                "\tReceived message from client:", client.id,
                "data.length:", data.length
            );

        //  debugMode && console.log(data);

            var message = {
                "id": this.id,
                "data": data
            };

        //  Broadcast message object to other connected clients.
            debugMode && console.log("\tBroadcasting message to all connected clients.");
            this.broadcast.emit('message', message);

        //  Debuging for  Errors.
        //  if (debugMode) throw "Developer Debug Error.";

        } catch(err) {

        //  Send the error to this client only.
            this.emit( 'error', "ERROR: " + err );
            console.log("client.on('message'):", err);
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
