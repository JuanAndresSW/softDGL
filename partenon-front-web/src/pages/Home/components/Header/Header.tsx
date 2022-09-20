import React from "react";
import { Link } from "react-router-dom";
import logo from "assets/svg/logo.svg";
import './Header.css';
import { museumID } from "utilities/constants";

type props = {
  auth: boolean
}

/**A panel fixed to the top of the screen. */
export default function Header({auth}: props): JSX.Element {
  
return (
  <header>
    

    {auth?  <Link to={`/mi-museo`} title="Mi museo" id="logo"><img src={logo} /></Link>

    :

    <div id="header-links">
      <button type="button"><Link to={"/registrarse"}>nuevo museo</Link></button>

      <Link to={"/ingresar"}>Ingresar</Link>
      <a href="about:blank" target="_blank">Aplicación móvil</a>
    </div>


    }
  </header>
);
}
