import React, { useState } from "react";
import { Link } from "react-router-dom";

//Servicios.
import tryLogin from "./services/tryLogin";

//Utilidades.
import Valid from "utilities/Valid";
import Response from 'models/Response';

//Componentes de formulario.
import {Form, Field, Message, Button} from 'components/formComponents';
import { FlexDiv } from "components/wrappers";
import { Loading } from "components/standalone";

/**Un formulario para iniciar sesión.*/
export default function Login(): JSX.Element {

  const [usernameOrEmail, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(): void {
    if (!Valid.names(usernameOrEmail) || !Valid.email(usernameOrEmail) || !Valid.password(password))
    return setError("Usuario o contraseña incorrecta");

    setLoading(true);
    const response = tryLogin(usernameOrEmail, password);
    sideEffects(response);
  };

  function sideEffects(response: Response):void {
    setLoading(false);
    if (!response.ok) return setError(error);
    setError("");
  }

  return (
    <Form onSubmit={submit} title="Iniciar sesión">

      <Field label="Nombre o correo electrónico" bind={[usernameOrEmail, setUser]} />
      <Field label="Contraseña" type="password" bind={[password, setPassword]} />

      <Message type="error" message={error} />

      {loading?<Loading />:<Button type="submit">Ingresar</Button>}

      <FlexDiv justify='space-between'>
        <a href="about:blank" target="_blank" 
        style={{margin:'1rem 0'}}>Olvidé mi contraseña</a>

        <Link to="/registrarse" style={{ margin: '1rem 0'}}>
          Crea una nueva cuenta</Link>
        </FlexDiv>
      

    </Form>
  );
}