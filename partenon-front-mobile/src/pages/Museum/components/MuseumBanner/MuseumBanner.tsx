import React, { useState } from "react";
import { Div } from "components/wrappers";
import './MuseumBanner.css';

type props = {
    museumBasicData: {
        name: string,
        province: string,
        city: string,
        street: string,
        addressNumber: string,
        description: string
    }
}

export default function MuseumBanner({museumBasicData}: props): JSX.Element {
    
    return <div data-museum-banner>
    
        <h2>{museumBasicData.name}</h2>

        <h3>{museumBasicData.province + ' ' + museumBasicData.city + ', ' + museumBasicData.street + ' ' + museumBasicData.addressNumber}</h3>
        <p>{museumBasicData.description}</p>  
    
    </div>
}