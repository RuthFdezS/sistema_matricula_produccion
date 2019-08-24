const Curso = require('../models/Cursos');
const Matricula = require('../models/Matriculas');
const Estudiante = require('../models/Estudiantes');
const email_Usuario = require("./loginController");

exports.estadoAceptado = (req,res) => {
    res.render('estadoAceptado', {
        pagina: "Modificación con éxito"
    })
}

exports.modificarMatricula = async function(req, res) {
    let MatriculaM = {};
    try {
        MatriculaM.id_curso = req.body.id_curso; 
        MatriculaM.email_estudiante = req.body.email_estudiante;
        
        //update 
        const MatriculaMod = await Matricula.update(cursoM,
                                    {where: {num_matricula: req.params.num_matricula}})
        if (!MatriculaMod) throw ('Error while Updating');
        // fetch updated data
        const returnMatriculaMod =  await Matricula.findByPk(req.params.num_matricula)
        if(!returnMatriculaMod) throw ('Error while Fetching Data');
        res.redirect('/estadoAceptado');
    } catch (error) {
        res.send(error)
    }
} 

exports.eliminarMatricula = async function(req, res){
    let query = {num_matricula: req.params.num_matricula }
    try{
        const matriculaD = await Matricula.destroy({where: {num_matricula: req.params.num_matricula}}).res.status(200).render('/cursosMatriculados', (err, html)=>{
            res.send(html);
       })
        .catch(error => console.log(error));
        if(matriculaD){
            alert('Matricula eliminada con exito');
        }else{
            alert('Matricula no eliminada');
        }
    }catch (error) {
        res.send(error)
    } 
}

exports.infoCursosMatriculados = async (req, res) => {
    res.render('cursosMatriculados',{
    pagina: "Cursos matriculados"
    })
}

exports.consultaCursosMatriculados = async (req,res) => {
    const matriculas = await Matricula.findAll();
    res.render ('cursosMatriculados', {
        pagina: "Matriculas registradas",
        matriculas
    })      
};

exports.consultaIdMatricula = async (req, res) => {
    const matricula = await Matricula.findByPk(req.params.num_matricula)
         res.render('modificarMatricula',{
             matricula
         })
}

exports.consultaMatriculasPrint = async (req,res) => {
    const matriculas = await Matricula.findAll();
    res.render ('matriculasVistaPrint', {
        pagina: "Lista de matriculas registrados",
        matriculas
    })      
};



