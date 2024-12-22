import Response from 'models/Response';
import ajax from 'ports/ajax';
import getToken from "services/getToken";
import {fileToBase64} from "utilities/conversions";
import {museumID} from "utilities/constants";


/**Guarda la foto del museo guardado en sesión. */
export default async function postBanner(banner: Blob): Promise<Response> {
    return await ajax("POST", "museums/banners?key="+museumID, { token: getToken("access"), body: JSON.stringify({
        banner: await fileToBase64(banner)
    }) });
} 
