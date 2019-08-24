// const Viaje = require('../models/Viajes');
// const Testimonial = require('../models/Testimoniales');
const Cursos = require('../models/Cursos');
const Admin = require('../models/Admin');

// exports.consultasHomepage = async (req,res) => {
//     //para usar varias consultas en una misma vista, se debe de hacer usando un arreglo de promises
//     const promises = [];
//     const viajes = await Viaje.findAll({
//         //Limita la busqueda a 3 resultados
//         limit: 3
//     });
//     const testimoniales = await Testimonial.findAll({
//         //Limita la busqueda a 3 resultados
//         limit: 3
//     })
//     //pasar el promise y lo ejecuta en cadena
//     res.render('index', {
//         pagina: "Próximos Viajes",
//          //habilita una clase para ser usanda en el home, mas no en las otras paginas
//         clase: 'home',
//         //se usa un obvio literal ya que tanto el objeto como la declaracion se llaman igual
//         viajes, 
//         testimoniales
//     })
// }

exports.consultasHomepage = async (req,res) => {
    let persona = true;
    const cursos = await Cursos.findAll({
        //Limita la busqueda a 3 resultados y resultados con proximos cursos
        where: {
            estado_curso: 'Proximo',
        },
        limit: 3
    });

    //pasar el promise y lo ejecuta en cadena
    res.render('home', {
        pagina: "Sistema de Matricula",
        clase: 'home',
        persona,
        cursos
    })
}

exports.consultaAdmin = async (req, res) => {
    const admins = await Admin.findAll();
         res.render('admin',{
            pagina: "Información del administrador a cargo",
            admins
         })
         console.log(admin);
}

exports.infoCursosMatriculados = async (req, res) => {
    res.render('cursosMatriculados',{
    pagina: "Cursos matriculados"
    })
}

// exports.consultasHomepageEstudiante = async (req,res) => {
//     let persona = true;
//     const cursos = await Cursos.findAll({
//         //Limita la busqueda a 3 resultados y resultados con proximos cursos
//         where: {
//             estado_curso: 'Proximo',
//         },
//         limit: 3
//     });

//     //pasar el promise y lo ejecuta en cadena
//     res.render('home_estudiante', {
//         pagina: "Sistema de Matricula",
//         clase: 'home',
//         persona,
//         cursos
//     })
// }