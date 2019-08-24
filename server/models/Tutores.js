const Sequelize = require('sequelize');
const db = require('../config/database');

const Tutores = db.define('tutores',{
    nombre_tutor:{
        type: Sequelize.STRING
    },
    ced_tutor: {
        type: Sequelize.STRING
    },
    email_tutor: {
        type: Sequelize.STRING
    },
    tel_tutor: {
        type: Sequelize.STRING
    },
    especialidad_tutor:{
        type: Sequelize.STRING
    },
    pass_tutor: {
        type: Sequelize.STRING
    }
});

module.exports = Tutores;