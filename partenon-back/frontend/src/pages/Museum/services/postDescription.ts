import Response from 'models/Response';
import ajax from 'ports/ajax';
import getToken from "services/getToken";
import {museumID} from "utilities/constants";


/**Guarda la descripción del museo guardado en sesión. */
export default async function postDescription(description: string): Promise<Response> {
    return await ajax("POST", "museums/descriptions?key="+museumID, { token: getToken("access"), body: JSON.stringify({description: description})});
} 
