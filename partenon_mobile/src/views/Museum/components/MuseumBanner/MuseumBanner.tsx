import React, { useState } from "react";
import { Div } from "components/wrappers";
import './MuseumBanner.css';

type props = {
    museumBasicData: {
        name: string,
        description: string
    }
}

export default function MuseumBanner({museumBasicData}: props): JSX.Element {
    
    return <div data-museum-banner>
    
        <h2>{museumBasicData.name}</h2>
        <p>{museumBasicData.description}</p>  
    
    </div>
}