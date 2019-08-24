const Sequelize = require('sequelize');
const db = require('../config/database');

const Admin = db.define('administradores',{
    nombre_admin:{
        type: Sequelize.STRING
    },
    ced_admin: {
        type: Sequelize.STRING
    },
    email_admin: {
        type: Sequelize.STRING
    },
    tel_admin: {
        type: Sequelize.STRING
    },
    pass_admin: {
        type: Sequelize.STRING
    }
});

module.exports = Admin;