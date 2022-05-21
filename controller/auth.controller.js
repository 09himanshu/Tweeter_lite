const bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
    const obj = {
        name: req.body.name,
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
        res.status(500).sens({message: `Error occur at user creation ${err}`});
    })
}