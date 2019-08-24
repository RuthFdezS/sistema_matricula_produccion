const Estudiante = require('../models/Estudiantes');

let errores = [];
let usuario_sis = '';
let tipo_usuario = 0;
let email_usuario = '';

exports.loginUser = (req,res) => {
    res.render('login', {
        pagina: "Inicie sesión",
        errores
    })
    errores = [];
}

exports.olvidoContrasena = (req,res) => {
    res.render('olvidoContrasena', {
        pagina: "Digite su correo electrónico registrado en el sistema para generar otra contraseña."
    })
}

exports.iniciarSeccion = async (req, res)=>{
    let = {correo_electronico, password} = req.body

    const usuario_est= await Estudiante.findAll({
        where: {
            email_estudiante: correo_electronico,
            pass_estudiante: password
        },
    });
    
    try{
        if(usuario_est.length>0){
            // Se asigna el nombre del usuario recuperado
            usuario_sis = usuario_est[0].nombre_estudiante;
            tipo_usuario = usuario_est[0].tipo_usuario;
            email_usuario = usuario_est[0].email_estudiante;
            res.redirect('/home');
            // if(tipo_usuario==1){
            //     res.redirect('/home_estudiante');
            // }else{
            //     if(tipo_usuario==0){
            //         res.redirect('/home');
            //     }
            // }
            
        }else{
            errores.push({'mensaje': 'Datos de ingreso incorrectos'})
            console.log(errores.length);
            res.redirect('/');
        }
    }catch{
        res.send(error)
    }    
}

//Retorna el nombre del usuario
exports.user_sis = function() {
    return usuario_sis;
};

exports.tipoUser_sis = function() {
    return tipo_usuario;
};

exports.emailUser_sis = function() {
    return email_usuario;
};

