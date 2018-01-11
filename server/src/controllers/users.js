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
    const data = ['user1', 'user2'];

    return res.json({ 
        users: data,
    });
};