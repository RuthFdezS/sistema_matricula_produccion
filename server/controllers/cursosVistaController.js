const Curso = require('../models/Cursos');

exports.estadoAceptado = (req,res) => {
    res.render('estadoAceptado', {
        pagina: "Modificación con éxito"
    })
}

exports.consultaCursos = async (req,res) => {
    const cursos = await Curso.findAll();
    res.render ('cursosVista', {
        pagina: "Lista de cursos registrados",
        cursos
    })      
};

exports.consultaCursosPrint = async (req,res) => {
    const cursos = await Curso.findAll();
    res.render ('cursosVistaPrint', {
        pagina: "Lista de cursos registrados",
        cursos
    })      
};

exports.consultaIdCursos = async (req, res) => {
    const curso = await Curso.findByPk(req.params.id)
         res.render('modificarCurso',{
             curso
         })
}

exports.modificarCursos = async function(req, res) {
    let cursoM = {};
    try {
        cursoM.nombre_curso = req.body.nombre_curso;
        cursoM.especialidad_curso = req.body.especialidad_curso; 
        cursoM.nombre_tutor = req.body.nombre_tutor;
        cursoM.horario_curso = req.body.horario_curso;
        cursoM.cant_estudiantes = req.body.cant_estudiantes;
        cursoM.aula_curso = req.body.aula_curso;
        cursoM.estado_curso = req.body.estado_curso;
        cursoM.descripcion_curso = req.body.descripcion_curso;
        cursoM.imagen_curso = req.body.imagen_curso;
        //update 
        const cursoMod = await Curso.update(cursoM,
                                    {where: {id: req.params.id}})
        if (!cursoMod) throw ('Error while Updating');
        // fetch updated data
        const returncursoMod =  await Curso.findByPk(req.params.id)
        if(!returncursoMod) throw ('Error while Fetching Data');
        res.redirect('/estadoAceptado');
    } catch (error) {
        res.send(error)
    }
} 

exports.eliminarCurso = async function(req, res){
    let query = {id: req.params.id }
    try{
        const cursoD = await Curso.destroy({where: {id: req.params.id}});
        if(cursoD){
            alert('Curso eliminado');
        }else{
            alert('Curso no eliminado');
        }
    }catch (error) {
        res.send(error)
    } 
}






