module.exports = (sequelize, Sequelize) => {
    const Following = sequelize.define("following", {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        FollowingId: {
            type: Sequelize.STRING,
            alllowNull: false
        }
    });
    return Following;
}