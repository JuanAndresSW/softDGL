import { Div } from "components/wrappers";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import './Exposition.css'

type props = {exposition: {
    name: string,
    category: string,
    photo: Blob,
    description: string
}}

/**
 * Un contenedor con título que puede ser contraído y extendido haciendo click sobre el encabezado.
 * @param props.exposition
 */
export default function Exposition({ exposition }: props): JSX.Element {

    const [extended, setExtended] = useState(false);

    return (
        <div className="exposition">

            <div onClick={()=>setExtended(!extended)} data-expo-header>
                <Div flex justify="space-between">
                    <div>
                        <h2>{exposition.name}</h2>
                        <h3>{exposition.category}</h3>
                    </div>
                    
                    {extended?<FiEyeOff/>:<FiEye/>}
                </Div>
                
            </div>

            {!extended? null:
            <div data-expo-body>
                <Div flex align="flex-start">
                    <img src={exposition.photo?.size>10? URL.createObjectURL(exposition.photo) : ''}/>
                    <p>{exposition.description}</p>
                </Div>
                
            </div>}

        </div>
    )
}