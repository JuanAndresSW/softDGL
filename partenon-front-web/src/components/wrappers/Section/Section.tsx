import React, { ReactNode } from "react";
import './Section.css';

type props = {children: ReactNode}

export default function Section({children}:props): JSX.Element {
    return <div className="section">
        <div style={{maxWidth: "900px", margin:"0 auto"}}>
        {children}
        </div>
    </div>
}