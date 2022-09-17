import { FlexDiv } from "components/wrappers";
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
                <FlexDiv justify="space-between">
                    <div>
                        <h2>{exposition.name}</h2>
                        <h3>{exposition.category}</h3>
                    </div>
                    
                    {extended?<FiEyeOff/>:<FiEye/>}
                </FlexDiv>
                
            </div>

            {!extended? null:
            <div data-expo-body>
                <FlexDiv align="flex-start">
                    <img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"/>
                    <p>{exposition.description}</p>
                </FlexDiv>
                
            </div>}

        </div>
    )
}