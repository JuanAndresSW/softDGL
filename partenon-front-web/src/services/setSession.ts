import jsonToSession from 'adapters/jsonToSession';
import session from 'models/session';

/**Establece en memoria local y cookies los valores obtenidos de una solicitud de inicio de sesión exitosa.*/
export default function setSession(json:string): void {
    const session: session = jsonToSession(json);


    document.cookie = `accessToken=${session.accessToken}; max-age=1209600; path=/; Secure`;

    document.cookie = `refreshToken=${session.refreshToken}; max-age=1209600; path=/; Secure`;

    sessionStorage.setItem("museumID", session.museumID);
    
}