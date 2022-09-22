import ajax from "ports/ajax";
import Response from 'models/Response';
import jsonToMuseums from "../adapters/jsonToMuseums";

/** Devuelve una lista de museos.*/
export default async function getMuseums(q=''): Promise<Response> {
    const response = await ajax("GET", `museums/${q}`, {});
    if (response.ok)
    return {...response, content: await jsonToMuseums(response.content)};
}
