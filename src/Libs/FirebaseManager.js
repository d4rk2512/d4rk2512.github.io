import Firebase from 'firebase'

Firebase.initializeApp({
    apiKey: "AIzaSyClbHYndVsLVMqgHOR30oaT7aiLQOfoWCw",
    authDomain: "hardcorers-4bbf3.firebaseapp.com",
    databaseURL: "https://hardcorers-4bbf3.firebaseio.com",
    storageBucket: "hardcorers-4bbf3.appspot.com",
    messagingSenderId: "933640995514"
})

export var auth = Firebase.auth()
export var db = Firebase.database()