import Response from 'models/Response';
import ajax from 'ports/ajax';
import jsonToMuseum from "../adapters/jsonToMuseum";

/**Retrieves a museum. */
export default async function getMuseum(museumID: number): Promise<Response> {
    const response = await ajax("GET", `museums?key=${museumID}`, {});
    if (!response.ok) return response;
    return {...response, content: await jsonToMuseum(response.content)};
} 
