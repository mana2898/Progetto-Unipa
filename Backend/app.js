var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload());

// NECESSARIO PER L'APP MOBILE. BISOGNA UTILIZZARE IL PROPRIO INDIRIZZO IP. Il mio (Alessio) è questo
/*app.get("/", (req, res) => {
  res.redirect('http://192.168.1.106:3000');
});*/

// import di tutti i router necessari
var proprietarioRouter = require('./routes/proprietari');
var proprietaRouter = require('./routes/proprieta');
var casaRouter = require('./routes/case_vacanza');
var bbRouter = require('./routes/b_and_b');
var stanzaRouter = require('./routes/stanze');
var clienteRouter = require('./routes/clienti');
var servizioRouter = require('./routes/servizi');
var soggiornanteRouter = require('./routes/soggiornanti');
var prenotazioneRouter = require('./routes/prenotazioni');
var tassaRouter = require('./routes/tasse_soggiorno');
var utenteRouter = require('./routes/utenti');

var handleErrors = require('./routes/handleErrors');

// list of all routes used

// TABELLA UTENTE (CLIENTE + PROPRIETARIO)
// login user of table cliente or proprietario (using encrypted password)
// indirizzo: /login/logged
app.use('/login', utenteRouter);

// TABELLA PROPRIETARIO
// lista di tutti i proprietari
// indirizzo: /proprietari/all
//app.use('/proprietari', proprietarioRouter);
// registrazione di un nuovo proprietario che era cliente
// indirizzo: /insertProprietario/new
app.use('/insertProprietario', proprietarioRouter);
// registrazione di un nuovo proprietario che era cliente
// indirizzo: /insertProprietarioCliente/newPropCl
app.use('/insertProprietarioCliente', proprietarioRouter);
// login di un proprietario utilizzando password criptata
// indirizzo: /loginProprietario/proprietarioLogged
app.use('/loginProprietario', proprietarioRouter);
// ricerca di un proprietario dall'email
// indirizzo: /searchProprietarioEmail/proprietarioEmail
app.use('/searchProprietarioEmail', proprietarioRouter);
// get ultima data di invio dati ufficio turismo of table Proprietario
// indirizzo: /getDataInvio/dataInvio
app.use('/getDataInvio', proprietarioRouter);
// mostra guadagni proprietario, fornendo email e anno per la ricerca
// indirizzo: /getGuadagni/guadagniProprietario
app.use('/getGuadagni', proprietarioRouter);
// mostra guadagni proprietario, fornendo email, range e tipo proprieta per la ricerca
// indirizzo: /getGuadagniTipo/guadagniProprietarioTipo
app.use('/getGuadagniTipo', proprietarioRouter);
// mostra guadagni proprietario, fornendo email, range e id proprieta per la ricerca
// indirizzo: /getGuadagniProprieta/guadagniProprietarioProprieta
app.use('/getGuadagniProprieta', proprietarioRouter);
// modifica dei campi di un proprietario (fornendo l'email)
// indirizzo: /updateProprietario/fields
app.use('/updateProprietario', proprietarioRouter);
// modifica della password di un proprietario (fornendo l'email)
// indirizzo: /updateProprietarioPassword/updPass
app.use('/updateProprietarioPassword', proprietarioRouter);
// update ultima data di invio dati ufficio turismo of table Proprietario
// indirizzo: /updateDataInvio/invioDati
app.use('/updateDataInvio', proprietarioRouter);

