import {IoIosAperture} from 'react-icons/io';
import React from "react";
import './Loading.css';

/**Ícono giratorio de carga. */
const Loading: React.FC = () => {
    return <p><IoIosAperture title='cargando...' className="loading" /></p>
}
export default Loading;