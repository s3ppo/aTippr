var functions = require('firebase-functions');
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendNotificationChat = functions.database.ref('/games/{gameid}/chat/{chatid}')
    .onWrite(event => {
        const message = event.data.current.val();

        if(!message.hasOwnProperty('user')) {
            return console.log('no sending User found');
        }

        const senderUid = message.user;
        const gameid = event.params.gameid;
        const promises = [];

        const thisUserPromise = admin.database().ref(`/users/${senderUid}`).once('value');
        const allUsersPromise = admin.database().ref(`/users/`).orderByChild('gameid').equalTo(gameid).once('value');

        return Promise.all([thisUserPromise, allUsersPromise]).then(results => {
            const thisUserSnapshot = results[0];
            const allUsersSnapshot = results[1];

            const payload = {
                notification: {
                    title: 'Chat',
                    body: `${thisUserSnapshot.child('firstName').val()} ${thisUserSnapshot.child('lastName').val()} wrote a new chat message.`,
                    icon: 'ic_notification'
                }
            };

            const tokens = [];
            allUsersSnapshot.forEach(user => {
                if(user.hasChild('firebaseToken') && user.key != thisUserSnapshot.key) {
                    tokens.push(user.child('firebaseToken').val());
                }
            })
            if(tokens.length <= 0) {
                return console.log('No receiver tokens found')
            }

            return admin.messaging().sendToDevice(tokens, payload).then(response => {
                // For each message check if there was an error.
                const tokensToRemove = [];
                response.results.forEach((result, index) => {
                    const error = result.error;
                    if (error) {
                        console.error('Failure sending notification to', tokens[index], error);
                        // Cleanup the tokens who are not registered anymore.
                        if (error.code === 'messaging/invalid-registration-token' ||
                            error.code === 'messaging/registration-token-not-registered') {
                            //tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove()); //TODO
                        }
                    }
                });
                return Promise.all(tokensToRemove);
            })

    })
})