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

    const [success, setSuccess] = useState(false);

    async function save() {
        const bannerResponse = await postBanner(banner);
        const descResponse   = await postDescription(description);

        if (bannerResponse.ok && descResponse.ok) setSuccess(true);
    }
    

    return <div data-museum-banner>

        {editing? <>

        <Div flex><Image setter={setBanner} img={banner?.size>666?banner:null} /></Div>
        <Textarea maxLength={200} label="Descripción" bind={[description, setDescription]} />
        <Div flex><Button onClick={()=>save()}>Guardar</Button></Div>
     
        <Div cond={success}><Message type="success" message="Se han guardado los datos" /></Div>
        </>

        :
        
        <>
        <Div flex>
            <img src={museumBasicData.banner?.size>10? URL.createObjectURL(museumBasicData.banner) : ''} alt="" />
            <h2>{museumBasicData.name}</h2>
        </Div>

        <h3>{museumBasicData.province + ' ' + museumBasicData.city + ', ' + museumBasicData.street + ' ' + museumBasicData.addressNumber}</h3>
        <p>{museumBasicData.description}</p>
        </>
        }
    </div>
}