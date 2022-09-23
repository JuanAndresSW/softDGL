import exposition from "pages/Museum/models/exposition";
import React from "react";
import Exposition from "./Exposition/Exposition";
import "./Expositions.css";

type props = {expositions: exposition[]}

export default function Expositions({expositions}: props) {

    return <div className="expositions">

        {expositions.map((exposition)=><Exposition key={exposition.name} exposition={exposition}/>)}

    </div>
}
