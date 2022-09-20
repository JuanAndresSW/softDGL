import React, { useState } from "react";
import { FlexDiv } from "components/wrappers";
import { Button, Field } from "components/formComponents";

import "./OpeningHours.css";
import postOpeningHours from "../../services/postOpeningHours";
import openingHours from "../../models/openingHours";

type props = {
    openingHours: openingHours,
    editing: boolean
}


export default function OpeningHours({openingHours, editing}: props) {

    const [monday,      setMonday] =    useState();
    const [tuesday,     setTuesday] =   useState();
    const [wednesday,   setWednesday] = useState();
    const [thursday,    setThursday] =  useState();
    const [friday,      setFriday] =    useState();
    const [saturday,    setSaturday] =  useState();
    const [sunday,      setSunday] =    useState();


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
            if (response.ok) window.location.reload();
        })
    }

    return (
        <div>
           {editing?

            <FlexDiv align="flex-end">
                <HourEditor day="Lunes"     bind={[monday,      setMonday]}     />
                <HourEditor day="Martes"    bind={[tuesday,     setTuesday]}    />
                <HourEditor day="Miércoles" bind={[wednesday,   setWednesday]}  />
                <HourEditor day="Jueves"    bind={[thursday,    setThursday]}   />
                <HourEditor day="Viernes"   bind={[friday,      setFriday]}     />
                <HourEditor day="Sábado"    bind={[saturday,    setSaturday]}   />
                <HourEditor day="Domingo"   bind={[sunday,      setSunday]}     />
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