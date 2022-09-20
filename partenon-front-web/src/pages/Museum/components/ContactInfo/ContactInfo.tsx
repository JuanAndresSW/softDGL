import React, { useState } from "react";
import { FlexDiv } from "components/wrappers";
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter, AiOutlineWhatsApp } from "react-icons/ai";
import { Button, Dropdown, Field } from "components/formComponents";
import postContact from "../../services/postContact";


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
    }[],
    editing: boolean
}


export default function ContactInfo({contact, editing}: props) {

    //Contact.
    const [newContactType, setNewContactType] =     useState();
    const [newContactValue, setNewContactValue] =   useState();
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
        postContact({type: newContactType, value: newContactValue});
    }


    return (
        <div className="contact-info">
            {contact.map((c, index) => (
                <div key={index} className="contact-item">
                    {getContactIcon(c.type)}<p>{c.value}</p>
                </div>
            ))}


            {!editing?null:
            
            <form onSubmit={(e)=>addContact(e)}>
                <FlexDiv align="center">
                    <Dropdown options={notYetAddedContacts()} value={newContactType} onChange={setNewContactType}/>
                    <Field bind={[newContactValue, setNewContactValue]} />
                    <Button type="submit">+ agregar contacto</Button>
                </FlexDiv>
            </form>}
              
        </div>

    )
}