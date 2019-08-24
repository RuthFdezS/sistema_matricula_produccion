const Tutor = require('../models/Tutores');

exports.consultaTutores = async (req,res) => {
    //Pasa los datos de la base de datos a la vista
    const tutorRegistro = await Tutor.findAll()
    res.render ('tutorRegistro', {
        pagina: "Registrar un nuevo tutor",
        tutorRegistro
    })
      
};

exports.guardarTutor = async (req,res) => {
    //validad que todos los campos esten llenos
    let {nombre_tutor, ced_tutor, email_tutor,tel_tutor,especialidad_tutor,pass_tutor} = req.body;

    let errores = [];
    let aprrove = [];
    if(!nombre_tutor){
        errores.push({'mensaje': 'Agrega el nombre del tutor'})
    }
    if(!ced_tutor){
        errores.push({'mensaje': 'Agrega la cédula del tutor'})
    }
    if(!email_tutor){
        errores.push({'mensaje': 'Agrega el email del tutor'})
    }
    if(!tel_tutor){
        errores.push({'mensaje': 'Agrega el teléfono del tutor'})
    }
    if(!especialidad_tutor){
        errores.push({'mensaje': 'Agrega la especialidad del tutor'})
    }
    if(!pass_tutor){
        errores.push({'mensaje': 'Agrega la contraseña'})
    }

    console.log(errores.length);

    //revisar errores
    if(errores.length>0){
        //muestra la vista con errores
        const agregarTutor = await Tutor.findAll()
        res.render('tutorRegistro',{
            errores,
            nombre_tutor, 
            ced_tutor, 
            email_tutor,
            tel_tutor,
            especialidad_tutor,
            pass_tutor,
            pagina: 'Tutores registrados',
            agregarTutor
        })
    }else{
        if(errores.length===0){
            aprrove.push({'mensaje': 'Tutor agregado con éxito'})
            res.render('tutorRegistro',{
                aprrove
            })
        }
        //almacena en la base de datos
        // Tutor.create({
        //     nombre_tutor, 
        //     ced_tutor, 
        //     email_tutor,
        //     tel_tutor,
        //     especialidad_tutor,
        //     pass_tutor
        // })
        // .then(agregarTutor => res.redirect('/tutorRegistro'))
        // .catch(error => console.log(error));

        Tutor.create({
            nombre_tutor, 
            ced_tutor, 
            email_tutor,
            tel_tutor,
            especialidad_tutor,
            pass_tutor
        })
        .then(agregarTutor => res.status(200).render('/tutorRegistro', (err, html)=>{
            res.send(html);
       }))
        .catch(error => console.log(error));
    }
    console.log(errores.length);
};

