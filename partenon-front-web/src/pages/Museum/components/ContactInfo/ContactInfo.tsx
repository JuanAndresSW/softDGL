import React, { useState } from "react";
import { Div } from "components/wrappers";
import { AiFillFacebook, AiFillInstagram, AiOutlineMail, AiOutlineTwitter, AiOutlineWhatsApp } from "react-icons/ai";
import { Button, Dropdown, Field, Message } from "components/formComponents";
import postContact from "../../services/postContact";


import "./ContactInfo.css";
import contact from "pages/Museum/models/contact";


const contactTypes = [
    {value: "EMAIL"},
    {value: "FACEBOOK"},
    {value: "INSTAGRAM"},
    {value: "TWITTER"},
    {value: "WHATSAPP"}
];

type props = {
    contacts: contact[],
    editing: boolean
}


export default function ContactInfo({contacts, editing}: props) {

    const [newContactType, setNewContactType] =     useState(contactTypes[0].value);
    const [newContactValue, setNewContactValue] =   useState();
    const [success, setSuccess] =                   useState(false);


    function getContactIcon(type: string): JSX.Element {
        switch (type) {
            case "EMAIL":       return <AiOutlineMail/>
            case "FACEBOOK":    return <AiFillFacebook/>
            case "INSTAGRAM":   return <AiFillInstagram/>
            case "TWITTER":     return <AiOutlineTwitter/>
            case "WHATSAPP":    return <AiOutlineWhatsApp/>
        }
    }

    function addContact(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!newContactValue || !newContactType) return;
        postContact({type: newContactType, value: newContactValue}).then(response=>{
            if (response.ok) {
                setSuccess(true);
            };
        })

    }


    return <div className="contact-info">

        <Div cond={!!contacts?.length && !editing} >
            
            <h2>Redes sociales</h2>
            <Div wrap flex className="contact-list">
                
                {contacts?.map((c, index) => (
                    <div key={index} className="contact-item">
                        <p>{getContactIcon(c.type)}{c.value}</p>
                    </div>
                ))}
            </Div>
        </Div>


        <Div cond={editing}>
            <Div flex><h2>Agregar redes sociales</h2></Div>
            <form onSubmit={(e)=>addContact(e)}>

                <Div flex>
                    <Dropdown options={contactTypes} value={newContactType} onChange={setNewContactType}/>
                    <Field bind={[newContactValue, setNewContactValue]} />
                </Div>

                <Div flex><Button type="submit">+ agregar red social</Button></Div>
                <Div cond={success}><Message type="success" message={"Se ha agregado la red social"} /></Div>
                
            </form>
        </Div>
              
    </div>
}