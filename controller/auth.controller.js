const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/server.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// Handler for signup

exports.signup = (req, res) => {
    const obj = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        role: req.body.role,
    }
    User.create(obj).then(user => {
        if(req.body.role) {
            Role.findAll({
                where: {name:{ [Op.or]: req.body.role}} 
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.status(201).send(user);
                })
            })
        } else {
            user.setRoles([1]).then(() => {
                res.status(201).send(user);
            })
        }
    }).catch(err => {
        res.status(500).send({message: `Error occur at user creation ${err}`});
    })
}

// Handler for signin
exports.signin = (req, res) => {
    User.findOne({
        where : { email: req.body.email}
    }).then(user => {
        if(!user) {
            res.status(404).send({message: `USer not found`});
            return;
        }

        // verify Password
        let isValid = bcrypt.compareSync(req.body.password, user.password);
        if(!isValid) {
            res.status(401).send({message: `Invalid password`});
            return;
        }

        // Need to generate token
        let token = jwt.sign({email : user.email},config.secretkey,{
            expiresIn: 300
        });

        let authorities = [];
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++) {
                authorities.push('Role_'+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                roles: authorities,
                token: token,
            })
        })
    }).catch(err => {
        console.log('err occur at ======================',err);
        res.status(500).send({message: `Error occur at signin ${err}`})
    })
}