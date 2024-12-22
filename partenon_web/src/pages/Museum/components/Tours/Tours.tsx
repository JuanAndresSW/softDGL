import React, { useState } from "react";
import { Div } from "components/wrappers";
import { Button, Field, Message, Textarea } from "components/formComponents";
import tour from "pages/Museum/models/tour";

import "./Tours.css";
import postTour from "pages/Museum/services/postTour";


type props = {
    tours:   tour[],
    editing: boolean,
    setTours: Function
}


export default function Tours({tours, editing, setTours}: props) {


    const [success,     setSuccess] =   useState(false);

    const [tourName, setTourName]                           = useState();
    const [tourDescription, setTourDescription]             = useState();
    const [tourDurationInMinutes, setTourDurationInMinutes] = useState();


    function addTour() {
        setTours({
            name: tourName,
            description: tourDescription,
            duration: tourDurationInMinutes
        })

        //TODO: make it work with the actual postTour service, instead of local state.
        //postTour(null).then(response=>{if (response.ok) setSuccess(true);})
    }
    

    return <div className="tours">
        
        <Div cond={tours?.length>0}>
            <h2>Recorridos</h2>
            <Div flex justify="flex-start">
                {tours?.map((tour, i) => <Tour tour={tour} key={i} />)}
            </Div>
        </Div>

        <Div flex cond={editing} align="flex-end">
            <Field bind={[tourName, setTourName]} label="nombre del recorrido" />
            <Textarea label="descripción del recorrido" bind={[tourDescription, setTourDescription]} />
            <Field bind={[tourDurationInMinutes, setTourDurationInMinutes]} label="duración en minutos" />
            <Button onClick={()=>addTour()} >+ agregar recorrido</Button>
        </Div>

        <Div cond={success}><Message type="success" message={"Se ha creado el recorrido "+tourName} /></Div>
            
    </div>
}




function Tour({tour}: {tour: tour}): JSX.Element {

    return <div className="tour">

        <h2>{tour.name}</h2>
        <p><span>Duración: {tour.duration} minutos</span></p>
        <p>{tour.description}</p>
        

    </div>
}