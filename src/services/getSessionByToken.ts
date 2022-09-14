import ajax       from 'ports/ajax';
import getToken   from './getToken';
import setSession from './setSession';
import Response from 'models/Response';

/** Tries to start a session with the stored JWT. */
export default async function getSessionByToken(): Promise<Response> {

  const access = getToken("access");
  const refresh = getToken("refresh")

  //Exit if there isn't a token with the right format.
  if (!/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/.test(access)) 
  return  new Response("El token no contiene un formato válido.", '', 0);


  let tokenResponse = await ajax("GET","auth/init", { token: access });
  if (tokenResponse.status === 200) return success(tokenResponse);
  
  //If the access token wasn't valid, try to get a new token.
  tokenResponse = await ajax("POST","auth/refresh", { token: refresh });
  if (tokenResponse.status === 200) return success(tokenResponse);

  //If couln't get a new token, give up.
  return new Response("Los tokens almacenados son erróneos o han expirado.", '', 400, false);
  
  function success(response: Response): Response {
    setSession(response.content);
    return new Response("Token validado", '', response.status, true);
  }
}