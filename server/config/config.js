// 
// puerto
//
process.env.PORT = process.env.PORT || 3000;

//
// Entorno
//
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//
// Base de datos
//

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;



//
// Vencimiento del token
// 60 Seg
// 60 Min
// 24 Horas
// 30 dias
//
process.env.CADUCIDAD_TOKEN = '48h';




//
// SEED del token
//

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//
// Google Client 
//
process.env.CLIENT_ID = process.env.CLIENT_ID || '590139876596-ja7frc8v7sd1ipta8jiucloe1qg8dgkk.apps.googleusercontent.com';