// TABELLA PROPRIETA
// lista di tutte le proprieta
// indirizzo: /proprieta/all
//app.use('/proprieta', proprietaRouter);
// inserimento di una nuova proprieta
// indirizzo: /insertProprieta/new
app.use('/insertProprieta', proprietaRouter);
// ----------METODO PRINCIPALE DA USARE PER LA RICERCA----------
// indirizzo: /ricercaAlloggio/risultati
app.use('/ricercaAlloggio', proprietaRouter);
// ricerca di una proprieta dal suo Proprietario
// indirizzo: /searchProprietaProprietario/proprietaProprietario
app.use('/searchProprietaProprietario', proprietaRouter);
// show searched proprieta (by Tipo = cv && ref_proprietario)
// indirizzo: /searchProprietaCVProprietario/proprietaCVProprietario
app.use('/searchProprietaCVProprietario', proprietaRouter);
// show searched proprieta (by Tipo = bb && ref_proprietario)
// indirizzo: /searchProprietaBBProprietario/proprietaBBProprietario
app.use('/searchProprietaBBProprietario', proprietaRouter);
// modifica dei campi di una proprieta (fornendo l'id)
// indirizzo: /updateProprieta/fields
app.use('/updateProprieta', proprietaRouter);
// ricerca di una proprieta dal suo id
// indirizzo: /searchProprieta/results
//app.use('/searchProprieta', proprietaRouter);
// ricerca di una proprieta dal suo nome
// indirizzo: /searchProprietaNome/proprietaNome
//app.use('/searchProprietaNome', proprietaRouter);
// ricerca di una proprieta dalla sua Localita
// indirizzo: /searchProprietaLocalita/proprietaLocalita
//app.use('/searchProprietaLocalita', proprietaRouter);
// ricerca di una proprieta dalla sua Provincia
// indirizzo: /searchProprietaProvincia/proprietaProvincia
//app.use('/searchProprietaProvincia', proprietaRouter);
// ricerca di una proprieta dal suo Tipo
// indirizzo: /searchProprietaTipo/proprietaTipo
//app.use('/searchProprietaTipo', proprietaRouter);
// ricerca di una proprieta dai suoi Servizi
// indirizzo: /searchProprietaServizi/proprietaServizi
//app.use('/searchProprietaServizi', proprietaRouter);
// ricerca di una proprieta da Localita && Tipo
// indirizzo: /searchProprietaLocalitaTipo/proprietaLocalitaTipo
//app.use('/searchProprietaLocalitaTipo', proprietaRouter);
// ricerca di una proprieta da Provincia && Tipo
// indirizzo: /searchProprietaProvinciaTipo/proprietaProvinciaTipo
//app.use('/searchProprietaProvinciaTipo', proprietaRouter);
// ricerca di una proprieta da Localita && Servizi
// indirizzo: /searchProprietaLocalitaServizi/proprietaLocalitaServizi
//app.use('/searchProprietaLocalitaServizi', proprietaRouter);
// ricerca di una proprieta da Provincia && Servizi
// indirizzo: /searchProprietaProvinciaServizi/proprietaProvinciaServizi
//app.use('/searchProprietaProvinciaServizi', proprietaRouter);
// ricerca di una proprieta da Tipo && Servizi
// indirizzo: /searchProprietaTipoServizi/proprietaTipoServizi
//app.use('/searchProprietaTipoServizi', proprietaRouter);
// ricerca di una proprieta da Localita && Tipo && Servizi
// indirizzo: /searchProprietaLocalitaTipoServizi/proprietaLocalitaTipoServizi
//app.use('/searchProprietaLocalitaTipoServizi', proprietaRouter);
// ricerca di una proprieta da Provincia && Tipo && Servizi
// indirizzo: /searchProprietaProvinciaTipoServizi/proprietaProvinciaTipoServizi
//app.use('/searchProprietaProvinciaTipoServizi', proprietaRouter);
// elaborazione del form di ricerca di un alloggio, nel caso più generale

// TABELLA CASA VACANZA
// lista di tutte le case vacanza
// indirizzo: /case/all
//app.use('/case', casaRouter);
// inserimento di una nuova casa
// indirizzo: /insertCasa/new
app.use('/insertCasa', casaRouter);
// ricerca di date non disponibile inizio e fine della casa dal suo id
// indirizzo: /getDateCasa/dateCasa
app.use('/getDateCasa', casaRouter);
// modifica dei campi di una casa vacanza (fornendo il suo id)
// indirizzo: /updateCasa/fields
app.use('/updateCasa', casaRouter);
// caricamento foto
// indirizzo: /uploadFotoCV/upload
app.use('/uploadFotoCV', casaRouter);
// cancellazione di una casa
// indirizzo: /deleteCasa/deleted
app.use('/deleteCasa', casaRouter);
// ricerca di una casa dal suo id
// indirizzo: /searchCasa/results
//app.use('/searchCasa', casaRouter);
// ricerca di case dal numero di posti letto
// indirizzo: /searchPosti/postiCase
//app.use('/searchPosti', casaRouter);

