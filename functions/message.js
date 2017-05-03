const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.addMessage = functions.https.onRequest((req, res) => {
    admin.database().ref('/messages').push({ original: req.query.text }).then(snapshot => {
        res.redirect(303, snapshot.ref)
    })
})

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onWrite(event => {
    // Only edit data when it is first created.
    if (event.data.previous.exists()) {
        return;
    }
    // Exit when the data is deleted.
    if (!event.data.exists()) {
        return;
    }
    // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val();
    console.log('Uppercasing', event.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return event.data.ref.parent.child('uppercase').set(uppercase);
})