import Response from 'models/Response';
import ajax from 'ports/ajax';
import getToken from "services/getToken";
import {museumID} from "utilities/constants";
import {fileToBase64} from "utilities/conversions";
import piece from '../models/piece';


/**Guarda una nueva pieza de una exposición del museo guardado en sesión.*/
export default async function postExposition(piece: piece, expositionID: string): Promise<Response> {
    return await ajax("POST", `expositions/${expositionID}pieces?key=${museumID}`, { token: getToken("access"), body: 
    JSON.stringify({
        name:           piece.name,
        description:    piece.description,
        photo:          await fileToBase64(piece.photo)
    })
    });
} 
