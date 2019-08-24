const Sequelize = require('sequelize');
const db = require('../config/database');

const Matricula = db.define('matriculas',{
    num_matricula:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    id_curso:{
        type: Sequelize.INTEGER,
    },
    email_estudiante: {
        type: Sequelize.STRING
    }
});

module.exports = Matricula;