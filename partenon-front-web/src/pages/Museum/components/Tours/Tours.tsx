import React, { useState } from "react";
import { Div } from "components/wrappers";
import { Button, Field, Dropdown, Message, DateTime } from "components/formComponents";
import {languages} from "utilities/constants";
import postTour from "../../services/postTour";
import postAppointment from "../../services/postAppointment";
import "./Tours.css";


type props = {
    tours:   string[],
    editing: boolean
}


export default function Tours({tours, editing}: props) {

    const [success,     setSuccess] =   useState(false);
    const [newTourName, setNewTourName] = useState();

    function addTour() {
        postTour(newTourName).then(response=>{
            if (response.ok) setSuccess(true);
        })
    }

    return <div  className="tours">
        
        <Div cond={tours?.length>0}>
            {tours?.map((tour, i) => <Tour name={tour} key={i} />)}
        </Div>

        <Div flex cond={editing} align="flex-end">
            <Field bind={[newTourName, setNewTourName]} label="nombre del recorrido" />
            <Button onClick={()=>addTour()} >+ agregar recorrido</Button>
        </Div>

        <Div cond={success}><Message type="success" message="Se ha creado el recorrido" /></Div>
            
    </div>
}

function Tour({name}: {name: string}): JSX.Element {
    
    const [addingNewAppointment, setAddingNewAppointment] = useState(false);
    const [date, setDate] = useState('');
    const [language, setLanguage] = useState("Español");
    const [requestName, setRequestName] = useState();

    const [success, setSuccess] = useState(false);

    function saveNewAppointment() {
        postAppointment({
            language: language,
            date:   date,
            name: requestName,
            tour: name
        }).then(response=>setSuccess(response.ok))
    }

    return <div className="tour">

        <Div flex>
            <h2>{name}</h2>
            <Button onClick={()=>setAddingNewAppointment(!addingNewAppointment)} >
                {addingNewAppointment?"cerrar":"+ pedir turno"}
            </Button>
        </Div>
        

        <Div flex cond={addingNewAppointment}>
            <DateTime value={date} onChange={setDate} />
            <Dropdown options={languages} value={language} onChange={setLanguage} />
            <Field label="Tu nombre" bind={[requestName, setRequestName]} />
            <Button onClick={()=>saveNewAppointment()}>enviar</Button>
            
            <Div cond={success}>
            <Message type="success" message="Se ha registrado tu turno" />
            </Div>
        </Div>
    </div>
}