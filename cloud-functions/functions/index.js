const functions = require("firebase-functions")
const firebase = require("firebase-admin")
const config = require("./config.json")
const onNewPhoneNumberCreated = require("./handlers/onNewPhoneNumberCreated")

firebase.initializeApp(functions.config().firebase)

exports.onNewPhoneNumberCreated = functions.database.ref("/usersByPhoneNumber/{phoneNumber}").onCreate((event) => onNewPhoneNumberCreated({ firebase, config, event }))
