const admin = require('firebase-admin');
const _ = require('lodash');
const db = admin.database();

/** 
 *  Notifications page, return a JSON with all notifications in the db
 * @function getNotifications
 * @name /notifications
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.getNotifications = (req, res, next) => {

    const uid = req.query.uid;
    const ref = db.ref('/notifications');

    ref.once('value', function(snapshot) {
        let data = [];
        snapshot.forEach(function(childSnapshot) {
        
            db.ref(`/posts/${childSnapshot.val().post_id}`)
                .once('value', function(post){
                    
                    let target_username = post.val().username;
                    let target_uid = post.val().user_uid;
                    
                    if (uid) {
                        if (uid === target_uid) {

                            data.push({
                                id: childSnapshot.key,
                                post_id: childSnapshot.val().post_id,
                                user_uid: childSnapshot.val().user_uid,
                                target_username:  target_username,
                                target_uid: target_uid,
                                type:  childSnapshot.val().type,
                                createdAt:  childSnapshot.val().createdAt,
                            });
                        }
                    } else {

                        data.push({
                            id: childSnapshot.key,
                            post_id: childSnapshot.val().post_id,
                            user_uid: childSnapshot.val().user_uid,
                            target_username:  target_username,
                            target_uid: target_uid,
                            type:  childSnapshot.val().type,
                            createdAt:  childSnapshot.val().createdAt,
                        });
                    }
                }).then(() =>{
                    data = _.sortBy(data, 'createdAt').reverse();
                    if(data.length > 0) {
                        return res.status(200).json({ 
                            notifications: data,
                        });
                    }
                });
        });
        
        if (data === []) {
            return res.json({ 
                notifications: [],
            });
        }

    }, errorObject => {

		console.log(`[Error] ${errorObject}`);
    });
};