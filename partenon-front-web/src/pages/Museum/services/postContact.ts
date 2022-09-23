import Response from 'models/Response';
import ajax from 'ports/ajax';
import getToken from "services/getToken";
import {museumID} from "utilities/constants";
import contact from '../models/contact';


/**Guarda el contact del museo guardado en sesión. */
export default async function postContact(contact: contact): Promise<Response> {
    return await ajax("POST", "museums/contacts?key="+museumID, { token: getToken("access"), body: 
    JSON.stringify({contact: contact.value, type: contact.type})});
} 
