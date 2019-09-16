const Sequelize = require('sequelize');
const config = require('../config');

const { database, username, password, dialect } = config.db;

const sequelize = new Sequelize(database, username, password, {
    dialect
});

const db = {
    sequelize,
    Sequelize,
    models: {}
}

// All models here
db.models.User = require('./models/User')(sequelize);
db.models.Course = require('./models/Course')(sequelize);

// Association between two tables
db.models.User.hasMany(db.models.Course, {  
    foreignKey: {
        feildName: 'userId',
        allowNull: false
    }
});

db.models.Course.belongsTo(db.models.User, { 
    foreignKey: {
        feildName: 'userId',
        allowNull: false
    },
    validate: {
        notEmpty: {
            msg: 'Must give a value for "User Id".'
        },
        isInt: true
    }
});

module.exports = db;