// TABELLA B&B
// lista di tutti i b&b
// indirizzo: /BB/all
//app.use('/BB', bbRouter);
// inserimento di un nuovo b&b
// indirizzo: /insertBB/new
app.use('/insertBB', bbRouter);
// modifica dei campi di un b&b (fornendo il suo id)
// indirizzo: /updateBB/fields
app.use('/updateBB', bbRouter);
// cancellazione di un b&b
// indirizzo: /deleteBB/deleted
app.use('/deleteBB', bbRouter);
// ricerca di un b&b dal suo id
// indirizzo: /searchBB/results
//app.use('/searchBB', bbRouter);

// TABELLA STANZA
// lista di tutte le stanza
// indirizzo: /stanze/all
//app.use('/stanze', stanzaRouter);
// inserimento di una nuova stanza
// indirizzo: /insertStanza/new
app.use('/insertStanza', stanzaRouter);
// ricerca di una stanza dal suo ref_bb
// indirizzo: /searchStanzaBB/stanzaBB
app.use('/searchStanzaBB', stanzaRouter);
// ricerca di date non disponibile inizio e fine della stanza dal suo id
// indirizzo: /getDateStanza/dateStanza
app.use('/getDateStanza', stanzaRouter);
// modifica dei campi di una Stanza (fornendo il suo id)
// indirizzo: /updateStanza/fields
app.use('/updateStanza', stanzaRouter);
// caricamento foto
// indirizzo: /uploadFotoST/upload
app.use('/uploadFotoST', stanzaRouter);
// cancellazione di una stanza
// indirizzo: /deleteStanza/deleted
app.use('/deleteStanza', stanzaRouter);
// ricerca di una stanza dal suo id
// indirizzo: /searchStanza/results
//app.use('/searchStanza', stanzaRouter);
// ricerca di una stanza dalla sua tipologia
// indirizzo: /searchStanzaTipologia/stanzaTipologia
//app.use('/searchStanzaTipologia', stanzaRouter);
// ricerca di una stanza dal suo ref_bb && tipologia
// indirizzo: /searchStanzaBBTipologia/stanzaBBTipologia
//app.use('/searchStanzaBBTipologia', stanzaRouter);

// TABELLA CLIENTE
// lista di tutti i clienti
// indirizzo: /clienti/all
//app.use('/clienti', clienteRouter);
// inserimento di un nuovo cliente
// indirizzo: /insertCliente/new
app.use('/insertCliente', clienteRouter);
// login di un cliente utilizzando password criptata
// indirizzo: /loginCliente/clienteLogged
app.use('/loginCliente', clienteRouter);
// ricerca di un cliente dalla sua email
// indirizzo: /searchCliente/results
app.use('/searchCliente', clienteRouter);
// modifica dei campi di un cliente (fornendo la sua email)
// indirizzo: /updateCliente/fields
app.use('/updateCliente', clienteRouter);
// modifica della password di un cliente (fornendo la sua email)
// indirizzo: /updateClientePassword/updPassword
app.use('/updateClientePassword', clienteRouter);

// TABELLA SERVIZI
// lista di tutti i servizi
// indirizzo: /servizi/all
app.use('/servizi', servizioRouter);
// inserimento di un nuovo servizio
// indirizzo: /insertServizio/new
app.use('/insertServizio', servizioRouter);

// TABELLA SOGGIORNANTE
// lista di tutti i soggiornanti
// indirizzo: /soggiornanti/all
//app.use('/soggiornanti', soggiornanteRouter);
// inserimento di un nuovo soggiornante
// indirizzo: /insertSoggiornante/new
app.use('/insertSoggiornante', soggiornanteRouter);
// ricerca di un soggiornante dal suo cf
// indirizzo: /searchSoggiornante/results
//app.use('/searchSoggiornante', soggiornanteRouter);
// modifica dei campi di un Soggiornante (fornendo il cf)
// indirizzo: /updateSoggiornante/fields
//app.use('/updateSoggiornante', soggiornanteRouter);

