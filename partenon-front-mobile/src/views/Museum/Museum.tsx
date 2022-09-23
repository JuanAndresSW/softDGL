import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Componentes locales.
import MuseumBanner from "./components/MuseumBanner/MuseumBanner";
import Expositions from "./components/Expositions/Expositions";

//Componentes globales.
import { Section, Div } from "components/wrappers";

//Otros.
import getMuseum from "./services/getMuseum";
import museum from "./models/museum";

import {getDummyMuseumByID} from "dummy";
import { BackArrow } from "components/standalone";

export default function Museum(): JSX.Element {

    const {id} = useParams();
    const [museum, setMuseum]: [museum, React.Dispatch<SetStateAction<museum>>] = useState();
    useEffect(requestMuseum);

    function requestMuseum() {
        if (Number.isInteger(parseInt(id)))

        setMuseum(getDummyMuseumByID(parseInt(id)))

        getMuseum(parseInt(id)).then(response=>{
            if (response.ok) setMuseum(response.content);
        });
    }

 
    return <>

        <BackArrow />
        <MuseumBanner museumBasicData={{name: museum?.name, description: museum?.description}}  />

        <Section>
 
            <Div cond={museum?.expositions?.length>0}>
                <h1 style={{fontFamily: "monospace"}}>Exposiciones</h1>
                <Expositions expositions={museum?.expositions}   />
            </Div>

        </Section>
    </>    
}