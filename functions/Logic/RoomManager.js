const functions = require('firebase-functions')
const admin = require('firebase-admin')

let roomManager = function () { }

//Logic

//Listeners
exports.onCreateRoom = functions.database.ref('/room_list/create_queue/{roomId}').onWrite(event => {
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
    return event.data.adminRef.root.child('/room_list/' + event.params.roomId).set(options).then(() => {
        admin.database().ref('/room_list/create_queue/' + event.params.roomId).remove()
    })
})