import ajax from "ports/ajax";
import Response from 'models/Response';
import jsonToMuseums from "../adapters/jsonToMuseums";

/** Devuelve una lista de museos.*/
export default async function getMuseums(q='', page: number, sort: "museumName"): Promise<Response> {

    const response = await ajax("GET", `museums/${q}?index=${page}&size=12&sort=${sort}&order=asc`, {});
    if (response.ok)
    return {...response, content: await jsonToMuseums(response.content)};
}
