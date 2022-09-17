import React, { useState } from "react";
import Exposition from "./Exposition/Exposition";
import "./Expositions.css";
import {Button, Field, Image, Textarea} from "components/formComponents";
import { FlexDiv } from "components/wrappers";

type props = {
expositions: {  
    name: string,
    category: string,
    photo: Blob,
    description: string
   }[],
   editing: boolean
}

export default function Expositions({expositions, editing}: props) {
    const [photo, setPhoto] = useState();
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();

    return <div className="expositions">
        {expositions.map((exposition)=><Exposition exposition={exposition}/>)}


        {!editing?null:
        
        <FlexDiv>
            <Image setter={setPhoto} img={photo}/>

            <div>
            <Field label="nombre" bind={[name, setName]}/>
            <Field label="categoría" bind={[category, setCategory]}/>
            </div>

            <div>
            <Textarea label="descripción" maxLength={100} bind={[description, setDescription]}/>
            <Button>Nuevo</Button>
            </div>
            
        </FlexDiv>}
    </div>
}
