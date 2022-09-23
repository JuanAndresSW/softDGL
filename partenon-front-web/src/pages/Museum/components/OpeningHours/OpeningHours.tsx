import React, { useState } from "react";
import { Div } from "components/wrappers";
import { Button, Field, Message } from "components/formComponents";

import "./OpeningHours.css";
import postOpeningHours from "../../services/postOpeningHours";
import openingHours from "../../models/openingHours";

type props = {
    openingHours: openingHours,
    editing: boolean
}


export default function OpeningHours({openingHours, editing}: props) {
    const [success,     setSuccess] =   useState(false);

    const [monday,      setMonday] =    useState(openingHours?.monday);
    const [tuesday,     setTuesday] =   useState(openingHours?.tuesday);
    const [wednesday,   setWednesday] = useState(openingHours?.wednesday);
    const [thursday,    setThursday] =  useState(openingHours?.thursday);
    const [friday,      setFriday] =    useState(openingHours?.friday);
    const [saturday,    setSaturday] =  useState(openingHours?.saturday);
    const [sunday,      setSunday] =    useState(openingHours?.sunday);


    function sendHours() {
        postOpeningHours({
            monday:     monday,
            tuesday:    tuesday,
            wednesday:  wednesday,
            thursday:   thursday,
            friday:     friday,
            saturday:   saturday,
            sunday:     sunday
        }).then(response=>{
            if (response.ok) setSuccess(true);
        })
    }

    return (
        <div  className="opening-hours">
           {editing?

            <Div flex align="flex-end">
                <HourEditor day="Lunes"     bind={[monday,      setMonday]}     />
                <HourEditor day="Martes"    bind={[tuesday,     setTuesday]}    />
                <HourEditor day="Miércoles" bind={[wednesday,   setWednesday]}  />
                <HourEditor day="Jueves"    bind={[thursday,    setThursday]}   />
                <HourEditor day="Viernes"   bind={[friday,      setFriday]}     />
                <HourEditor day="Sábado"    bind={[saturday,    setSaturday]}   />
                <HourEditor day="Domingo"   bind={[sunday,      setSunday]}     />
                <Button onClick={()=>sendHours()}>+ agregar horarios</Button>
                {!success?null:<Message type="success" message="se han guardado los horarios" />}
            </Div>

            :

            <Div flex cond={openingHours !== null}>
                <Hours day="Lunes"      hours={openingHours?.monday}/>
                <Hours day="Martes"     hours={openingHours?.tuesday}/>
                <Hours day="Miércoles"  hours={openingHours?.wednesday}/>
                <Hours day="Jueves"     hours={openingHours?.thursday}/>
                <Hours day="Viernes"    hours={openingHours?.friday}/>
                <Hours day="Sábado"     hours={openingHours?.saturday}/>
                <Hours day="Domingo"    hours={openingHours?.sunday}/>
            </Div>
            }
            
        </div>

    )
}

function Hours({day, hours}: {day: string, hours: string}): JSX.Element {
    return <div>
        <p>{day}</p>
        <p>{hours?hours:'-'}</p>
    </div>
}

function HourEditor({day, bind}: {day: string, bind: [any, any]}): JSX.Element {
    return <Field label={day} bind={[bind[0], bind[1]]} />
 
}