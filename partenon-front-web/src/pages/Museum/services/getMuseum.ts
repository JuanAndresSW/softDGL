//import account from '../models/account';
import Response from 'models/Response';
import ajax from 'ports/ajax';
import getToken from "services/getToken";


/**Retrieves a museum, using its owner user's ID. */
export default async function getMuseum(IDUser: number): Promise<Response> {
    const response = await ajax("GET", "museum/"+IDUser, { token: getToken("access") });
    
    return {...response, content: JSON.parse(response.content)};
} 
