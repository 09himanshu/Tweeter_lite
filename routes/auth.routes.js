const controller = require('../controller/auth.controller');
const {verify} = require('../middleware');

module.exports = (app) => {
    // Signup routes
    app.post('/signup',[verify.verify.authVerify], controller.signup);

    // Signin routes
    app.post('/signin', controller.signin);
}