const admin = require('firebase-admin');
const db = admin.database();
const User = require('../models/User');

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

    User.find()
        .then(data => {

        return res.json({ 
            users: data,
        });
    })
    .catch(err => {

		return res.status(404).json({
			code: 404,
			status: 'error',
			message: `Bad Request!\n ${err}`,
        })
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

    User.findOne({_id: new ObjectId(id)})
        .then(data => {

        return res.json({ 
            user: data,
        });
    })
    .catch(err => {

		return res.status(404).json({
			code: 404,
			status: 'error',
			message: `User not found!`,
        })
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
        token: req.body.token,
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
	
	User.findOne({_id: new ObjectId(id)}).then(user => {
			
        if (!user) {

            return res.status(404).json({
                code: 404,
                status: 'error',
                message: 'User not found!',
            });
        }
			
		const params = req.body;
		const POSSIBLE_KEYS = ['description'];
			
		let queryArgs = {};
			
        for (key in params) {
            if (~POSSIBLE_KEYS.indexOf(key)) {
                queryArgs[key] = params[key];
            }
        }
			
        if (!queryArgs) {
            let err = new Error('Bad request');
            err.status = 400;
            return Promise.reject(err);
        }
			
        User.update({_id: new ObjectId(id)}, {$set: queryArgs}).exec().then(err => {
            res.json({
                code: 200,
                status: 'success',
                message: 'User edited',
            });
        })
        .catch(err => {
            return next(err);
        });
    })
    .catch(err => {
        return next(err);
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

    User.findOne({_id: new ObjectId(id)}).then(user => {
        
        if (!user) {

            return res.status(404).json({
                code: 404,
                status: 'error',
                message: 'User not found!',
            });
        }

        User.remove({_id: new ObjectId(id)}).then(err => {
            res.json({
                code: 200,
                status: 'success',
                message: 'User deleted!',
            });
        })
        .catch(err => {
            return next(err);
        });
    })
    .catch(err => {
        return next(err);
    });
};