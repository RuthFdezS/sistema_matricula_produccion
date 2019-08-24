const Tutor = require('../models/Tutores');

exports.estadoAceptado = (req,res) => {
    res.render('estadoAceptado', {
        pagina: "Tutor modificado con éxito"
    })
}

exports.consultaTutores = async (req,res) => {
    const tutores = await Tutor.findAll();
    res.render ('tutoresVista', {
        pagina: "Lista de tutores registrados",
        tutores
    })      
};

exports.consultaTutoresPrint = async (req,res) => {
    const tutores = await Tutor.findAll();
    res.render ('tutoresVistaPrint', {
        pagina: "Lista de tutores registrados",
        tutores
    })      
};

exports.consultaIdTutor = async (req, res) => {
    const tutor = await Tutor.findByPk(req.params.id)
         res.render('modificarTutor',{
             tutor
         })
}

exports.modificarTutores = async function(req, res) {
    let tutorM = {};
    try {
        tutorM.nombre_tutor = req.body.nombre_tutor;
        tutorM.ced_tutor = req.body.ced_tutor; 
        tutorM.email_tutor = req.body.email_tutor;
        tutorM.tel_tutor = req.body.tel_tutor;
        tutorM.especialidad_tutor = req.body.especialidad_tutor;
        tutorM.pass_tutor = req.body.pass_tutor;

        //update 
        const tutorMod = await Tutor.update(tutorM,
                                    {where: {id: req.params.id}})
        if (!tutorMod) throw ('Error while Updating');
        // fetch updated data
        const returntutorMod =  await Tutor.findByPk(req.params.id)
        if(!returntutorMod) throw ('Error while Fetching Data');
        res.redirect('/estadoAceptado');
    } catch (error) {
        res.send(error)
    }
} 

exports.eliminartutor = async function(req, res){
    let query = {id: req.params.id }
    try{
        const tutorD = await Tutor.destroy({where: {id: req.params.id}});
        if(tutorD){
            alert('tutor eliminado');
        }else{
            alert('tutor no eliminado');
        }
    }catch (error) {
        res.send(error)
    } 
}






