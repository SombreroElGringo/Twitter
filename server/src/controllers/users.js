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