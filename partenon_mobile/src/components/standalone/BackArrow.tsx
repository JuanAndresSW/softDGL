import React from "react";
import {BiChevronLeft} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function BackArrow() {
    const navigate = useNavigate();
    return <BiChevronLeft title="atrás" onClick={() => navigate(-1)} style={{fontSize:"2.2rem", margin: ".2rem",color:"white",cursor:"pointer"}} />
}