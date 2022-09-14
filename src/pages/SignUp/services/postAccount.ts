import account from '../models/account';
import Response from 'models/Response';
import ajax from 'ports/ajax';
import setSession from 'services/setSession';

const url = "auth/accounts";
const method = "POST";

/**Tries to send the data for a new user to be created. */
export default async function postAccount(account: account): Promise<Response> {
    const response = await ajax(method, url, { body: JSON.stringify(account) });

    if (response.status === 201) {

        setSession(JSON.stringify({
            accessToken:    JSON.parse(response.content).accessToken,
            refreshToken:   JSON.parse(response.content).refreshToken,
            username:       account.username,
        }));
        window.location.reload();
        return null;
    }

    try {return new Response(JSON.parse(response.message).mensaje, "", response.status);} 
    catch {return response}
} 
