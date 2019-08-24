const Curso = require('../models/Cursos');
exports.consultaCursos = async (req,res) => {
    //Pasa los datos de la base de datos a la vista
    const cursoRegistro = await Curso.findAll()
    res.render ('cursoRegistro', {
        pagina: "Registrar un nuevo curso",
        cursoRegistro
    })
      
};

exports.guardarCursos = async (req,res) => {
    //validad que todos los campos esten llenos
    let {nombre_curso, especialidad_curso, nombre_tutor,horario_curso,cant_estudiantes,aula_curso,estado_curso,descripcion_curso,imagen_curso} = req.body;

    let errores = [];
    let aprrove = [];
    if(!nombre_curso){
        errores.push({'mensaje': 'Agrega el nombre del curso'})
    }
    if(!especialidad_curso){
        errores.push({'mensaje': 'Agrega la especialidad del curso'})
    }
    if(!nombre_tutor){
        errores.push({'mensaje': 'Agrega el nombre completo del tutor'})
    }
    if(!horario_curso){
        errores.push({'mensaje': 'Agrega el horario del curso'})
    }
    if(!cant_estudiantes){
        errores.push({'mensaje': 'Cantidad es 0, escoja otra cantidad'})
    }
    if(!aula_curso){
        errores.push({'mensaje': 'Agrega el aula o laboratorio del curso'})
    }
    if(estado_curso===''){
        errores.push({'mensaje': 'Agrega un estado al curso'})
    }
    if(!descripcion_curso){
        errores.push({'mensaje': 'Agrega una descripción al curso'})
    }
    if(!imagen_curso){
        errores.push({'mensaje': 'Agrega el ID del la imagen'})
    }

    console.log(errores.length);

    //revisar errores
    if(errores.length>0){
        //muestra la vista con errores
        const agregarCurso = await Curso.findAll()
        res.render('cursoRegistro',{
            errores,
            nombre_curso, 
            especialidad_curso, 
            nombre_tutor,
            horario_curso,
            cant_estudiantes,
            aula_curso,
            estado_curso,
            descripcion_curso,
            imagen_curso,
            pagina: 'Cursos registrados',
            agregarCurso
        })
    }else{
        if(errores.length===0){
            aprrove.push({'mensaje': 'Curso agregado con éxito'})
            res.render('cursoRegistro',{
                aprrove
            })
        }
        //almacena en la base de datos
        Curso.create({
            nombre_curso, 
            especialidad_curso, 
            nombre_tutor,
            horario_curso,
            cant_estudiantes,
            aula_curso,
            estado_curso,
            descripcion_curso,
            imagen_curso
        })
        .then(agregarCurso => res.status(200).render('/cursoRegistro', (err, html)=>{
            res.send(html);
       }))
        .catch(error => console.log(error));
        // Curso.create({
        //     nombre_curso, 
        //     especialidad_curso, 
        //     nombre_tutor,
        //     horario_curso,
        //     cant_estudiantes,
        //     aula_curso,
        //     estado_curso,
        //     descripcion_curso,
        //     imagen_curso
        // })
        // .then(agregarCurso => res.redirect('/cursoRegistro'))
        // .catch(error => console.log(error));
    }
    console.log(errores.length);
};

