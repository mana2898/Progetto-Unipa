import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import {Col, Row} from "react-bootstrap"
import './Riepilogo.css'
import StyledHero from "../components/StyledHero";

export default class RiepilogoAlloggio extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dati_casa: this.props.history.location.state.dati_casa.dati_casa ? this.props.history.location.state.dati_casa.dati_casa : [],
      dati_servizi: this.props.history.location.state.servizi.servizi ? this.props.history.location.state.servizi.servizi : [],
      checkIn: this.props.history.location.state.checkIn.checkIn ? this.props.history.location.state.checkIn.checkIn : '',
      checkOut: this.props.history.location.state.checkOut.checkOut ? this.props.history.location.state.checkOut.checkOut : '',
      tipo: this.props.history.location.state.tipo.tipo ? this.props.history.location.state.tipo.tipo : '',
      datiRicerca: this.props.history.location.state.datiRicerca.datiRicerca ? this.props.history.location.state.datiRicerca.datiRicerca : [],
      servizi: []
    };
  }

  componentDidMount() {
    this.setState({
      servizi: this.state.dati_casa.servizi ? this.state.dati_casa.servizi.replace(/\s*,\s*/g, ",").split(',') : []
    });
  }

  render() {
    if (dati_casa === []) {
      return (
        <div className="error">
          <h3> Casa vacanza non trovata...</h3>
          <Link 
            to = {{
              pathname: "/CaseVacanza",
              state: {
                case: this.state.datiRicerca,
                posti: this.state.dati_casa.posti,
                localita: this.state.dati_casa.localita,
                checkIn: this.state.dati_casa.checkIn,
                checkOut: this.state.dati_casa.checkOut
              }
            }}
            className = "return"
          >
            Ritorna alla pagina di ricerca
          </Link>
        </div>
      );
    }
    
    var dati_casa = this.state.dati_casa;
    var images = [dati_casa.img1, dati_casa.img2, dati_casa.img3, dati_casa.img4];
    var servizi = this.state.servizi;

    return (
       <>
       <div className="contieneContenitore">
         <div className="contenitoreRiepilogo">
           <StyledHero img={dati_casa.img1}>
             <Banner title={dati_casa.nome_proprieta}>
              <Link 
                to = {{
                  pathname: "/RisultatiRicerca",
                  state: {
                    case: this.state.datiRicerca,
                    posti: this.state.dati_casa.posti,
                    localita: this.state.dati_casa.localita,
                    tipo: this.state.dati_casa.tipo_proprieta,
                    checkIn: this.state.checkIn,
                    checkOut: this.state.checkOut,
                    tipo: this.state.tipo
                  }
                }}
                className = "return"
              >
                Ritorna alla pagina di ricerca
              </Link>
             </Banner>
           </StyledHero>
           
           <section className="single-room">
             <div className="single-room-images">
               {images.map(item => (
                 <img src={item} alt={"foto"} className="riepilogoImg"/>
               ))}
             </div>
             <div className="single-room-info">
               <article className="desc">
                 <h3>DETTAGLI</h3>
                 <p>{dati_casa.descrizione}</p>
               </article>
               <div className="sistemaPagina">
               <article className="info">
                 <h3>INFO</h3>
                 <h6>Prezzo: €{dati_casa.costo} per {dati_casa.ngiorni} {dati_casa.ngiorni === 1 ? 'giorno' : 'giorni'}</h6>
                 <h6>
                   Capacità massima: {dati_casa.posti} {dati_casa.posti === 1 ? 'persona' : 'persone'}
                 </h6>
                 <h6>Localita e indirizzo: {dati_casa.localita} ({dati_casa.provincia}), {dati_casa.indirizzo}</h6>
                 <h6>Tipo di alloggio: {dati_casa.tipo_proprieta === 'bb' ? 'Bed&Breakfast' : 'Casa vacanza'}</h6>
               </article>
               <article className="room-extras">
                 <h3>SERVIZI</h3>
                 <ul className="extras">
                   {servizi.map(item => (
                   <li>- {item}</li>
                   ))}
                 </ul>
               </article>
               </div>
             </div>
           </section>
           <Link 
              to = {{
                pathname: "/Prenota",
                state: {
                  dati: ''
                }
              }}
              className = "return"
            >
              <button className="bottonePrenota">PRENOTA</button>
            </Link>
           </div>
           </div>
       </>
     );
   }
}