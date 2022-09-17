import React, { useState } from "react";
import { FlexDiv } from "components/wrappers";
import { Button, Field, Message, Select } from "components/formComponents";
import { BiPlus } from "react-icons/bi";

import "./OpeningHours.css";

type props = {
    openingHours: {
        monday: string,
        tuesday: string,
        wednesday: string,
        thursday: string,
        friday: string,
        saturday: string,
        sunday: string
    },
    editing: boolean
}


export default function OpeningHours({openingHours, editing}: props) {

    const [monday, setMonday] = useState();

    function sendHours() {
        
    }

    return (
        <div>
           {editing?

            <FlexDiv align="flex-end">
                <HourEditor day="Lunes"     bind={[monday, setMonday]} />
                <HourEditor day="Martes"    bind={[monday, setMonday]} />
                <HourEditor day="Miércoles" bind={[monday, setMonday]} />
                <HourEditor day="Jueves"    bind={[monday, setMonday]} />
                <HourEditor day="Viernes"   bind={[monday, setMonday]} />
                <HourEditor day="Sábado"    bind={[monday, setMonday]} />
                <HourEditor day="Domingo"   bind={[monday, setMonday]} />
                <Button onClick={()=>sendHours()}>+ agregar horarios</Button>
            </FlexDiv>

            :

            <FlexDiv>
                <Hours day="Lunes"      hours={openingHours.monday}/>
                <Hours day="Martes"     hours={openingHours.tuesday}/>
                <Hours day="Miércoles"  hours={openingHours.wednesday}/>
                <Hours day="Jueves"     hours={openingHours.thursday}/>
                <Hours day="Viernes"    hours={openingHours.friday}/>
                <Hours day="Sábado"     hours={openingHours.saturday}/>
                <Hours day="Domingo"    hours={openingHours.sunday}/>
            </FlexDiv>} 
        </div>

    )
}

function Hours({day, hours}: {day: string, hours: string}): JSX.Element {
    return <div className="opening-hours">
        <p>{day}</p>
        <p>{hours?hours:'-'}</p>
    </div>
}

function HourEditor({day, bind}: {day: string, bind: [any, any]}): JSX.Element {
    return <Field label={day} bind={[bind[0], bind[1]]} />
 
}