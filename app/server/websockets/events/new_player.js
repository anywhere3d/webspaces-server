var debugMode = true;

module.exports = function(client){

    client.on('new player', function(data){

        debugMode && console.log("debugLog:\tReceiving 'new player' message from client:", client.id );

    //  Add new player to the collection.
        
        data.clientId = client.id;
        debugMode && console.log("new player data:", data );

        function PlayersUpsert(){
            return new Promise( function( resolve, reject ){
                Players.update({"id":client.id}, data, {upsert: true}, function(err, resultObj){
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
                    } else {
                        debugMode && console.log("Players find results:", results.length );
                        resolve( results );
                    }
                });
            });
        }

        PlayersUpsert().then( function( upserted ){

            debugMode && console.log("debugLog:\tNew player has added to players collection:", upserted);
            
            client.broadcast.emit('add player', data);

        }).then( function(){

            PlayersFind({"namespace":data.namespace}).then(function( results ){
                for (var i = 0; i < results.length; i++){
                    if (results[i].clientId != client.id){
                        client.to(data.namespace).emit("add player", results[i]);
                        debugMode && console.log("debugLog:\tSending 'add player' message to client:", client.id);
                    }
                }
            });

        });

    });

};
