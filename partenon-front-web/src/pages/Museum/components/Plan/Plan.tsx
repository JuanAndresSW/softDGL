import React, { useState } from "react";
import { Button, Image } from "components/formComponents";
import { Div } from "components/wrappers";
import postPlan from "../../services/postPlan";
import "./Plan.css";

type props = {
    plan: Blob,
    editing: boolean
}
export default function Plan({plan, editing}: props): JSX.Element {
    const [newPlan, setNewPlan] = useState(plan);

    function saveMuseumPlan(): void {
        postPlan(newPlan);
    }

    return <Div cond={editing||!!newPlan?.size} className="plan">
    
        <Div flex style={{width:'300px', margin: '0 auto'}} cond={editing}>
            <h2>Nuevo plano del museo</h2>
            <Image setter={setNewPlan} img={newPlan} />
            <Button onClick={()=>saveMuseumPlan()}>Guardar plano</Button>
        </Div>

        <Div cond={!editing}>
            <h2>Plano del museo</h2>
            <img src={newPlan?URL.createObjectURL(newPlan): ''} alt="" />
        </Div>

    </Div>
}