import React, { useState } from "react";
import { Div } from "components/wrappers";
import appointment from "../../models/appointment";
import "./Appointment.css";
import { Button, DateTime, Dropdown, Field, Form, Message } from "components/formComponents";
import {languages} from "utilities/constants";
import postAppointment from "../../services/postAppointment";

type props = {appointments: appointment[], isAdmin:boolean}

export default function Appointments({appointments, isAdmin}: props): JSX.Element {

    const [success, setSuccess] = useState(false);      

    const [date, setDate] = useState('');
    const [language, setLanguage] = useState("Español");
    const [requestName, setRequestName] = useState();

  

    //TODO: delete success as true.
    function saveNewAppointment(): void {
        setSuccess(true);
        
        /* postAppointment({
            language: language,
            date:   date,
            email: requestName,
        }).then(response=>setSuccess(response.ok)) */
    }

    return (
        
        <Div>
            
            <Div cond={appointments?.length>0 && isAdmin}>
                <ol className="appointments">
                    {appointments?.map((appointment, i)=>
                    <Div flex className="appointment" key={i}>
                        <li>De {appointment.email} el {appointment.date} <span>({appointment.language})</span></li>
                    </Div>)}
                </ol>
            </Div>


            <Div cond={!isAdmin}>
            <Form title={"Pide un turno"}>

                <Div flex align="flex-start">
                    <DateTime label="Fecha de entrada" value={date} onChange={setDate} />
                    <label style={{width:"min-content"}}>Idioma de preferencia:
                    <Dropdown options={languages} value={language} onChange={setLanguage} />
                    </label>
                </Div>

                <Field type="email" label="Tu correo electrónico" bind={[requestName, setRequestName]} />

                <Div flex><Button onClick={()=>saveNewAppointment()}>solicitar</Button></Div>

                <Div cond={success}><Message type="success" message="Se ha registrado tu turno" /></Div>
            </Form>
            </Div>


        </Div>
    )
}