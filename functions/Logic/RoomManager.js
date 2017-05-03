const functions = require('firebase-functions')
let roomManager = function () { }

//Logic

//Listeners
roomManager.prototype.onCreateRoom = functions.database.ref('/room_list/create_queue/{roomId}').onWrite(event => {
    // Only edit data when it is first created.
    if (event.data.previous.exists() || !event.data.exists()) {
        return;
    }

    // const roomInfo = event.data.val();
    let options = {
        game_name: 'Nations',
        game_settings: {},
        status: 'waiting',
        players: ['Foxx']
    }
    return event.data.adminRef.parent.child(event.params.roomId).set(options).then(event.data.adminRef.remove);
})

roomManager.prototype.JoinRoom = function (roomId) {

}

exports = new roomManager();