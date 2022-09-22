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

    //Contact.
    const [newContactType, setNewContactType] =     useState(notYetAddedContacts()?.[0].value);
    const [newContactValue, setNewContactValue] =   useState();
    const [success, setSuccess] =         useState(false);

    function notYetAddedContacts() {
        const addedContacts = contacts.map((contact)=> contact.type);
        return contactTypes.filter((contact)=>addedContacts.indexOf(contact.value) < 0);
    }

    function getContactIcon(type: string) {
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
                setNewContactValue(undefined);
                setNewContactType(undefined);
            };
        })

    }


    return (
        <div className="contact-info">
            {contacts.map((c, index) => (
                <div key={index} className="contact-item">
                    {getContactIcon(c.type)}<p>{c.value}</p>
                </div>
            ))}


            <Div cond={editing}>
            <form onSubmit={(e)=>addContact(e)}>

                <Div flex align="center">
                    <Dropdown options={notYetAddedContacts()} value={newContactType} onChange={setNewContactType}/>
                    <Field bind={[newContactValue, setNewContactValue]} />
                    <Button type="submit">+ agregar red social</Button>
                    <Div cond={success}>
                        <Message type="success" message={"Se ha agregado la red social"} />
                    </Div>
                </Div>
                
            </form>
            </Div>
              
        </div>

    )
}