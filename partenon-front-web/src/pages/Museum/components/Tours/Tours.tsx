import React, { useState } from "react";
import { Div, Retractable } from "components/wrappers";
import { Button, Field, Dropdown, Message, DateTime } from "components/formComponents";
import {languages} from "utilities/constants";
import tour from "../../models/tour";
import postTour from "../../services/postTour";
import "./Tours.css";


type props = {
    tours: tour[],
    editing: boolean,
    isAdmin: boolean
}


export default function Tours({tours, isAdmin, editing}: props) {

    const [success,     setSuccess] =   useState(false);
    const [newTourName, setNewTourName] = useState();

    function addTour() {
        postTour(newTourName).then(response=>{
            if (response.ok) setSuccess(true);
        })
    }

    return <div  className="tours">
        
        <Div cond={tours?.length>0}>
            {tours?.map(tour=>
            
            <div key={tour.ID} className="tour">

                <Tour name={tour.name} ID={tour.ID} key={tour.ID} />
            
                <Div cond={isAdmin}>
                    <Retractable label="Turnos pedidos">
                    
                    <ol>
                    {tour.appointments?.map((appointment, i)=>
                    <Div flex className="appointment" key={i}>
                        <li>{appointment.date}: {appointment.language}</li>
                    </Div>)}
                    </ol>

                    </Retractable>
                </Div>

            </div>)}
        </Div>

        <Div flex cond={editing} align="flex-end">
            <Field bind={[newTourName, setNewTourName]} label="nombre del recorrido" />
            <Button onClick={()=>addTour()} >+ agregar recorrido</Button>
        </Div>

        <Div cond={success}><Message type="success" message="Se ha creado el recorrido" /></Div>
            
    </div>
}

function Tour({name, ID}: {name: string, ID: number}): JSX.Element {
    
    const [addingNewAppointment, setAddingNewAppointment] = useState(false);
    const [date, setDate] = useState();
    const [language, setLanguage] = useState();

    function saveNewAppointment() {
        console.log(ID);
    }

    return <>

        <Div flex>
            <h2>{name}</h2>
            <Button onClick={()=>setAddingNewAppointment(!addingNewAppointment)} >
                {addingNewAppointment?"cerrar":"+ pedir turno"}
            </Button>
        </Div>
        

        <Div flex cond={addingNewAppointment}>
            <DateTime nonPast value={date} onChange={setDate} />
            <Dropdown options={languages} value={language} onChange={setLanguage} />
            <Button onClick={()=>saveNewAppointment()}>enviar</Button>
        </Div>
    </>
}