const {Router} = require('express');
const routes = Router();
const UserController = require('./controllers/UserController');

routes.get('/health', (req, res) => {
    res.status(200).json({message: "Routes is ok!"});
})

routes.post('/user', UserController.created);
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.updated);
routes.delete('/user/:id', UserController.delete);

module.exports = routes;