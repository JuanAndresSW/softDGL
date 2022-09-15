import { FlexDiv } from "components/wrappers";
import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import './Plus.css';


/**
 * Una opción de navegación con el símbolo '+'.
 */
export default function Plus({onClick}:{onClick?:Function}): JSX.Element {
    return (
        <div onClick={()=>onClick()} className="plus">
            <MdAddCircleOutline />
        </div>
    );
}