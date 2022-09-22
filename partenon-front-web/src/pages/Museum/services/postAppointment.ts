import Response     from "models/Response";
import ajax         from "ports/ajax";
import appointment  from "../models/appointment";

/**Guarda un turno para un recorrido de un museo. */
export default async function postAppointment(appointment: appointment, tourID: number): Promise<Response> {
    return await ajax("POST", "museums/tours/"+tourID, { body:JSON.stringify({
        language:   appointment.language,
        date:       appointment.date,
    })});
}