import React from "react";
import { Div, Retractable } from "components/wrappers";
import appointment from "../../models/appointment";
import "./Appointment.css";

type props = {appointments: appointment[]}

export default function Appointments({appointments}: props): JSX.Element {


    return (
        
        <Retractable label="Turnos pedidos">
                
            <ol className="appointments">
                {appointments?.map((appointment, i)=>
                <Div flex className="appointment" key={i}>
                    <li>Para {appointment.tour} de {appointment.name} el {appointment.date} ({appointment.language})</li>
                </Div>)}
            </ol>

        </Retractable>
    
    )
}