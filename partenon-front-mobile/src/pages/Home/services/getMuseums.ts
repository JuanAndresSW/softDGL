import ajax from "ports/ajax";
import Response from 'models/Response';
import jsonToListOfMuseums from "../adapters/jsonToListOfMuseums";

/** Devuelve una lista de museos.*/
export default async function getMuseums(q='', page:number): Promise<Response> {
    const response = await ajax(`museums/${q}?index=${page}&size=12&sort=museumName&order=asc`);
    if (response.ok)
    return {...response, content: jsonToListOfMuseums(response.content)};
}
