import exposition from "views/Museum/models/exposition";
import React from "react";
import './Exposition.css'

type props = {exposition: exposition}

export default function Exposition({ exposition }: props): JSX.Element {

    return <section className="exposition">
        <h2>{exposition.name}, categoría: {exposition.category}</h2>
        <p>{exposition.description}</p>
    </section>
}