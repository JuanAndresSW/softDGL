import React, { useState } from "react";
import Exposition from "./Exposition/Exposition";
import {Button, DateTime, Field, Form, Image, Message, Textarea} from "components/formComponents";
import { Div } from "components/wrappers";
import postExposition from "../../services/postExposition";
import "./Expositions.css";
import exposition from "pages/Museum/models/exposition";
import piece from "pages/Museum/models/piece";

type props = {
expositions: exposition[],
   editing: boolean,
   setExpositions: Function
}

export default function Expositions({expositions, editing, setExpositions}: props) {
    
    const [name,        setName] =          useState();
    const [category,    setCategory] =      useState();
    const [description, setDescription] =   useState();
    const [startDate,   setStartDate] =     useState();
    const [endDate,     setEndDate] =       useState();
    

    const [success, setSuccess] = useState(false);

    //TODO: delete this.
    function setPiece(piece: piece) {
        setExpositions({
            ID: expositions[0].ID,
            name: expositions[0].name,
            category: expositions[0].category,
            description: expositions[0].description,
            startDate: expositions[0].startDate,
            endDate: expositions[0].endDate,
            pieces: [piece]
        })
    }

    function saveNewExpo() {

        setExpositions({
            ID: 0,
            name: name,
            category: category,
            description: description,
            startDate: startDate,
            endDate: endDate,
            pieces: []
        })

        setSuccess(true);

        //TODO: implement service.
        /* postExposition({
            name:        name,
            category:    category,
            description: description,
            startDate: '',
            endDate: '',
            pieces: []
        })
        .then(response=>{
            if (response.ok) {
     
                setSuccess(true);
                setName(null);
                setCategory(null);
                setDescription(null);
            }
        }) */
    }

    return <div className="expositions">

        {expositions?.map((exposition, i)=><Exposition setPiece={(newpiece:any)=>{setPiece(newpiece)}} editing={editing} key={i} exposition={exposition}/>)}



        <Div cond={editing}>
            

            <Div flex>
                <Field label="nombre" bind={[name, setName]}/>
                <Field label="categoría" bind={[category, setCategory]}/>

                <div>
                    <DateTime label="fecha de inicio" value={startDate} onChange={setStartDate}/>
                    <DateTime label="fecha de fin" value={endDate}   onChange={setEndDate}/>
                </div>
                
                <Textarea label="descripción" maxLength={100} bind={[description, setDescription]}/>
            </Div>

            <Div flex><Button onClick={()=>saveNewExpo()}>+ nueva exposición</Button></Div>

            <Div cond={success}><Message type="success" message="Se ha agregado una nueva exposición" /></Div>

            
        </Div>
    </div>
}
