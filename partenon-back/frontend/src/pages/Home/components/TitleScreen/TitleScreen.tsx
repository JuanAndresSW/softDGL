import { Field } from "components/formComponents";
import { Div, Section } from "components/wrappers";
import { Loading, Pagination } from "components/standalone";
import MuseumItem from "../MuseumItem/MuseumItem";
import React, { useEffect, useState } from "react";
import shortMuseum from "../../models/shortMuseum";
import "./TitleScreen.css";
import parthenon from "assets/parthenon.jpg";
import getMuseums from "../../services/getMuseums";
import listOfMuseums from "pages/Home/models/listOfMuseums";



export default function TitleScreen(): JSX.Element {

  const [museums,     setMuseums]: [shortMuseum[], React.Dispatch<React.SetStateAction<shortMuseum[]>>] = useState([]);
  const [totalPages,  setTotalPages] =  useState(0);
  const [last,        setLast] =        useState(true);

  const [q,           setQ] =           useState('');
  const [page,        setPage] =        useState(0);
 

  useEffect(search, [q])

  function search() {

    getMuseums(q, page, "museumName").then(response=>{
      if (!response?.ok) return;

      const listOfMuseums: listOfMuseums = response.content;
      setMuseums    (listOfMuseums.museums);
      setTotalPages (listOfMuseums.totalPages);
      setLast       (listOfMuseums.last);
    });
  }

  return (
    <div className="title-screen">
      <h1>Partenón</h1>
      <h2>Crea y visita museos, solicita turnos y diviértete.</h2>

      <Section>
        <form onSubmit={ e => {e.preventDefault(); search();} }>

          <input type="search" placeholder="encuentra un museo..." value={q} onChange={(e)=>setQ(e.target.value)} />

          <Pagination page={page} setPage={setPage} totalPages={totalPages} last={last} />

          {(museums?.length > 0)? 

            <Div flex className="list-of-museums">

            {museums.map((museum)=> <MuseumItem  museum={museum} key={museum.ID.toString()} />)}

            </Div>

            :

            <img id="partenon-drawing" src={parthenon} alt="" />
          
        
          }

        </form>

      </Section>
    </div>
  );
}