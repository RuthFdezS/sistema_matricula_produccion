const Estudiante = require('../models/Estudiantes');

exports.consultaEstudiantes = async (req,res) => {
    //Pasa los datos de la base de datos a la vista
    const estudianteRegistro = await Estudiante.findAll()
    res.render ('estudianteRegistro', {
        pagina: "Registrar un nuevo estudiante",
        estudianteRegistro
    })
      
};

exports.guardarEstudiante = async (req,res) => {
    //validad que todos los campos esten llenos
    let {email_estudiante,pass_estudiante,nombre_estudiante, ced_estudiante, tel_estudiante,escolaridad_estudiante,nacimiento_estudiante} = req.body;
    
    let errores = [];
    let aprrove = [];
    if(!email_estudiante){
        errores.push({'mensaje': 'Agrega el correo del estudiante'})
    }
    if(!pass_estudiante){
        errores.push({'mensaje': 'Agrega la contraseña'})
    }
    if(!nombre_estudiante){
        errores.push({'mensaje': 'Agrega el nombre del estudiante'})
    }
    if(!ced_estudiante){
        errores.push({'mensaje': 'Agrega la cédula del estudiante'})
    }
    if(!tel_estudiante){
        errores.push({'mensaje': 'Agrega el teléfono del estudiante'})
    }
    if(!escolaridad_estudiante){
        errores.push({'mensaje': 'Agrega la escolaridad del estudiante'})
    }
    if(!nacimiento_estudiante){
        errores.push({'mensaje': 'Agrega la fecha de nacimiento'})
    }

    const usuario_est= await Estudiante.findAll({
        where: {
            email_estudiante: email_estudiante
        },
    });

    try{
        if(usuario_est.length>0){
            console.log('-----USUARIO EXISTE-----')
            errores.push({'mensaje': 'Ingrese un email diferente, ya se encuentra en uso'})
        }
    }catch{
        res.send(error)
    }
   
    console.log(errores.length);
    
    //revisar errores
    if(errores.length>0){
        //muestra la vista con errores
        const agregarEstudiante = await Estudiante.findAll()
        res.render('estudianteRegistro',{
            errores,
            email_estudiante,
            pass_estudiante,
            nombre_estudiante, 
            ced_estudiante, 
            tel_estudiante,
            escolaridad_estudiante,
            nacimiento_estudiante,
            pagina: 'Estudiantes registrados',
            agregarEstudiante
        })
    }else{
        if(errores.length===0){
            aprrove.push({'mensaje': 'Estudiante agregado con éxito'})
            res.render('estudianteRegistro',{
                aprrove
            })
        }
        //almacena en la base de datos
        Estudiante.create({
            email_estudiante,
            pass_estudiante,
            nombre_estudiante, 
            ced_estudiante, 
            tel_estudiante,
            escolaridad_estudiante,
            nacimiento_estudiante,
        })
        .then(agregarEstudiante => res.status(200).render('/estudianteRegistro', (err, html)=>{
            res.send(html);
       }))
        .catch(error => console.log(error));
        // Estudiante.create({
        //     email_estudiante,
        //     pass_estudiante,
        //     nombre_estudiante, 
        //     ced_estudiante, 
        //     tel_estudiante,
        //     escolaridad_estudiante,
        //     nacimiento_estudiante,
        // })
        // .then(agregarEstudiante => res.redirect('/estudianteRegistro'))
        // .catch(error => console.log(error));
    }
    console.log(errores.length);
};

