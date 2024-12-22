import React, { ReactNode } from "react";
import './Section.css';

type props = {
    children: ReactNode;
}
export default function Section({children}:props): JSX.Element {
    return <div className="section"> {children} </div>
}