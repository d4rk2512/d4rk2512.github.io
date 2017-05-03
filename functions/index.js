//-----Init-----//
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

//-----Functions-----//
// const message = require('./message')

// exports.addMessage = message.addMessage
// exports.makeUppercase = message.makeUppercase
const RoomManager = require('./Logic/RoomManager.js')

exports.Room_onCreateRoom = RoomManager.onCreateRoom