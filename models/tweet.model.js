module.exports = (sequelize,Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Tweets = sequelize.define('tweets',{
        tweets : {
            type : Sequelize.STRING
        },
        username: {
            type : Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
        }
    });
    return Tweets;
}