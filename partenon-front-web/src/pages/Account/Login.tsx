import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

//Servicios.
import tryLogin from "./services/tryLogin";

//Utilidades.
import Valid from "utilities/Valid";

//Componentes de formulario.
import {Form, Field, Message, Button} from 'components/formComponents';
import { FlexDiv } from "components/wrappers";
import { Loading } from "components/standalone";
import { museumID } from "utilities/constants";

/**Un formulario para iniciar sesión.*/
export default function Login(): JSX.Element {

  const navigate = useNavigate();

  const [usernameOrEmail, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(): void {
    if (!Valid.names(usernameOrEmail) || !Valid.email(usernameOrEmail) || !Valid.password(password))
    return setError("Usuario o contraseña incorrecta");

    setLoading(true);
    tryLogin(usernameOrEmail, password).then(response=>{
      setLoading(false);
      if (!response.ok) return setError(error);
      setError("");
      navigate("?museum="+museumID);
    })
  };


  return (
    <Form onSubmit={submit} title="Iniciar sesión">

      <Field label="Nombre o correo electrónico"  bind={[usernameOrEmail, setUser]} />
      <Field label="Contraseña"  type="password"  bind={[password, setPassword]} />

      <Message type="error" message={error} />

      {loading?<Loading />:<Button type="submit">Ingresar</Button>}

      <FlexDiv justify='space-between'>
        <a href="about:blank" target="_blank" style={{margin:'1rem 0'}}>Olvidé mi contraseña</a>
        <Link to="/registrarse" style={{ margin: '1rem 0'}}>Crea una nueva cuenta</Link>
      </FlexDiv>

    </Form>
  );
}