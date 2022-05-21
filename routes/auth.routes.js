const controller = require('../controller/auth.controller');

module.exports = (app) => {
    app.post('/signup', controller.signup);
}