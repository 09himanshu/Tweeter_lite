module.exports = (sequelize, Sequelize) => {
    const Following = sequelize.define('follower', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        followingId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Following;
}