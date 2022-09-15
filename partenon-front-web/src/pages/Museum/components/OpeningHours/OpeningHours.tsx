import React, { useState } from "react";
import { FlexDiv } from "components/wrappers";
import { Button, Field, Message, Select } from "components/formComponents";

import "./OpeningHours.css";

type props = {
    contact: {
        type: string,
        value: string
    }[]
}


export default function OpeningHours({contact}: props) {

    const [monday, setMonday] = useState();

    const [addingHours, setAddingHours] = useState(false);

    return (
        <div className="contact-info">
           {addingHours?
            <form>
                <HourEditor day="Lunes"     bind={[monday, setMonday]} />
                <HourEditor day="Martes"    bind={[monday, setMonday]} />
                <HourEditor day="Miércoles" bind={[monday, setMonday]} />
                <HourEditor day="Jueves"    bind={[monday, setMonday]} />
                <HourEditor day="Viernes"   bind={[monday, setMonday]} />
                <HourEditor day="Sábado"    bind={[monday, setMonday]} />
                <HourEditor day="Domingo"   bind={[monday, setMonday]} />
            </form>
            :

            !placeholderMuseum.openingHours.monday? null:
            <div>
                <Hours day="Lunes"      hours={placeholderMuseum.openingHours.monday}/>
                <Hours day="Martes"     hours={placeholderMuseum.openingHours.tuesday}/>
                <Hours day="Miércoles"  hours={placeholderMuseum.openingHours.wednesday}/>
                <Hours day="Jueves"     hours={placeholderMuseum.openingHours.thursday}/>
                <Hours day="Viernes"    hours={placeholderMuseum.openingHours.friday}/>
                <Hours day="Sábado"     hours={placeholderMuseum.openingHours.saturday}/>
                <Hours day="Domingo"    hours={placeholderMuseum.openingHours.sunday}/>
            </div>}

            {
                placeholderMuseum.openingHours.monday?null: <BiPlus onClick={()=>setAddingHours(true)}/>
            }
        </div>

    )
}


function Hours({day, hours}: {day: string, hours: string}): JSX.Element {
    return <FlexDiv justify="space-between">
        <p style={{background: 'green', margin:'.2rem'}}>{day}</p>
        <p style={{margin: '0 1rem'}}>{hours}</p>
    </FlexDiv>
}

function HourEditor({day, bind}: {day: string, bind: [any, any]}): JSX.Element {
    return <FlexDiv justify="space-around">
        <p style={{background: 'green', margin:'.2rem'}}>{day}</p>
        <Field bind={[bind[0], bind[1]]} />
    </FlexDiv>
}