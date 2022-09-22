import { Div, Section } from "components/wrappers";
import { Loading, Pagination } from "components/standalone";
import MuseumItem from "../MuseumItem/MuseumItem";
import React, { useState } from "react";
import shortMuseum from "../../models/shortMuseum";
import "./TitleScreen.css";
import parthenon from "assets/parthenon.jpg";
import getMuseums from "../../services/getMuseums";
//import listOfMuseums from "pages/Home/models/listOfMuseums";



export default function TitleScreen(): JSX.Element {

  const [museums,     setMuseums]: [shortMuseum[], React.Dispatch<React.SetStateAction<shortMuseum[]>>] = useState([]);
  const [totalPages,  setTotalPages] =  useState(0);
  const [last,        setLast] =        useState(true);

  const [q,           setQ] =           useState('');
  const [page,        setPage] =        useState(0);
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

      <Section label="">
        <form onSubmit={(e)=>{e.preventDefault();search()}}>

          <label htmlFor="q">Busca un museo por nombre</label>
          <input id="q" type="search" placeholder="encuentra un museo..." value={q} onChange={q=>setQ(q.target.value)} />

          <Pagination page={page} setPage={setPage} totalPages={totalPages} last={last} />

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