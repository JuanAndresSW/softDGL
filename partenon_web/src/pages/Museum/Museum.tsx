//React.
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";

//Componentes locales.
import MuseumBanner from "./components/MuseumBanner/MuseumBanner";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import OpeningHours from "./components/OpeningHours/OpeningHours";
import Expositions from "./components/Expositions/Expositions";
import Plan from "./components/Plan/Plan";
import Tours from "./components/Tours/Tours";
import Appointments from "./components/Appointments/Appointments";

//Componentes globales.
import { Section, Div } from "components/wrappers";
import { Loading, NavBar } from "components/standalone";
import { BiHome, BiLogOut, BiPencil, BiRefresh, BiX } from "react-icons/bi";

//Servicios.
import getMuseum from "./services/getMuseum";
import closeSession from "services/closeSession";

//Otros.
import museum from "./models/museum";
import { museumID } from "utilities/constants";
import "./Museum.css";
import tour from "./models/tour";
import exposition from "./models/exposition";


//Configuración de las pestañas.
const paths = {
    info:           "/info",
    expositions:    "/exposiciones",
    appointments:   "/turnos"
}
const tabs = [
    {path:paths.info,           label:'info'},
    {path:paths.expositions,    label:'exposiciones'},
    {path:paths.appointments,   label:'turnos'}
]


/**Página para ver/editar un museo. Qué museo mostrar se decide en base a la URL. */
export default function Museum({hasEditingPermissions=false}): JSX.Element {
    
    const {id} = useParams();
    const museumToRequestID = hasEditingPermissions ? museumID : parseInt(id);
    
    const [editing, setEditing] = useState(false);
    const [museum, setMuseum]: [museum, Dispatch<SetStateAction<museum>>] = useState(null);

    
    useEffect(requestMuseum, [museumToRequestID, editing]);


    function requestMuseum() {
        getMuseum(museumToRequestID).then(response=>{
            if (response.ok) setMuseum({...response.content, tours:museum?.tours, expositions: museum?.expositions});
        });
    }


    const MusemInfo =
    <Div>
        <Div flex>
            <ContactInfo    contacts={museum?.contacts}           editing={editing} />
            <OpeningHours   openingHours={museum?.openingHours}   editing={editing} />
        </Div>
        <Plan           plan={museum?.plan}                   editing={editing} />
        <Tours          tours={museum?.tours}                 editing={editing} setTours={(t:tour)=>setMuseum({...museum, tours: [t]})}/>
    </Div>

 
    return museum===null? <Loading/> : <>

        <Div flex justify="flex-end" className="museum-options">

            <Div>
                <p>{museum.basicData.name}</p>
                <p><span>{museum.basicData.province + ' ' + museum.basicData.city + ', ' + museum.basicData.street + ' ' + museum.basicData.addressNumber}</span></p>
            </Div>

            <div title="inicio"><Link to="/"><BiHome /></Link></div>

            <Div cond={hasEditingPermissions}><div  title="cerrar sesión" onClick={()=>closeSession()}><BiLogOut /></div></Div>

            <Div cond={hasEditingPermissions}><div onClick={()=>setEditing(!editing)}>{editing?<BiX title="cerrar editar"/>:<BiPencil title="editar"/>}</div></Div>
            
        </Div>
        
        

        <MuseumBanner museumBasicData={museum.basicData}   editing={editing}/>

        <Section>

            <NavBar tabs={tabs} />

            <Routes>
                <Route index                      element={<Navigate to={'.'+paths.info}/>} />

                <Route path={paths.appointments}  element={<Appointments isAdmin={hasEditingPermissions} appointments={museum.appointments} />}        />
                <Route path={paths.info}          element={MusemInfo}        />
                <Route path={paths.expositions}   element={<Expositions expositions={museum.expositions} editing={editing} setExpositions={(e: exposition)=>setMuseum({...museum, expositions: [e]})} />} />

                <Route path="*"                   element={<Navigate to={"/"} />} />
            </Routes>
            
        </Section>
    </>    
}