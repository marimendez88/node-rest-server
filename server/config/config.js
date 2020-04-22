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

// urlDB = 'mongodb+srv://mjmendez8:OTOWGjZKlMg5fv3J@cluster0-cptar.mongodb.net/cafe';


process.env.URLDB = urlDB;