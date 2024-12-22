import Response from 'models/Response';
import ajax from 'ports/ajax';
import getToken from "services/getToken";
import {fileToBase64} from "utilities/conversions";
import {museumID} from "utilities/constants";


/**Guarda la foto del plano del museo guardado en sesión. */
export default async function postPlan(plan: Blob): Promise<Response> {
    return await ajax("POST", "museums/plans?key="+museumID, { token: getToken("access"), body: JSON.stringify({
        buildingPlan: await fileToBase64(plan)
    }) });
} 
