const Sequelize = require('sequelize');
const config = require('../config/server.config');

const sequelize = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: Number(config.pool.max),
        min: Number(config.pool.min),
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = require('./user.model')(sequelize, Sequelize);
db.tweet = require('./tweet.model')(sequelize, Sequelize);
db.follower = require('./follower.model')(sequelize, Sequelize);
db.following = require('./following.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);

// Relationship between user and roles
db.role.belongsToMany(db.user, {
    through: 'user_role',
    foreignKey: 'roleId',
    otherKey: 'userId',
})
db.user.belongsToMany(db.role, {
    through: 'user_role',
    foreignKey: 'userId',
    otherKey: 'roleId',
})

// User relationship with other tables
db.user.hasMany(db.tweet);
db.user.hasMany(db.follower);
db.user.hasMany(db.following);

module.exports = db;