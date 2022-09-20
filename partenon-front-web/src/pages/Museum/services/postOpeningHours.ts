import Response from 'models/Response';
import ajax from 'ports/ajax';
import getToken from "services/getToken";
import {museumID} from "utilities/constants";
import openingHours from '../models/openingHours';


/**Guarda las horas de apertura del museo guardado en sesión. */
export default async function postOpeningHours(openingHours: openingHours): Promise<Response> {
    return await ajax("POST", "museums/openings?key="+museumID, { token: getToken("access") });
} 
