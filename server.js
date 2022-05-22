const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const config = require('./config/server.config');
const db = require('./models');

const app = express();
app.use(bodyParser.json());

db.sequelize.sync({force: true}).then(() => {
    console.log(`Database connected`);
    init();
}).catch( err => {
    console.log(`Database not connected ${err}`);
} )

const Role = db.role;
function init() {
    let userData = [
        {
            name: 'Himanshu Sah',
            username: '09himanshu',
            email: '09himanshusah@gmail.com',
            password: bcrypt.hashSync('09012001')
        },
        {
            name: 'Shabana Khatoon',
            username: '12cheekumaria',
            email: '12shabanakhatoon@gmail.com',
            password: bcrypt.hashSync('120420002'),
        }
    ]

    let tweet = [
        {
            tweets: 'This is my first tweet',
            username: '12cheekumaria'

        }, 
        {
            tweets: 'This is my second tweet',
            username: '09himanshu' 
        }
    ]

    db.user.bulkCreate(userData).then(() => {
        console.log(`User table bulk create created`);
    }).catch(err => {
        console.log(`Error occur at ${err}`);
    })

    db.tweet.bulkCreate(tweet).then(() => {
        console.log('Tweet table created');
    }).catch(err => {
        console.log(`Error occur at ${err}`);
    })

    Role.create({
        id:1,
        name:'user',
    })

    Role.create({
        id:2,
        name:'premium_user',
    })
}


// Request routes
require('./routes/auth.routes')(app);


// App listen on port
app.listen(config.port, () => {
    console.log(`Server hosted on port ${config.port}`);
})

