
const db = require('../models');
const User = db.user;

const authVerify = (req,res,next) => {
    //check user name given or not
    if(!req.body.name) {
        return res.status(400).send({message: `Name is not provided !!!`})
    }

    // check username id given or not
    if(!req.body.username) {
        return res.status(400).send({message: 'Username is not provided'});
    }
    // check user email is given or not
    if(!req.body.email) {
        return res.status(400).send({message: `Email is not provided`})
    }

    // check password
    if(!req.body.password) {
        return res.status(400).send({message: `Password is not provided`});
    }
    
    // check if the email is already registered
    User.findOne({
        where: {email: req.body.email}
    }).then(user => {
        if(user) {
            return res.status(401).send({message: `Email is already registered`});
        }
    })

    // check if the username is already registered
    User.findOne({
        where: {username: req.body.username}
    }).then(user => {
        if(user) {
            return res.status(401).send({message: `Username is already registered`});
        }
        next();
    })
}

const verify = {
    authVerify
}
module.exports = {
    verify
}