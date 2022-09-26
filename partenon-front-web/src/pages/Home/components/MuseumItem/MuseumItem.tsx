import React from "react";
import shortMuseum from "../../models/shortMuseum";
import './MuseumItem.css'
import defaultPhoto from "assets/svg/logo.svg";
import { Link } from "react-router-dom";


/** Un cuadro con una imágen, un título, subtitulo en la parte inferior y una descripción.*/
export default function MuseumItem({ museum }: {museum: shortMuseum}): JSX.Element {


    return (
        
        <Link data-museum-item to={"/explorar/"+museum.ID} title={museum.name}>
        
            <img src={museum.banner?.size>10?URL.createObjectURL(museum.banner):defaultPhoto} />
            
            <div>
                <h2>{museum.name}</h2>
                <p>{museum.description}</p>
            </div>
         
        </Link>
    )
}