import React, { useState } from "react";
import { FlexDiv } from "components/wrappers";
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter, AiOutlineWhatsApp } from "react-icons/ai";
import { Button, Field, Message, Select } from "components/formComponents";
import { BiPencil, BiX } from "react-icons/bi";

import "./ContactInfo.css";


const contactTypes = [
    {value: "FACEBOOK"},
    {value: "INSTAGRAM"},
    {value: "TWITTER"},
    {value: "WHATSAPP"}
];

type props = {
    contact: {
        type: string,
        value: string
    }[]
}


export default function ContactInfo({contact}: props) {

    //Contact.
    const [newContactType, setNewContactType] =     useState();
    const [newContactValue, setNewContactValue] =   useState();
    const [addingContact, setAddingContact] =       useState(false);
    const [contactError, setContactError] =         useState('');

    const notYetAddedContacts = () =>{
        const addedContacts = contact.map((contact)=> contact.type);
        return contactTypes.filter((contact)=>addedContacts.indexOf(contact.value) < 0);
    }

    function getContactIcon(type: string) {
        switch (type) {
            case "FACEBOOK":    return <AiFillFacebook/>
            case "INSTAGRAM":   return <AiFillInstagram/>
            case "TWITTER":     return <AiOutlineTwitter/>
            case "WHATSAPP":    return <AiOutlineWhatsApp/>
        }
    }

    function addContact(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!newContactValue || !newContactType) return setContactError("Complete todos los campos");
        setContactError("");
        console.log("Enviando datos de nuevo contacto");
    }


    return (
        <div className="contact-info">
            {contact.map((c, index) => (
                <div key={index} className="contact-item">
                    {getContactIcon(c.type)}<p>{c.value}</p>
                </div>
            ))}

            
            <div style={{position:"absolute", top:8, right:8}}>
                {addingContact?
                <BiX onClick={()=>setAddingContact(false)} />:
                <BiPencil onClick={()=>{if(contact.length<4) setAddingContact(true)}} />}
            </div>


            {!addingContact?null:
            
            <form onSubmit={(e)=>addContact(e)}>
                <FlexDiv align="center">
                    <Select options={notYetAddedContacts()} value={newContactType} onChange={setNewContactType}/>
                    <Field bind={[newContactValue, setNewContactValue]} />
                </FlexDiv>
                <FlexDiv><Button type="submit">Agregar</Button></FlexDiv>
            </form>}
              
        </div>

    )
}