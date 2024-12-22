import React from "react";
import './Piece.css'

import piece from "../../../../models/piece";
import { Div } from "components/wrappers";

export default function ExpositionPiece({ piece }: {piece: piece}): JSX.Element {


    return (
        
        <div data-expo-piece title={piece.name}>
        
            <Div cond><img src={piece.photo?.size? URL.createObjectURL(piece.photo) : ''} /></Div>
            
            <div>
                <h2>{piece.name}</h2>
                <p>{piece.description}</p>
            </div>
         
        </div>
    )
}