import React, { useState } from "react";
import { Button, Image } from "components/formComponents";
import { Div } from "components/wrappers";
import postPlan from "../../services/postPlan";

type props = {
    plan: Blob,
    editing: boolean
}
export default function Plan({plan, editing}: props): JSX.Element {
    const [newPlan, setNewPlan] = useState(plan);

    function saveMuseumPlan(): void {
        postPlan(newPlan);
    }

    return editing?
    <Div flex>
        <Image setter={setNewPlan} img={newPlan} />
        <Button onClick={()=>saveMuseumPlan()}>Guardar plano</Button>
    </Div>:
    <img src={newPlan?URL.createObjectURL(newPlan): ''} alt="" />
}