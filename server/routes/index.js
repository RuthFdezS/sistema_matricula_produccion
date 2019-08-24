const express = require('express');
const router = express.Router();

//Inicio y Admin
const homeController = require('../controllers/homeController');

//Reportes
const reportesController = require('../controllers/reportesController');

// Control Curso
const cursosController = require('../controllers/cursosController');
const cursosRegistroController = require('../controllers/cursosRegistroController');
const cursosVistaController = require('../controllers/cursosVistaController');

//Tutores
const tutoresRegistroController = require('../controllers/tutoresRegistroController');
const tutoresVistaController = require('../controllers/tutoresVistaController');

//Estudiantes
const estudiantesRegistroController = require('../controllers/estudiantesRegistroController');
const estudiantesVistaController = require('../controllers/estudiantesVistaController');

//Login
const loginController = require('../controllers/loginController');

// Matricula
const matriculaController = require('../controllers/matriculaVistaController');

module.exports = function(){
    //Login y Home
    router.get('/', loginController.loginUser);

    router.post('/', loginController.iniciarSeccion);

    router.get('/home', homeController.consultasHomepage);
   
    router.get('/admin', homeController.consultaAdmin);

    router.get('/login', loginController.loginUser);

    router.get('/olvidoContrasena', loginController.olvidoContrasena);

    // Matricula
    
    router.get('/cursosMatriculados', matriculaController.consultaCursosMatriculados);

    router.delete('/modificarMatricula/:num_matricula', matriculaController.eliminarMatricula);

    router.post('/modificarMatricula/:num_matricula', matriculaController.modificarMatricula);

    router.get('/modificarMatricula/:num_matricula', matriculaController.consultaIdMatricula);
    
    router.get('/matriculasVistaPrint', matriculaController.consultaMatriculasPrint);

    //Reportes
    router.get('/reportes', reportesController.infoReportes);

    // Cursos
    router.get('/cursos', cursosController.consultaTodosCursos);

    router.get('/cursos/:id', cursosController.consultaIdCursos);

    router.get('/termsandconditions', cursosController.termsandconditions);

    router.get('/comprobanteCorreo', cursosController.comprobanteCorreo);

    router.get('/cursoRegistro', cursosRegistroController.consultaCursos);

    router.post('/cursoRegistro', cursosRegistroController.guardarCursos);

    router.get('/cursosVista', cursosVistaController.consultaCursos);

    router.get('/cursosVistaPrint', cursosVistaController.consultaCursosPrint);

    router.get('/modificarCurso/:id', cursosVistaController.consultaIdCursos);

    router.post('/modificarCurso/:id', cursosVistaController.modificarCursos);

    router.get('/estadoAceptado', cursosVistaController.estadoAceptado);

    router.delete('/modificarCurso/:id', cursosVistaController.eliminarCurso);

    //Tutores
    
    router.get('/tutorRegistro', tutoresRegistroController.consultaTutores);

    router.post('/tutorRegistro', tutoresRegistroController.guardarTutor);

    router.get('/tutoresVista', tutoresVistaController.consultaTutores);

    router.get('/tutoresVistaPrint', tutoresVistaController.consultaTutoresPrint);

    router.get('/modificarTutor/:id', tutoresVistaController.consultaIdTutor);

    router.post('/modificarTutor/:id', tutoresVistaController.modificarTutores);

    router.get('/estadoAceptado', tutoresVistaController.estadoAceptado);

    router.delete('/modificarTutor/:id', tutoresVistaController.eliminartutor);

    //Estudiantes
    router.get('/estudianteRegistro', estudiantesRegistroController.consultaEstudiantes);

    router.post('/estudianteRegistro', estudiantesRegistroController.guardarEstudiante);

    router.get('/estudiantesVista', estudiantesVistaController.consultaEstudiantes);

    router.get('/estudiantesVistaPrint', estudiantesVistaController.consultaEstudiantesPrint);

    router.get('/modificarEstudiante/:email_estudiante', estudiantesVistaController.consultaIdEstudiante);

    router.post('/modificarEstudiante/:email_estudiante', estudiantesVistaController.modificarEstudiante);

    router.get('/estadoAceptado', estudiantesVistaController.estadoAceptado);

    router.delete('/modificarEstudiante/:email_estudiante', estudiantesVistaController.eliminarEstudiante);

    return router;
}