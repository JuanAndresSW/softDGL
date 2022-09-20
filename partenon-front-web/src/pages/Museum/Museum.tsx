import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import MuseumBanner from "./components/MuseumBanner/MuseumBanner";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import OpeningHours from "./components/OpeningHours/OpeningHours";
import Expositions from "./components/Expositions/Expositions";
import Plan from "./components/Plan/Plan";

import { Section, Retractable, FlexDiv } from "components/wrappers";
import { Button } from "components/formComponents";

import getMuseum from "./services/getMuseum";
import museum from "./models/museum";
import { BiPencil, BiX } from "react-icons/bi";
import { museumID } from "utilities/constants";
import { BackArrow } from "components/standalone";



const placeholderMuseum: museum = {

    basicData: {
        name: "placeholderName",
        province: "province",
        city: "city",
        street: "street",
        addressNumber: "number",
        description: "descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription",
        banner: new Blob(),
    },
    
    plan: new Blob(),

    contact: [{
        type: "TWITTER",
        value: "@museum"
    },
    {
        type: "FACEBOOK",
        value: "@museum"
    }
    ],

    openingHours: {
        monday: "",
        tuesday: "8 a 12 y 2 a 6",
        wednesday: "8 a 12 y 2 a 6",
        thursday: "8 a 12 y 2 a 6",
        friday: "8 a 12 y 2 a 6",
        saturday: "8 a 12 y 2 a 6",
        sunday: "8 a 12 y 2 a 6"
    },
    expositions: [{
        name: "testExpo",
        category: "categ",
        photo: new Blob(),
        description: "description"
    }]
}


export default function Museum({hasEditingPermissions=false}: {hasEditingPermissions?: boolean}): JSX.Element {

    const museumIDAsVisitor = parseInt(useParams().id);

    const id = hasEditingPermissions ? museumID : museumIDAsVisitor; 
    useEffect(requestMuseum, [id]);

    function requestMuseum() {
        getMuseum(id).then(response=>{
            if (response.ok) setMuseum(response.content);
        });
    }

    const [museum, setMuseum]: [museum, React.Dispatch<SetStateAction<museum>>] = useState(placeholderMuseum);
    const [editing, setEditing] = useState(false);

    

    return <>

        {!hasEditingPermissions?null:
        <Button type={editing?'delete':'button'} onClick={()=>setEditing(!editing)} style={{position:"absolute", top:0, right:0}}>
        {editing?<BiX/>:<BiPencil/>}
        </Button>}
        

        <BackArrow/>
        <MuseumBanner       museumBasicData={placeholderMuseum.basicData}   editing={editing}/>

        <Section>

            <FlexDiv>
            <ContactInfo    contact={placeholderMuseum.contact}             editing={editing} />
            <OpeningHours   openingHours={placeholderMuseum.openingHours}   editing={editing} />
            <Plan           plan={placeholderMuseum.plan}                   editing={editing} />
            </FlexDiv>   

            <Retractable    label="Exposiciones">
            <Expositions    expositions={placeholderMuseum.expositions}     editing={editing} />
            </Retractable>
            
        </Section>
    </>    
}