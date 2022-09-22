import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Componentes locales.
import MuseumBanner from "./components/MuseumBanner/MuseumBanner";
import Expositions from "./components/Expositions/Expositions";

//Componentes globales.
import { Section, Div } from "components/wrappers";
import { BackArrow, Loading } from "components/standalone";

//Otros.
import getMuseum from "./services/getMuseum";
import museum from "./models/museum";


const museumt: museum = {
    basicData: {
        name: "Name",
        province: "province",
        city: "city",
        street: "street",
        addressNumber: "addressN",
        description: "desc",
    },
    expositions: [{
        ID: 4,
        name: "name",
        category: "categ",
        description: "description"
    }]
}


export default function Museum(): JSX.Element {

    const {id} = useParams();
    const [museum, setMuseum]: [museum, React.Dispatch<SetStateAction<museum>>] = useState(museumt);
    useEffect(requestMuseum);

    function requestMuseum() {
        if (Number.isInteger(parseInt(id)))

        getMuseum(parseInt(id)).then(response=>{
            if (response.ok) setMuseum(response.content);
        });
    }

 
    return museum===null? <Loading/> : <>

        <BackArrow/>
        <MuseumBanner museumBasicData={museum.basicData}  />

        <Section>
 
            <Div cond={museum.expositions.length>0}>
                <h1 style={{fontFamily: "monospace"}}>Exposiciones</h1>
                <Expositions expositions={museum.expositions}   />
            </Div>

        </Section>
    </>    
}