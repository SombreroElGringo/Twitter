/**
 * Controllers (route handlers).
 */
const usersController = require('./controllers/users');
const postsController = require('./controllers/posts');


module.exports = function(app, passport) {
    /**
     * Users routes
     */
    app.get('/users', usersController.getUsers);

    /**
     * Posts routes
     */
    app.get('/posts', postsController.getPosts);
    
    return app;
}