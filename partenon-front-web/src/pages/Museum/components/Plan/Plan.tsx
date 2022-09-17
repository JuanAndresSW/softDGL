import React, { useState } from "react";
import { Button, Image } from "components/formComponents";
import { FlexDiv } from "components/wrappers";

type props = {
    plan: Blob,
    editing: boolean
}
export default function Plan({plan, editing}: props): JSX.Element {
    const [newPlan, setNewPlan] = useState();

    return editing?
    <FlexDiv>
        <Image setter={setNewPlan} img={plan} />
        <Button>Guardar</Button>
    </FlexDiv>:
    <img src={URL.createObjectURL(plan)} alt="" />
}