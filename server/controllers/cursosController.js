const Curso = require('../models/Cursos');
const Matricula = require('../models/Matriculas');
const email_Usuario = require("./loginController");

let tempCurso;

exports.consultaTodosCursos = async(req,res) => {
    const cursos= await Curso.findAll({
        where: {
            estado_curso: 'Activo',
        },
    });
    const cursosProx = await Curso.findAll({
        where: {
            estado_curso: 'Proximo',
        },
    })
        res.render('cursos', {
             pagina: "Cursos Actuales",
             paginaProx: "Próximos Cursos",
             cursos,
             cursosProx
        })
};

exports.consultaIdCursos = async (req, res) => {
   const curso = await Curso.findByPk(req.params.id)
        res.render('curso',{
            curso
        })
        tempCurso = curso;
}

exports.termsandconditions = (req,res) => {
    res.render('termsandconditions', {
        pagina: "Terminos y condiciones"
    })
}

exports.comprobanteCorreo = async (req,res) => {
    res.render('comprobanteCorreo', {
        pagina: "Comprobante de matrícula",
        tempCurso
    })

    try{
        let temp = tempCurso.cant_estudiantes;
        let id_curso_obj = tempCurso.id;
        let email_estudiante_obj = email_Usuario.emailUser_sis();

        temp--;
            if(tempCurso.cant_estudiantes === 1){
                try{
                    const result = await tempCurso.update(
                        { estado_curso: 'Desactivo',
                          cant_estudiantes: 0   }, //what going to be updated
                        { where: { id: tempCurso.id }} // where clause
                      )  
                    } catch (error) {
                      // error handling
                    }
            }else{
                const result = await tempCurso.update(
                    { cant_estudiantes: temp }, //what going to be updated
                    { where: { id: tempCurso.id }} // where clause
                  )

                  Matricula.create({  
                    id_curso: id_curso_obj,
                    email_estudiante: email_estudiante_obj
                  })
                  .then(newMatricula => {
                    console.log(`Una nueva matricula con el ${newMatricula.id_curso} y el estudiante: ${newMatricula.email_estudiante}, num de matricula ${newMatricula.num_matricula} ha sido creado.`);
                  });
            } 
      } catch (error) {
        // error handling
      }
}



