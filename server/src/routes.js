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
    app.post('/users', usersController.addUser);
    app.get('/users/:id([a-z0-9]{12,})', usersController.getUser);
    app.post('/users/:id([a-z0-9]{12,})', usersController.editUser);
    app.delete('/users/:id([a-z0-9]{12,})', usersController.deleteUser);

    /**
     * Posts routes
     */
    app.get('/posts', postsController.getPosts);
    app.post('/posts', postsController.addPost);
    app.get('/posts/:id([a-z0-9]{12,})', postsController.getPost);
    app.post('/posts/:id([a-z0-9]{12,})', postsController.editPost);
    app.delete('/posts/:id([a-z0-9]{12,})', postsController.deletePost);

    return app;
}