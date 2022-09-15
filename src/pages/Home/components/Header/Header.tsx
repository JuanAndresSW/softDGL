import React from "react";
import { Link } from "react-router-dom";
import logo from "assets/svg/logo.svg";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import './Header.css';

type props = {
  auth: boolean
}

/**A panel fixed to the top of the screen. */
export default function Header({auth}: props): JSX.Element {
  
return (
  <header>
    <Link to="/" id="logo">
      <img src={logo} alt="" /><p>Partenón</p>
    </Link>

    {auth?
    
    <div id="logged-header"><ProfileMenu /></div> :


    <div id="header-links">
      <button type="button"><Link to={"/registrarse"}>nuevo museo</Link></button>

      <Link to={"/ingresar"}>Ingresar</Link>
      <a href="about:blank" target="_blank">Aplicación móvil</a>
    
    </div>


    }
  </header>
);
}
