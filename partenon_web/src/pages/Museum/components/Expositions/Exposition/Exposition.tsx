import { Div, Retractable } from "components/wrappers";
import { Button, DateTime, Field, Image, Message, Textarea } from "components/formComponents";
import exposition from "pages/Museum/models/exposition";
import React, { useState } from "react";
import Piece from "./Piece/Piece";
import postPiece from "pages/Museum/services/postPiece";
import './Exposition.css';

type props = {exposition: exposition, editing: boolean, setPiece: Function}


/**Muestra una exposición con sus respectivas piezas. Permite agregar piezas, editar y eliminar la exposición.*/
export default function Exposition({ exposition, editing, setPiece }: props): JSX.Element {

    //Datos de nueva pieza.
    const [successSavingPiece,   setSuccessSavingPiece] = useState(false);
    const [piecePhoto,           setPiecePhoto] =         useState();
    const [pieceName,            setPieceName] =          useState();
    const [pieceDescription,     setPieceDescription] =   useState();

    //Nuevos datos de exposición.
    const [successSavingExpoNewData,  setSuccessSavingExpoNewData] =useState(false);
    const [expositionNewName,         setExpositionNewName] =       useState(exposition.name);
    const [expositionNewCategory,     setExpositionNewCategory] =   useState(exposition.category);
    const [expositionNewDescription,  setExpositionNewDescription] =useState(exposition.description);
    const [expositionNewStartDate,    setExpositionNewStartDate] =  useState(exposition.startDate);
    const [expositionNewEndDate,      setExpositionNewEndDate] =    useState(exposition.endDate);


    function saveNewPiece() {

        setPiece({photo: piecePhoto, name: pieceName, description: pieceDescription})
        setSuccessSavingPiece(true);

        /* postPiece({
            name:        pieceName,
            photo:       piecePhoto,
            description: pieceDescription
        }, 'exposition.ID')
        .then(response=>{
            if (response.ok) {
                setPiecePhoto           (null);
                setSuccessSavingPiece   (true);
                setPieceName            (null);
                setPieceDescription     (null);
            }
        }) */
    }

    function saveExpoNewData() {
        console.log("save expo"+exposition.ID)
    }

    function deleteExpo() {
        console.log("delete expo"+exposition.ID)
    }
    

    return <div className="exposition"><Retractable label={`${exposition.name} ${editing?'(editando)':''}`} initial={false}>  

        <Div cond={!editing}>
            <p><span>{exposition?.category}. Del {exposition?.startDate} al {exposition?.endDate}</span></p>
            <p>{exposition.description}</p>

            <h3>Piezas:</h3>

            <Div flex align="flex-start">
                {exposition.pieces?.map((piece, i) => <Piece key={i} piece={piece} />)}
            </Div>
        </Div>
        



        <Div cond={editing}>


            <Div flex>
                <Field label="nombre"       bind={[expositionNewName,       setExpositionNewName]}/>
                <Field label="categoría"    bind={[expositionNewCategory,   setExpositionNewCategory]}/>

                <div>
                    <DateTime value={expositionNewStartDate} onChange={setExpositionNewStartDate}/>
                    <DateTime value={expositionNewEndDate}   onChange={setExpositionNewEndDate}/>
                </div>
                        
                <Textarea label="descripción" maxLength={100} bind={[expositionNewDescription, setExpositionNewDescription]}/>
            </Div>
            <Div flex>
                <Button type="delete" onClick={()=>deleteExpo()}>eliminar</Button>
                <Button onClick={()=>saveExpoNewData()}>guardar</Button>
            </Div>
            <Div cond={successSavingExpoNewData}><Message type="success" message="Se ha actualizado la exposición" /></Div>





            <Div flex>
                <Image setter={setPiecePhoto} img={piecePhoto}/>

                <div>
                    <Field label="nombre"                           bind={[pieceName,        setPieceName]}/>
                    <Textarea label="descripción" maxLength={100}   bind={[pieceDescription, setPieceDescription]}/>
                    <Button onClick={()=>saveNewPiece()}>+ nueva pieza para {exposition.name}</Button>
                </div>
            </Div>

            <Div cond={successSavingPiece}><Message type="success" message={"Se ha agregado una nueva pieza "+pieceName} /></Div>
            


        </Div>

    </Retractable></div>
}