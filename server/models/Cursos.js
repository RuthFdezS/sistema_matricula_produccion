const Sequelize = require('sequelize');
const db = require('../config/database');

const Cursos = db.define('cursos',{
    nombre_curso:{
        type: Sequelize.STRING
    },
    especialidad_curso:{
        type: Sequelize.STRING
    },
    nombre_tutor: {
        type: Sequelize.STRING
    },
    horario_curso: {
        type: Sequelize.STRING
    },
    cant_estudiantes: {
        type: Sequelize.INTEGER
    },
    aula_curso: {
        type: Sequelize.STRING
    },
    estado_curso: {
        type: Sequelize.STRING
    },
    descripcion_curso: {
        type: Sequelize.STRING
    },
    imagen_curso: {
        type: Sequelize.STRING
    }
});

module.exports = Cursos;