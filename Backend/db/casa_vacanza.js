// connection to mysql db
var mysql = require('mysql');
var Connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'user',
    database: 'progetto',
    password: 'user',
    multipleStatements: true
});
//prova

Connection.connect(function(err) {
    if(err) throw err;
});

//requiring custom errors 
var { GeneralError, BadRequest, NotFound } = require('../utils/errors');

// utility function for table "casa_vacanza"

// insert new casa vacanza
const insertCasa = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO casa_vacanza VALUES ' +
            '(' + req.ref_proprieta_cv + ', ' + req.posti_letto + ', ' + req.tariffa_casa + 
            ', "1970-01-01", "1970-01-01" ' +
            ', "./Images/' + req.ref_proprieta_cv + '_1.jpg"' +
            ', "./Images/' + req.ref_proprieta_cv + '_2.jpg"' +
            ', "./Images/' + req.ref_proprieta_cv + '_3.jpg"' +
            ', "./Images/' + req.ref_proprieta_cv + '_4.jpg"' +
            ')',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new BadRequest("Si è verificato un errore nell'inserimento"));
                }
                resolve(results);
        });
    });
}

// get non_disponibile_inizio_cv and non_disponibile_fine_cv from ref_proprieta
const getDateCasa = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT non_disponibile_inizio_cv, non_disponibile_fine_cv ' + 
            'FROM casa_vacanza ' +
            'WHERE ref_proprieta_cv = ' + req.ref_proprieta + '; ',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Casa vacanza non trovata'));
                }
                resolve(results);
            }
        )
    })
}

// update fields
const updateCasa = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE casa_vacanza ' +
            'SET posti_letto = ' + req.posti_letto + ', tariffa_casa = ' + req.tariffa_casa +
            ', imgCV_path1 = "./Images/' + req.ref_proprieta_cv + '_1.jpg"' + 
            ', imgCV_path2 = "./Images/' + req.ref_proprieta_cv + '_2.jpg"' + 
            ', imgCV_path3 = "./Images/' + req.ref_proprieta_cv + '_3.jpg"' + 
            ', imgCV_path4 = "./Images/' + req.ref_proprieta_cv + '_4.jpg" ' + 
            'WHERE ref_proprieta_cv = ' + req.ref_proprieta_cv + '; ',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Casa vacanza non trovata'));
                }
                resolve(results);
            }
        );
    })
}

// delete casa vacanza
const deleteCasa = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'DELETE FROM casa_vacanza WHERE ref_proprieta_cv = ' + req.ref_proprieta_cv + '; ',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Casa vacanza non trovata'));
                }
                resolve(results);
            }
        )
    })
}

/* 
    _______________

    NON UTILIZZATI

    _______________

*/

// return all table
const all = async (req) => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM casa_vacanza', (err, results) => {
            if(err) {
                console.log(err);
                return reject(new GeneralError('Si è verificato un errore'));
            }
            if(results.length < 1) {
                return reject(new NotFound('Nessuna casa vacanza registrata'));
            }
            resolve(results);
        });
    });
}

// get casa vacanza from ref_proprieta_cv
const getCasa = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM casa_vacanza ' +
            'WHERE ref_proprieta_cv = ' +  req.ref_proprieta_cv + '; ', (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessuna casa vacanza trovata'));
                }
            resolve(results);
        });
    });
}

// get case from posti letto
const getCasePosti = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM casa_vacanza ' +
            'WHERE posti_letto = ' + req.posti_letto,
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessuna casa vacanza corrisponde ai criteri di ricerca'));
                }
                resolve(results); 
        });
    });
}

module.exports = all;
module.exports = getCasa;
module.exports = getCasePosti;
module.exports = updateCasa;
module.exports = insertCasa;
module.exports = deleteCasa;
module.exports = getDateCasa;

module.exports = {
    all,
    getCasa,
    getCasePosti,
    updateCasa,
    insertCasa,
    deleteCasa,
    getDateCasa
}