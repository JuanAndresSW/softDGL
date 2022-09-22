import Response     from "models/Response";
import ajax         from "ports/ajax";
import getToken     from "services/getToken";
import {museumID}   from "utilities/constants";

/**Guarda un recorrido del museo guardado en sesión. */
export default async function postTour(tourName: string): Promise<Response> {
    return await ajax("POST", "museums/tours?key="+museumID, { body:JSON.stringify({
        name: tourName
    }), token: getToken("access") });
}