import Response from 'models/Response';
import ajax from 'ports/ajax';
import getToken from "services/getToken";

/**Retrieves a museum. */
export default async function getMuseum(museumID: number): Promise<Response> {
    const response = await ajax("GET", "museums?key="+museumID, { token: getToken("access") });
    
    return {...response, content: JSON.parse(response.content)};
} 
