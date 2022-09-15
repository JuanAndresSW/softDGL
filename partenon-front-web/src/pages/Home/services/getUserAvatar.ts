import ajax from 'ports/ajax';
import getToken from 'services/getToken';
import { base64ToBlob } from 'utilities/conversions';
import Response from 'models/Response';

/** Returns a File, being the user avatar of the stored JWT's owner.*/
export default async function getUserAvatar(callback: Function): Promise<Response> {

    if (localStorage.getItem("avatar"))
    return new Response("", await base64ToBlob(localStorage.getItem("avatar")), 200, true);

    else {
        const response = await ajax("GET","users/"+sessionStorage.getItem('username'),{token: getToken('access')});
        response.content = await base64ToBlob(response.content);
        return response;
    }
}
