const Estudiante = require('../models/Estudiantes');

exports.estadoAceptado = (req,res) => {
    res.render('estadoAceptado', {
        pagina: "Estudiante modificado con éxito"
    })
}

exports.consultaEstudiantes = async (req,res) => {
    const estudiantes = await Estudiante.findAll({
        where: {
            tipo_usuario: 1,
        }
    });
    res.render ('estudiantesVista', {
        pagina: "Lista de estudiantes registrados",
        estudiantes
    })      
};

exports.consultaEstudiantesPrint = async (req,res) => {
    const estudiantes = await Estudiante.findAll({
        where: {
            tipo_usuario: 1,
        }
    });
    res.render ('estudiantesVistaPrint', {
        pagina: "Lista de estudiantes registrados",
        estudiantes
    })      
};

exports.consultaIdEstudiante = async (req, res) => {
    const estudiante = await Estudiante.findByPk(req.params.email_estudiante)
         res.render('modificarEstudiante',{
             estudiante
         })
}

exports.modificarEstudiante = async function(req, res) {
    let estudianteM = {};
    try {
        estudianteM.pass_estudiante = req.body.pass_estudiante;
        estudianteM.nombre_estudiante = req.body.nombre_estudiante;
        estudianteM.ced_estudiante = req.body.ced_estudiante; 
        estudianteM.tel_estudiante = req.body.tel_estudiante;
        estudianteM.escolaridad_estudiante = req.body.escolaridad_estudiante;
        estudianteM.nacimiento_estudiante = req.body.nacimiento_estudiante;
        
        //update 
        const estudianteMod = await Estudiante.update(estudianteM,
                                    {where: {email_estudiante: req.params.email_estudiante}})
        if (!estudianteMod) throw ('Error while Updating');
        // fetch updated data
        const returnestudianteMod =  await Estudiante.findByPk(req.params.email_estudiante)
        if(!returnestudianteMod) throw ('Error while Fetching Data');
        res.redirect('/estadoAceptado');
    } catch (error) {
        res.send(error)
    }
} 

exports.eliminarEstudiante = async function(req, res){
    let query = {email_estudiante: req.params.email_estudiante }
    try{
        const estudianteD = await Estudiante.destroy({where: {email_estudiante: req.params.email_estudiante}}).res.status(200).render('/estudiantesVista', (err, html)=>{
            res.send(html);
       })
        .catch(error => console.log(error));
;
        console.log(estudianteD);
        if(estudianteD){
            console.log('estudiante eliminado');
        }else{
           console.log('estudiante no eliminado');
        }
    }catch (error) {
        res.send(error)
    } 
}






