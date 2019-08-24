const Sequelize = require('sequelize');
const db = require('../config/database');

const Estudiantes = db.define('estudiantes',{
    num_estudiante: {
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    email_estudiante: {
        type: Sequelize.STRING,
        primaryKey: true,
        msg : "Email se encuentra en uso"
    },
    pass_estudiante: {
        type: Sequelize.STRING
    },
    nombre_estudiante:{
        type: Sequelize.STRING
    },
    ced_estudiante: {
        type: Sequelize.STRING
    },
    tel_estudiante: {
        type: Sequelize.STRING
    },
    escolaridad_estudiante:{
        type: Sequelize.STRING
    },
    nacimiento_estudiante:{
        type: Sequelize.DATE
    },
    tipo_usuario:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
    
});

module.exports = Estudiantes;