/**
 * Controllers (route handlers).
 */
const usersController = require('./controllers/users');
const postsController = require('./controllers/posts');
const notificationsController = require('./controllers/notifications');
const indexController = require('./controllers/index');


module.exports = function(app, passport) {
    
    /**
     * Index
     */
    app.get('/', indexController.getIndex);

    /**
     * Users routes
     */
    app.get('/users', usersController.getUsers);
    app.post('/users', usersController.addUser);
    app.get('/users/:id([a-z0-9]{12,})', usersController.getUser);
    app.delete('/users/:id([a-z0-9]{12,})', usersController.deleteUser);
    app.post('/users/:id([a-z0-9]{12,}/description)', usersController.editUser);

    /**
     * Posts routes
     */
    app.get('/posts', postsController.getPosts);
    app.post('/posts', postsController.addPost);
    app.get('/posts/:id([a-z0-9]{12,})', postsController.getPost);
    app.post('/posts/:id([a-z0-9]{12,})', postsController.editPost);
    app.delete('/posts/:id([a-z0-9]{12,})', postsController.deletePost);
    app.post('/posts/:id([a-z0-9]{12,})/like', postsController.likePost);

    /**
     * Notifications routes
     */
    app.get('/notifications', notificationsController.getNotifications);

    return app;
}