// TABELLA PRENOTAZIONE
// lista di tutte le prenotazioni
// indirizzo: /prenotazioni/all
//app.use('/prenotazioni', prenotazioneRouter);
// inserimento di una nuova prenotazione
// indirizzo: /insertPrenotazione/new
app.use('/insertPrenotazione', prenotazioneRouter);
// ricerca di una prenotazione dal suo ref_cliente
// indirizzo: /searchPrenotazioneCliente/prenotazioneCliente
app.use('/searchPrenotazioneCliente', prenotazioneRouter);
// mostra prenotazioni da accettare (da ref_proprietario)
// indirizzo: /getPrenotazioniAccettazione/prenotazioniAccettazione
app.use('/getPrenotazioniAccettazione', prenotazioneRouter);
// mostra prenotazioni già accettate (da ref_proprietario)
// indirizzo: /getPrenotazioniAccettate/prenotazioniAccettate
app.use('/getPrenotazioniAccettate', prenotazioneRouter);
// controlla vincolo dei 28 giorni per prenotazione casa vacanza
// indirizzo: /checkSoggiornante/resultIdoneita
app.use('/checkSoggiornante', prenotazioneRouter);
// accetta prenotazione in pendenza (da id_prenotazione)
// indirizzo: /accettaPrenotazione/accettata
app.use('/accettaPrenotazione', prenotazioneRouter);
// rifiuta prenotazione in pendenza (da id_prenotazione)
// indirizzo: /rifiutaPrenotazione/rifiutata
app.use('/rifiutaPrenotazione', prenotazioneRouter);
// update date of table Prenotazione (from id_prenotazione)
// indirizzo: /updateDatePrenotazione/newDate
app.use('/updateDatePrenotazione', prenotazioneRouter);
// effettuato check in prenotazione from id_prenotazione
// indirizzo: /checkinPrenotazione/checkin
app.use('/checkinPrenotazione', prenotazioneRouter);
// delete prenotazione from id_prenotazione
// indirizzo: /deletePrenotazione/delete
app.use('/deletePrenotazione', prenotazioneRouter);
// ricerca di una prenotazione dal suo id
// indirizzo: /searchPrenotazione/results
//app.use('/searchPrenotazione', prenotazioneRouter);
// ricerca di una prenotazione dal suo ref_soggiornante
// indirizzo: /searchPrenotazioneSoggiornante/prenotazioneSoggiornante
//app.use('/searchPrenotazioneSoggiornante', prenotazioneRouter);
// ricerca di una prenotazione dal suo ref_proprietario
// indirizzo: /searchPrenotazioneProprietario/prenotazioneProprietario
//app.use('/searchPrenotazioneProprietario', prenotazioneRouter);
// ricerca di una prenotazione dal suo ref_proprieta
// indirizzo: /searchPrenotazioneProprieta/prenotazioneProprieta
//app.use('/searchPrenotazioneProprieta', prenotazioneRouter);
// mostra prenotazioni rifiutate (da ref_proprietario)
// indirizzo: /getPrenotazioniRifiutate/prenotazioniRifiutate
//app.use('/getPrenotazioniRifiutate', prenotazioneRouter);
// modifica dei campi di una prenotazione (fornendo l'id)
// indirizzo: /updatePrenotazione/fields
//app.use('/updatePrenotazione', prenotazioneRouter);

// TABELLA TASSA SOGGIORNO
// lista di tutte le tasse
// indirizzo: /tasse/all
//app.use('/tasse', tassaRouter);
// inserimento di una nuova tassa
// indirizzo: /insertTassa/new
app.use('/insertTassa', tassaRouter);
// ricerca tasse di soggiorno del proprietario, con join con tabella prenotazione. Da usare per invio dati ufficio turismo
// indirizzo: /getTasseInvio/tasse
app.use('/getTasseInvio', tassaRouter);
// elimina tasse di soggiorno del proprietario. Da usare dopo invio dati ufficio turismo
// indirizzo: /deleteTasseInvio/deleteTasse
app.use('/deleteTasseInvio', tassaRouter);
// ricerca di una tassa dal suo id
// indirizzo: /searchTassa/results
//app.use('/searchTassa', tassaRouter);
// ricerca di una tassa dal suo ref_soggiornante
// indirizzo: /searchTassaSoggiornante/tassaSoggiornante
//app.use('/searchTassaSoggiornante', tassaRouter);
// ricerca di una tassa dal suo ref_proprietario
// indirizzo: /searchTassaProprietario/tassaProprietario
//app.use('/searchTassaProprietario', tassaRouter);
// modifica dei campi di una tassa di soggiorno (fornendo il suo id)
// indirizzo: /updateTassa/fields
//app.use('/updateTassa', tassaRouter);

/* catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

app.use(handleErrors);

module.exports = app;
