import React, { useEffect, useState } from "react";
import { useNavigate }                from "react-router-dom";

import { base64ToBlob }               from "utilities/conversions";

import { Button, Message, Image, Field, Textarea, Dropdown }            from "components/formComponents";
import { Confirm, FlexDiv }                    from "components/wrappers";
import './MuseumBanner.css';
import { provinces } from "utilities/constants";
import { BiSave } from "react-icons/bi";

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
    const [name, setName] =                     useState(museumBasicData.name);
    const [province, setProvince] =             useState(museumBasicData.province);
    const [city, setCity] =                     useState(museumBasicData.city);
    const [street, setStreet] =                 useState(museumBasicData.street);
    const [addressNumber, setAddressNumber] =   useState(museumBasicData.addressNumber);
    const [description, setDescription] =       useState(museumBasicData.description);


    const [error, setError] = useState("");
    

    return <div data-museum-banner>

        {editing? <>


        <FlexDiv>
            <Image setter={setBanner} img={banner} />
            <Field label="nombre" bind={[name, setName]} />
        </FlexDiv>

        <FlexDiv>
            <Dropdown options={provinces} value={province} onChange={setProvince} />
            <Field label="ciudad" bind={[city, setCity]} />
            <Field label="calle" bind={[street, setStreet]} />
            <Field label="altura" bind={[addressNumber, setAddressNumber]} />
        </FlexDiv>

        <Textarea maxLength={200} label="Descripción" bind={[description, setDescription]} />
        <FlexDiv><Button>Guardar</Button></FlexDiv>
        

        
     
        <Message type="error" message={error} />
        </>

        :
        
        <>
        <FlexDiv>
            <img src={banner.size ? URL.createObjectURL(banner) : null} alt="" />
            <h2>{name}</h2>
        </FlexDiv>

        <h3>{museumBasicData.province + ' ' + museumBasicData.city + ', ' + museumBasicData.street + ' ' + museumBasicData.addressNumber}</h3>
        <p>{museumBasicData.description}</p>
        </>
        }
    </div>
}