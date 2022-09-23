import Response from 'models/Response';
import ajax from 'ports/ajax';
import getToken from "services/getToken";
import {museumID} from "utilities/constants";
import {fileToBase64} from "utilities/conversions";
import exposition from '../models/exposition';


/**Guarda una nueva exposición del museo guardado en sesión. */
export default async function postExposition(exposition: exposition): Promise<Response> {
    return await ajax("POST", "expositions?key="+museumID, { token: getToken("access"), body: 
    JSON.stringify({
        name: exposition.name,
        description:    exposition.description,
        photo:          await fileToBase64(exposition.photo),
        category:       exposition.category
    })
    });
} 
