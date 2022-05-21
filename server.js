const express = require('express');
const bodyParser = require('body-parser');

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

