import { Section } from "components/wrappers";
import React from "react";
import "./TitleScreen.css";

/**Título de la aplicación con inputs de credenciales para iniciar sesión. */
export default function TitleScreen(): JSX.Element {


  function search(e?: React.FormEvent<HTMLFormElement>) {

  }

  return (
    <div className="title-wrapper">
      <h1>Partenón</h1>
      <h2>Crea y visita museos, solicita turnos y diviértete.</h2>

      <Section label="">
        <form onSubmit={(e)=>search(e)}>
          <input type="search" placeholder="encuentra un museo..." />
          <b style={{padding: '0 1rem', cursor: 'pointer'}} title="buscar" onClick={()=>search()} >🧐</b>
        </form>
      </Section>
    </div>
  );
}