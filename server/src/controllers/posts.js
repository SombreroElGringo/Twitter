/** 
 *  Users page, return a JSON with all posts in the db
 * @function getPosts
 * @name /posts
 * @method GET
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.getPosts = (req, res, next) => {
    const data = ['post1', 'post2'];

    return res.json({ 
        posts: data,
    });
};