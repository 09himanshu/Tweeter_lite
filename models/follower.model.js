module.exports = (sequelize, Sequelize) => {
    const Follower = sequelize.define('follower', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        followerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Follower;
}