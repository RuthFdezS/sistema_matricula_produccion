//Importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');


const configs = require('./config');

const db = require('./config/database');

require('dotenv').config({path: 'variables.env'});

//Configurar express
const app = express();
//habilitar pug
app.set('view engine', 'pug');
//donde encuentra los templates
app.set('views', path.join(__dirname, './views'));

//cargar una carpeta estatica public
app.use(express.static('public'));

// Validad si estamos en desarrollo o produccion
//env es una variable de node que detecta el ambiente de trabajo
const config = configs[app.get('env')];

// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//Muestra el año actual y genera la ruta
const datosUsuarioActual = require("./controllers/loginController");
app.use((req, res, next)=>{
    const fecha = new Date();
    fecha.getFullYear();
    res.locals.fechaActual = fecha.getFullYear();

    const usuario_sistema = datosUsuarioActual.user_sis();
    res.locals.usuarioActual = usuario_sistema;

    const tipo_usuario_sistema = datosUsuarioActual.tipoUser_sis();
    res.locals.tipoUsuarioActual = tipo_usuario_sistema;

    const email_usuario_sistema = datosUsuarioActual.emailUser_sis();
    res.locals.emailUsuarioActual = email_usuario_sistema;

    res.locals.ruta = req.path;
    console.log(res.locals);
    return next();
});



// app.use((req, res, next)=>{
//     const usuario_sistema = datosUsuarioActual.user_sis();
//     res.locals.usuarioActual = usuario_sistema;
//     res.locals.ruta = req.path;
//     console.log(res.locals);
//     return next();
// });

// app.use((req, res, next)=>{
//     const tipo_usuario_sistema = datosUsuarioActual.tipoUser_sis();
//     res.locals.tipoUsuarioActual = tipo_usuario_sistema;
//     res.locals.ruta = req.path;
//     console.log(res.locals);
//     return next();
// });

// app.use((req, res, next)=>{
//     const email_usuario_sistema = datosUsuarioActual.emailUser_sis();
//     res.locals.emailUsuarioActual = email_usuario_sistema;
//     res.locals.ruta = req.path;
//     console.log(res.locals);
//     return next();
// });


//Ejecutamos el bodyparse
app.use(bodyParser.urlencoded({extended:true}));

//cargar rutas
app.use('/', routes());

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () =>{
    console.log('El servidor esta funcionando');
});