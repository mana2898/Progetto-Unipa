import React, { useState, useMemo } from "react";
import camera from "../assets/camera.svg";   
import {Form} from "react-bootstrap"

import "./InserimentoProprietà.css";



const ModificaCasaVacanza = ({ history }) => {
  const [Nome, setNome] = useState("");
  const [Città, setCittà] = useState("");
  const [Via, setVia] = useState("");
  const[Provincia,setProvincia]= useState("");
  const[Servizi,setServizi]=useState("");
  const [Prezzo, setPrezzo] = useState("");
  const[Descrizione, setDescrizione]=useState("");
  const[PostiLetto,setPostiLetto]=useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
      //presumo sia il setting della data di caricamento e nick del prop

    data.append("thumbnail", thumbnail);
    data.append("Nome", Nome);
    data.append("Città", Città);
    data.append("Via", Via);
    data.append("Provincia", Provincia);
    data.append("Servizi", Servizi);
    data.append("Descrizione", Descrizione);
    data.append("PostiLetto",PostiLetto);
    data.append("Prezzo", Prezzo);
    
  };

  return (
      <div className="background">
    <div className="containerNew">
      <img alt="airbnb" id="logoAirbnb" />    
      <div className="contentNew">
        <form onSubmit={handleSubmit}>
            <input
              type="file"
            />  
          <input
              type="file"
             
            />
           
          

      
            <input
              type="file"
              
            />
            
          


          <label htmlFor="Nome">Nome</label>
          <input
            type="text"
            id="Nome"
            value={Nome}
            placeholder="Nome della casa"
            onChange={e => setNome(e.target.value)}
          />

          <label htmlFor="Città">Città</label>
          <input
            type="text"
            id="Città"
            value={Città}
            placeholder="Nome della città"
            onChange={e => setCittà(e.target.value)}
          />

          <label htmlFor="Via">Via</label>
          <input
            type="text"
            id="Via"
            value={Via}
            placeholder="indirizzo civico della casa"
            onChange={e => setVia(e.target.value)}
          />
           
           <label htmlFor="Provincia">Provincia</label>
          <input
            type="text"
            id="Provincia"
            value={Provincia}
            placeholder="Provincia della casa vacanza"
            onChange={e => setProvincia(e.target.value)}
          />

           <label htmlFor="Servizi">Servizi</label>
          <input
            type="text"
            id="Servizi"
            value={Servizi}
            placeholder="Elenco servizi"
            onChange={e => setServizi(e.target.value)}
          />
              <label htmlFor="Descrizione">Descrizione</label>
          <input
            type="text"
            id="Descrizione"
            value={Descrizione}
            placeholder="Descrizione della casa vacanza"
            onChange={e => setDescrizione(e.target.value)}
          />
       
             <Form.Group controlId="PostiLetto">
            <Form.Label>PostiLetto</Form.Label>
            <Form.Control value={PostiLetto}  placeholder="Posti letto della casa vacanza" as="select"   onChange={e => setPostiLetto(e.target.value)}  >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              </Form.Control>
          </Form.Group>
           
       
          <label htmlFor="Prezzo">Prezzo</label>
          <input
            type="text"
            id="Prezzo"
            value={Prezzo}
            placeholder="Prezzo della casa vacanza"
            onChange={e => setPrezzo(e.target.value)}
          />

          <button type="submit" className="btn">
            Carica
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ModificaCasaVacanza;