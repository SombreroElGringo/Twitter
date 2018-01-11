const Post = require('../models/Post');
const ObjectId = require('mongodb').ObjectID;

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

    Post.find()
        .sort({createdAt: -1})
        .then(data => {

        return res.json({ 
            posts: data,
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

    Post.findOne({_id: new ObjectId(id)})
        .then(data => {

        return res.json({ 
            post: data,
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
 *  Posts page, add a post in the db
 * @function addPost
 * @name /posts
 * @method POST
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function 
 */
exports.addPost = (req, res, next) => {

    if (!req.params.user_id) {
        return res.status(400).json({
			code: 400,
			status: 'error',
			message: 'user_id cannot be empty!',
		});
    }

    const post = new Post({
        user_id: req.params.user_id,
        text: req.params.text,
    });

    post.save().then(err => {

        return res.status(201).json({
            code: 201,
            status: 'success',
            message: 'Story created!'
        });
    }).catch(err => {

        return next(err);
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
	
	Post.findOne({_id: new ObjectId(id)}).then(post => {
			
        if (!post) {

            return res.status(404).json({
                code: 404,
                status: 'error',
                message: 'Post not found!',
            });
        }
			
		const params = req.body;
		const POSSIBLE_KEYS = ['text'];
			
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
			
        Post.update({_id: new ObjectId(id)}, {$set: queryArgs}).exec().then(err => {
            res.json({
                code: 200,
                status: 'success',
                message: 'Post edited',
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

    Post.findOne({_id: new ObjectId(id)}).then(post => {
        
        if (!post) {

            return res.status(404).json({
                code: 404,
                status: 'error',
                message: 'Post not found!',
            });
        }

        Post.remove({_id: new ObjectId(id)}).then(err => {
            res.json({
                code: 200,
                status: 'success',
                message: 'Story deleted!',
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