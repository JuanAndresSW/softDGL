import React, { useEffect, useState } from "react";
import { useNavigate }                from "react-router-dom";

import { base64ToBlob }               from "utilities/conversions";

import { Button, Message }            from "components/formComponents";
import { Confirm }                    from "components/wrappers";
import './MuseumBanner.css';
import testBanner from "assets/svg/default-photo.svg";
import { BiPencil } from "react-icons/bi";

/**Encabezado con un logo, foto, titulo y dirección del museo. Permite borrar el museo.*/
export default function MuseumBanner(): JSX.Element {
    const [banner, setBanner] = useState(testBanner);
    const [museumName, setMuseumName] = useState("Name");
    const [province, setProvince] = useState(undefined);
    const [city, setCity] = useState(undefined);
    const [street, setStreet] = useState(undefined);
    const [addressNumber, setAddressNumber] = useState(undefined);
    const [description, setDescription] = useState("undefined...");


    const [error, setError] = useState("");
    

    useEffect(()=>{
        //base64ToBlob(branch.photo).then(logoAsBlob=>{
        //setPhoto(URL.createObjectURL(logoAsBlob));
        //});
    }, []);

    return (
        <div data-museum-banner>
          <img src={banner?banner:null} alt="" />
          <h2>{museumName}</h2>
          <h3>{province + ' ' + city + ', ' + street + ' ' + addressNumber}</h3>
  
          

          <div style={{position:"absolute", top:0, right:0}}>
          <Button><BiPencil/></Button>
          </div>

          <p>{description}</p>
          
          <Message type="error" message={error} />
        </div>
    );
}