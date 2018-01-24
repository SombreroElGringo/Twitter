const md5 = require('md5');
const _ = require('lodash');
const admin = require('firebase-admin');
const db = admin.database();

/** 
 *  Posts page, return a JSON with all posts in the db
 * @function getPosts
 * @name /posts
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.getPosts = (req, res, next) => {

    const uid = req.query.uid;
    const ref = db.ref('posts');

    ref.once('value', function(snapshot) {
        let data = [];
        snapshot.forEach(function(childSnapshot) {
            
            if (uid) {
                if (uid === childSnapshot.val().user_uid) {
                    let likes = childSnapshot.val().likes ? Object.keys(childSnapshot.val().likes) : [];
                    data.push({
                        id: childSnapshot.key,
                        user_uid: childSnapshot.val().user_uid,
                        username:  childSnapshot.val().username,
                        text:  childSnapshot.val().text,
                        createdAt:  childSnapshot.val().createdAt,
                        likes,
                    });
                }
            } else {
                let likes = childSnapshot.val().likes ? Object.keys(childSnapshot.val().likes) : [];
                data.push({
                    id: childSnapshot.key,
                    user_uid: childSnapshot.val().user_uid,
                    username:  childSnapshot.val().username,
                    text:  childSnapshot.val().text,
                    createdAt:  childSnapshot.val().createdAt,
                    likes,
                });
            }
        })
        data = _.sortBy(data, 'createdAt').reverse();
        return res.json({ 
            posts: data,
        });
    }, errorObject => {

		console.log(`[Error] ${errorObject}`);
    });
};


/** 
 *  Posts page, get a post by id
 * @function getPost
 * @name /posts/:id
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.getPost = (req, res, next) => {

    const id = req.params.id; 

    const ref = db.ref(`/posts/${id}`);

    ref.once('value', function(snapshot) {
        
        let likes = snapshot.val().likes ? Object.keys(snapshot.val().likes) : [];
        const data = {
            id: snapshot.key,
            user_uid: snapshot.val().user_uid,
            username:  snapshot.val().username,
            text:  snapshot.val().text,
            createdAt:  snapshot.val().createdAt,
            likes,
        };

        return res.json({ 
            post: data,
        });
    }, errorObject => {

		console.log(`[Error] ${errorObject}`);
    });
};


/** 
 *  Posts page, like a post in the db
 * @function likePost
 * @name /posts/:id/like
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.likePost = (req, res, next) => {

    const uid = req.body.uid;
    const id = req.params.id;

    if (!uid || !id) {

        let params = id ? '' : 'id';
        params += uid ? '' : params === '' ? 'uid' : ', uid';

        return res.status(400).json({
			code: 400,
			status: 'error',
			message: `${params} cannot be empty!`,
		});
    }
    db.ref(`/posts/${id}/likes/${uid}`)
        .once('value')
        .then(snapshot => {
            let type = '';
            if (snapshot.val()) {
                db.ref(`/posts/${id}/likes/${uid}`)
                    .remove();
                type = 'unliked';
            } else {
                db.ref(`/posts/${id}/likes/${uid}`)
                    .set('like');
                type = 'liked';
            }

            db.ref(`/notifications`)
                .push({
                    type,
                    post_id: id,
                    user_uid: uid,
                    createdAt: Date.now(),
                });

            return res.status(200).json({
                code: 200,
                status: 'success',
                message: `Tweet ${type}!`
            });
        });
};


/** 
 *  Posts page, add a post in the db
 * @function addPost
 * @name /posts
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.addPost = (req, res, next) => {

    const user_uid = req.body.user_uid;
    const text = req.body.text;

    if (!user_uid || !text) {

        let params = user_uid ? '' : 'user_uid';
        params += text ? '' : params === '' ? 'text' : ', text';

        return res.status(400).json({
			code: 400,
			status: 'error',
			message: `${params} cannot be empty!`,
		});
    }

    const now = Date.now();
    let str = `_${user_uid}_${now}_`;
    const uid = md5(str);
    
    db.ref('/users/' + user_uid)
        .once('value')
        .then(snapshot => {
            const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            //console.log(`${username} tweeted!`);
            const ref = db.ref('posts');
            const postsRef = ref.child(uid);
            postsRef.set({
                text: text,
                user_uid: user_uid,
                username: username,
                likes: [],
                createdAt: now
            });

            return res.status(201).json({
                code: 201,
                status: 'success',
                message: 'Tweet created!'
            });
        });
};


/** 
 *  Posts page, edit a post in the db
 * @function editPost
 * @name /posts/:id
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.editPost = (req, res, next) => {
    
    const id = req.params.id; 
    const text = req.body.text; 

    const ref = db.ref(`/posts/${id}`);

    ref.once('value', function(snapshot) {
        
        if (!snapshot.key) {

            return res.status(404).json({
                code: 404,
                status: 'error',
                message: 'Post not found!',
            });
        }
        
        db.ref(`/posts/${id}`)
            .set(text);

        return res.json({
            code: 200,
            status: 'success',
            message: 'Post edited',
        });
    }, errorObject => {

		console.log(`[Error] ${errorObject}`);
    }); 
};


/** 
 *  Posts page, delete a post in the db
 * @function deletePost
 * @name /posts/:id
 * @method DELETE
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.deletePost = (req, res, next) => {

    const id = req.params.id;
    db.ref(`/posts/${id}`)
        .remove();
    return res.json({
        code: 200,
        status: 'success',
        message: 'Post deleted',
    });
};