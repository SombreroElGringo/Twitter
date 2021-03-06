const admin = require('firebase-admin');
const _ = require('lodash');
const db = admin.database();

/** 
 *  Users page, return a JSON with all users in the db
 * @function getUsers
 * @name /users
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.getUsers = (req, res, next) => {

    const ref = db.ref('users');

    ref.once('value', function(snapshot) {
        let data = [];
        snapshot.forEach(function(childSnapshot) {
            
            data.push({
                id: childSnapshot.key,
                username:  childSnapshot.val().username,
                description:  childSnapshot.val().description,
                createdAt:  childSnapshot.val().createdAt,
            });
        })
        data = _.sortBy(data, 'createdAt').reverse();
        return res.json({ 
            users: data,
        });
    }, errorObject => {

		console.log(`[Error] ${errorObject}`);
    });
};


/** 
 *  Users page, get a user by id
 * @function getUser
 * @name /users/:id
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.getUser = (req, res, next) => {

    const id = req.params.id; 

    const ref = db.ref(`/users/${id}`);

    ref.once('value', function(snapshot) {
  
        const data = {
            id: snapshot.key,
            username:  snapshot.val().username,
            description: snapshot.val().description,
            createdAt:  snapshot.val().createdAt,
        };

        return res.json({ 
            user: data,
        });
    }, errorObject => {

		console.log(`[Error] ${errorObject}`);
    });
};


/** 
 *  Users page, add a user in the db
 * @function addUser
 * @name /users
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.addUser = (req, res, next) => {
    
    if (!req.body.uid ||!req.body.email || !req.body.username || !req.body.token) {

        let params = req.body.email ? '' : 'email';
        params += req.body.uid ? '' : params === '' ? 'uid' : ', uid';
        params += req.body.username ? '' : params === '' ? 'username' : ', username';
        params += req.body.token ? '' : params === '' ? 'token' : ', token';

        return res.status(400).json({
			code: 400,
			status: 'error',
			message: `${params} cannot be empty!`,
		});
    }

    const ref = db.ref('users');
    var usersRef = ref.child(req.body.uid);
    usersRef.set({
        email: req.body.email,
        username: req.body.username,
        description: '',
        token: req.body.token,
        createdAt: Date.now(),
    });

    return res.status(201).json({
        code: 201,
        status: 'success',
        message: 'User created!'
    });
};


/** 
 *  Users page, edit a user in the db
 * @function editUser
 * @name /users/:id
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.editUser = (req, res, next) => {
    
    const id = req.params.id; 
    const description = req.body.description; 

    const ref = db.ref(`/users/${id}`);

    ref.once('value', function(snapshot) {
        
        if (!snapshot.key) {

            return res.status(404).json({
                code: 404,
                status: 'error',
                message: 'User not found!',
            });
        }
        
        db.ref(`/users/${id}`)
            .set(description);

        return res.json({
            code: 200,
            status: 'success',
            message: 'User edited',
        });
    }, errorObject => {

		console.log(`[Error] ${errorObject}`);
    }); 
};


/** 
 *  Users page, delete a user in the db
 * @function deleteUser
 * @name /users/:id
 * @method DELETE
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.deleteUser = (req, res, next) => {

    const id = req.params.id;

    db.ref(`/users/${id}`)
        .remove();
    return res.json({
        code: 200,
        status: 'success',
        message: 'User deleted',
    });
};