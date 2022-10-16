import React from "react";
import { Link } from "react-router-dom";
import { DiGithubBadge } from "react-icons/di";
import "./Footer.css";

/**
 * Una lista de enlaces e información de la aplicación.
 */
export default function Footer() {
  return (
    <footer>

      <div>
        <p>© Conjunto Solución 2022 (GNU V.3)</p>
        <a href={"https://drive.google.com/drive/folders/1nexO74ZrMk5pNZ20Li5164A2XCm_xQSh?usp=sharing"}>Acerca de</a>
      </div>

      <div>
        <a href="https://github.com/conjunto-solucion/partenon" className="github"><DiGithubBadge /></a>
        <p>Partenón versión demo</p>
      </div>
      
    </footer>
  );
}
