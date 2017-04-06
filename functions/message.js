const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.addMessage = functions.https.onRequest((req, res) => {
    const original = req.query.text
    admin.database().ref('/messages').push({ original: original }).then(snapshot => {
        res.redirect(303, snapshot.ref)
    })
})

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onWrite(event => {
    const original = event.data.val()
    console.log('Uppercasing', event.params.pushId, original)
    const uppercase = original.toUpperCase()
    return event.data.ref.parent.child('uppercase').set(uppercase)
})