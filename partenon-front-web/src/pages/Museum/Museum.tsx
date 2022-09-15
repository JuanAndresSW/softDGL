import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import MuseumBanner from "./components/MuseumBanner/MuseumBanner";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import { Section, Retractable, FlexDiv } from "components/wrappers";
import { Button, Field, Form, Message, Select } from "components/formComponents";

import getMuseum from "./services/getMuseum";
import museum from "./models/museum";
import { Plus } from "components/standalone";
import { BiPlus } from "react-icons/bi";




const placeholderMuseum = {
    museumName: "placeholderName",
    province: "province",
    city: "city",
    street: "street",
    addressNumber: "number",
    description: "descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription",
    banner: "new File(undefined, undefined)",
    plan: "new File(undefined, undefined)",

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
        photo: "new File(undefined, undefined)",
        description: "description"
    }]
}



/**Application's global component.*/
export default function Museum(): JSX.Element {

    const {IDUser} = useParams();
    const [museum, setMuseum]: [any, React.Dispatch<SetStateAction<any>>] = useState(placeholderMuseum);


    

    useEffect(requestMuseum, [IDUser]);

    function requestMuseum() {
        if (!IDUser) return;
        getMuseum(parseInt(IDUser)).then(response=>{
            if (response.ok) setMuseum(response.content);
        })
    }

    return <>
        <MuseumBanner/>
      
        <Section>

            <div style={{maxWidth: "700px", margin:"0 auto"}}>

            <ContactInfo contact={placeholderMuseum.contact} />

            


            </div>

        </Section>
            
        
        
    
    </>
        
}


