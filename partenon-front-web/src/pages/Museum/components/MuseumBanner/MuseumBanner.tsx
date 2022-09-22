import React, { useState } from "react";


import { Button, Message, Image, Textarea } from "components/formComponents";
import { Div } from "components/wrappers";
import postBanner from "../../services/postBanner";
import postDescription from "../../services/postDescription";
import './MuseumBanner.css';

type props = {
    museumBasicData: {
        banner: Blob,
        name: string,
        province: string,
        city: string,
        street: string,
        addressNumber: string,
        description: string
    },
    editing: boolean
}

/**Encabezado con un logo, foto, titulo y dirección del museo.*/
export default function MuseumBanner({museumBasicData, editing}: props): JSX.Element {

    const [banner, setBanner] =                 useState(museumBasicData.banner);
    const [description, setDescription] =       useState(museumBasicData.description);

    const [error, setError] = useState("");

    function save() {
        postBanner(banner);
        postDescription(description);
    }
    

    return <div data-museum-banner>

        {editing? <>

        <Div flex><Image setter={setBanner} img={banner} /></Div>
        <Textarea maxLength={200} label="Descripción" bind={[description, setDescription]} />
        <Div flex><Button onClick={()=>save()}>Guardar</Button></Div>
     
        <Message type="error" message={error} />
        </>

        :
        
        <>
        <Div flex>
            <img src={URL.createObjectURL(museumBasicData.banner)} alt="" />
            <h2>{museumBasicData.name}</h2>
        </Div>

        <h3>{museumBasicData.province + ' ' + museumBasicData.city + ', ' + museumBasicData.street + ' ' + museumBasicData.addressNumber}</h3>
        <p>{museumBasicData.description}</p>
        </>
        }
    </div>
}