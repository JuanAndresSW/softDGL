import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Componentes de formulario.
import { Button, Field, Form, Message } from 'components/formComponents';
import { Loading } from "components/standalone";
import { FlexDiv } from "components/wrappers";
import { BiChevronLeft, BiHome } from "react-icons/bi";

//Relacionado a la cuenta.
import Valid from "utilities/Valid";
import account from './models/account';
import postAccount from "./services/postAccount";

/**Un formulario de 2 partes para crear una nueva cuenta de usuario.*/
export default function SignUp(): JSX.Element {

  const navigate = useNavigate();
  

  //Controladores del estado del formulario.
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  /*DATOS DEL FORMULARIO*****************************************************/

  //Datos del usuario.
  const [username, setUsername]           = useState("");
  const [email, setEmail]                 = useState("");
  const [password, setPassword]           = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [museumName, setMuseumName]       = useState("");
  const [coordinates, setCoordinates]     = useState("");
  
  const [error, setError]         = useState("");


  /*VALIDACIÓN***************************************************************/

  function userIsValid(): boolean {
    setError("");

    if (!Valid.names(username, setError))     return false;

    if (!Valid.email(email, setError))        return false;

    if (!Valid.password(password, setError))  return false;
    if (password !== passwordMatch) {setError("Las contraseñas no coinciden"); return false}

    return true;
  };


  /*ENVIAR Y RECIBIR*************************************************/

  /**Envía al servidor los datos recolectados. */
  async function submit(): Promise<void> {

    const account: account = {
      username: username,
      email: email,
      password: password,
      museumName: museumName,
      coordinates: coordinates
    }
    setSending(true);
    
    setSending(false);
    const response = await postAccount(account)
    
    
    if (!response.ok) return setError(response.message);
    
    setSuccess(true);
    setError("");
    navigate("/inicio"); 

  }

  /*FORMULARIO*****************************************************/

  return (
    <Form title="Creando nuevo museo" onSubmit={()=>{if (userIsValid()) submit()}}>
      <Link to="/"><BiHome /></Link>
          
      
      <Field label="¿Cómo quieres que te identifiquemos?" 
      bind={[username, setUsername]} validator={Valid.names(username)} />
      <Field label="Tu dirección de correo electrónico"
      bind={[email, setEmail]} validator={Valid.email(email)} />

      <FlexDiv>
        <Field label="Elige una contraseña" 
        bind={[password, setPassword]} type="password" validator={Valid.password(password)} />
        <Field label="Vuelve a escribir la contraseña" bind={[passwordMatch, setPasswordMatch]}
        type="password" validator={password===passwordMatch} />
      </FlexDiv>

      <Field label="¿Cómo se llamará tu museo?" bind={[museumName, setMuseumName]}
      validator={Valid.names(museumName)} />

     
      <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
         

    
            
      <Message type="error" message={error} />

      <FlexDiv justify='space-between'>
        <Link to="/ingresar">Acceder</Link>

        <Button type="submit">Siguiente</Button>
      </FlexDiv>

    </Form>
   
  );
}