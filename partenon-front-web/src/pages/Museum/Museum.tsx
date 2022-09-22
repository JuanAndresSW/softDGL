import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Componentes locales.
import MuseumBanner from "./components/MuseumBanner/MuseumBanner";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import OpeningHours from "./components/OpeningHours/OpeningHours";
import Expositions from "./components/Expositions/Expositions";
import Plan from "./components/Plan/Plan";
import Tours from "./components/Tours/Tours";
import Appointments from "./components/Appointments/Appointments";


//Componentes globales.
import { Section, Retractable, Div } from "components/wrappers";
import { Button } from "components/formComponents";
import { BackArrow, Loading } from "components/standalone";
import { BiLogOut, BiPencil, BiRefresh, BiX } from "react-icons/bi";

//Otros.
import getMuseum from "./services/getMuseum";
import closeSession from "services/closeSession";
import museum from "./models/museum";
import { museumID } from "utilities/constants";

const testTours = [
    {
        ID: 1,
        name: "name",
        appointments: [{
            language: "lang",
            date: "date"
        }]
    }
]

export default function Museum({hasEditingPermissions=false}): JSX.Element {

    const {id} = useParams();
    const ID = hasEditingPermissions ? museumID : parseInt(id);
    useEffect(requestMuseum, [ID]);

    const [museum, setMuseum]: [museum, React.Dispatch<SetStateAction<museum>>] = useState(null);
    const [editing, setEditing] = useState(false);

    function requestMuseum() {
        if (Number.isInteger(ID))
        getMuseum(ID).then(response=>{
            if (response.ok) setMuseum(response.content);
        });
    }

 
    return museum===null? <Loading/> : <>

        <Div flex cond={hasEditingPermissions} justify="flex-end" style={{width:"max-content", position:"absolute", top:0, right:0}}>

            <Button title="cerrar sesión" type={'delete'} onClick={()=>closeSession()}><BiLogOut/></Button>

            <Button title="editar" type={editing?'delete':'button'} onClick={()=>setEditing(!editing)}>
            {editing?<BiX/>:<BiPencil/>}
            </Button>

        </Div>

        <BiRefresh style={{position:"absolute", top:70, right:20, color:'#fff', fontSize:'2rem'}} title='refrescar' onClick={()=>requestMuseum()} />
        <BackArrow/>
        <MuseumBanner museumBasicData={museum.basicData}   editing={editing}/>

        <Section>

            <Div flex>
                <ContactInfo    contacts={museum.contacts}           editing={editing} />
                <OpeningHours   openingHours={museum.openingHours}   editing={editing} />
                <Plan           plan={museum.plan}                   editing={editing} />
            </Div>   

            <Div cond={museum.expositions.length>0||editing}>
                <Retractable     label="Exposiciones">
                    <Expositions expositions={museum.expositions}     editing={editing} />
                </Retractable>
            </Div>


            <Div cond={museum.tours?.length>0||editing}>
                <Retractable     label="Recorridos">
                    <Tours tours={museum.tours} editing={editing} />
                </Retractable>
            </Div>


            <Div cond={hasEditingPermissions}>
                <Appointments appointments={museum.appointments} />
            </Div>

            
        </Section>
    </>    
}