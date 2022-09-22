import { Field } from "components/formComponents";
import { Div, Section } from "components/wrappers";
import { Loading } from "components/standalone";
import MuseumItem from "../MuseumItem/MuseumItem";
import React, { useEffect, useState } from "react";
import shortMuseum from "../../models/shortMuseum";
import "./TitleScreen.css";
import parthenon from "assets/parthenon.jpg";
import getMuseums from "../../services/getMuseums";
//import listOfMuseums from "pages/Home/models/listOfMuseums";



export default function TitleScreen(): JSX.Element {

  const [museums,     setMuseums]: [shortMuseum[], React.Dispatch<React.SetStateAction<shortMuseum[]>>] = useState([]);
  //const [totalPages,  setTotalPages] =  useState(0);
  //const [last,        setLast] =        useState(true);

  const [q,           setQ] =           useState('');
  //const [page,        setPage] =        useState(0);
  const [loading,     setLoading] =     useState(false);
 

  function search() {
    setLoading(true);

    getMuseums(q).then(response=>{

      if (!response?.ok) return;
      setMuseums    (response.content);
      setLoading    (false);
    });
  }

  return (
    <div className="title-wrapper">
      <h1>Partenón</h1>
      <h2>Crea y visita museos, solicita turnos y diviértete.</h2>

      <Section label="">
        <form onSubmit={(e)=>{e.preventDefault();search()}}>
          <Field type="search" placeholder="encuentra un museo..." bind={[q, setQ]} />
          <b style={{padding: '0 1rem', cursor: 'pointer'}} title="buscar" onClick={()=>search()} >🧐</b>



          {/* <Pagination page={page} setPage={setPage} totalPages={totalPages} last={last} /> */}

          <Div cond={loading}><Loading /></Div>

          {(museums?.length > 0)? 

            <Div flex className="list-of-museums">

            {museums.map((museum)=> <MuseumItem  museum={museum} key={museum.ID.toString()} />)}

            </Div>

            :

            <img src={parthenon} alt="" />
          
        
          }

        </form>

      </Section>
    </div>
  );
}