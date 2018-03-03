// doublechok@anywhere3d-FRNK1:~/webspaces.app/app/server/websockets/events/new_player.js

//  CAUTION:
//  Always use 'try', 'catch(err)' block statement,
//  or (promises?) to avoid application crashing in errors.
//  Data to be always in json format.

var debugMode = true;


module.exports = function(client){

    client.on('new player', function(data){

        debugMode && console.log("debugLog:\tReceiving 'new player' message from client:", client.id );

    //  Add new player to the collection.
        
        data.clientid = client.id;
        debugMode && console.log("new player data:", data );

        PlayersUpsert().then( function( upserted ){

            debugMode && console.log("debugLog:\tNew player has added to players collection:", upserted);

        }).then( function(){

            debugMode && console.log("debugLog:\tBroadcasting add player:", data.clientid, 
            "to every player in room:", data.namespace, "except:", client.id);
            client.broadcast.to(data.namespace).emit('add player', data);

        }).then( function(){

            PlayersFind({"namespace":data.namespace}).then(function( results ){
            //  client.to(data.namespace).emit("exist players", results);
                for (var i = 0; i < results.length; i++){
                    if (results[i].clientid != client.id){

                        debugMode && console.log("debugLog:\tSending add player:", 
                        results[i].clientid, "message to client:", client.id);
                        client.emit('add player', results[i]);
                        
                    }
                }
            });

        });

        function PlayersUpsert(){
            return new Promise( function( resolve, reject ){
                Players.update({"clientid":client.id}, data, {upsert: true}, function(err, resultObj){
                    if (err){
                        debugMode && console.log("Players upsert failure:", err);
                    } else {
                        debugMode && console.log("Players upsert success:", resultObj.result);
                        resolve( resultObj.result.upserted );
                    }
                });
            });
        }

        function PlayersFind( selectors ){
            return new Promise( function( resolve, reject ){
                Players.find( selectors ).toArray(function(err, results){
                    if (err){
                        debugMode && console.log("Players find error:", err);
                        reject( err );
                    } else {
                        debugMode && console.log("Players find results:", results.length );
                        resolve( results );
                    }
                });
            });
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
