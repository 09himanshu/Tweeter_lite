module.exports = (sequelize, Sequelize) => {
    const Follower = sequelize.define('follower', {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        FollowerId: {
            type: Sequelize.STRING,
            alllowNull: false
        }
    });
    return Follower;
}