// doublechok@anywhere3d-FRNK1:~/webspaces.app/app/server/websockets/client_error.js

//  CAUTION:
//  Always use 'try', 'catch(err)' block statement,
//  or (promises?) to avoid application crashing in errors.
//  Data to be always in json format.

var debugMode = true;

module.exports = function(client){

    client.on('error', function(e){

        try {

            debugMode && console.log( "\tReceived error from client:", this.id, "ERROR:", e );  // "client" is "this".

        } catch(err) {

            console.log("client.on('error') error:", err);
        }

    });

};
