import account from '../models/account';
import Response from 'models/Response';
import ajax from 'ports/ajax';

/**Tries to send the data for a new user to be created. */
export default async function postAccount(account: account): Promise<Response> {
    return await ajax("POST", "auth/museums", { body: JSON.stringify(account) });
}