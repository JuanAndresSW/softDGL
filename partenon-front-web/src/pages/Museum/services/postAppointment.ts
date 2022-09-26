import Response     from "models/Response";
import ajax         from "ports/ajax";
import appointment  from "../models/appointment";
import {museumID}   from "utilities/constants"
import getToken     from "services/getToken";

/**Guarda un turno para un recorrido de un museo. */
export default async function postAppointment(appointment: appointment): Promise<Response> {
    return await ajax("POST", "museums/appointments?key="+museumID, { body:JSON.stringify({
        email:       appointment.email,
        language:            appointment.language,
        appointmentDate:     appointment.date,
    }), token: getToken("access")});
}