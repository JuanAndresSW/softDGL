import { Field } from "components/formComponents";
import { Section } from "components/wrappers";
import React, { useEffect, useState } from "react";
import "./TitleScreen.css";

export default function TitleScreen(): JSX.Element {

  const [museums, setMuseums] = useState(undefined);
  const [page, setPage] = useState(0);
  const [q, setQ] = useState('');


  useEffect(search, [page]);

  function search() {

  }

  return (
    <div className="title-wrapper">
      <h1>Partenón</h1>
      <h2>Crea y visita museos, solicita turnos y diviértete.</h2>

      <Section label="">
        <form onSubmit={(e)=>{e.preventDefault();search()}}>
          <Field type="search" placeholder="encuentra un museo..." bind={[q, setQ]} />
          <b style={{padding: '0 1rem', cursor: 'pointer'}} title="buscar" onClick={()=>search()} >🧐</b>
        </form>

        
        

      </Section>
    </div>
  );
}