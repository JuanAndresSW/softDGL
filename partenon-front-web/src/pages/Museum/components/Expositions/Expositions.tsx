import React, { useState } from "react";
import Exposition from "./Exposition/Exposition";
import {Button, Field, Image, Message, Textarea} from "components/formComponents";
import { Div } from "components/wrappers";
import postExposition from "../../services/postExposition";
import "./Expositions.css";

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

    const [success, setSuccess] = useState(false);

    function saveNewExpo() {
        postExposition({
            name:        name,
            category:    category,
            photo:       photo,
            description: description
        })
        .then(response=>{
            if (response.ok) {
                setPhoto(null);
                setSuccess(true);
                setName(null);
                setCategory(null);
                setDescription(null);
            }
        })
    }

    return <div className="expositions">

        {expositions.map((exposition)=><Exposition key={exposition.name} exposition={exposition}/>)}

        <Div flex cond={editing}>
            
            <Image setter={setPhoto} img={photo}/>

            <div>
            <Field label="nombre" bind={[name, setName]}/>
            <Field label="categoría" bind={[category, setCategory]}/>
            </div>

            <div>
            <Textarea label="descripción" maxLength={100} bind={[description, setDescription]}/>
            <Button onClick={()=>saveNewExpo()}>+ nueva exposición</Button>
            </div>
            <Div cond={success}>
            <Message type="success" message="Se ha agregado una nueva exposición" />
            </Div>
            
        </Div>
    </div>
}
