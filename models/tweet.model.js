module.exports = (sequelize,Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Tweets = sequelize.define('tweets',{
        tweets : {
            type : Sequelize.STRING
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
        }
    });
    return Tweets;
}