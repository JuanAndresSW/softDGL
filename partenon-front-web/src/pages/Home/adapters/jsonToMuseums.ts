import {base64ToBlob} from "utilities/conversions";
import shortMuseum from '../models/shortMuseum';

/**Adapta el objeto de lista de museos recibido al formato esperado.*/
export default async function jsonToMuseums(json: string): Promise<shortMuseum[]> {
    const museums = JSON.parse(json);

    async function adaptMuseum(m: any): Promise<shortMuseum> {
        return {
            ID:             Number.parseInt(m.museumId),
            name:           m.museumName,
            banner:         m.museumBanner?.banner? await base64ToBlob(m.museumBanner.banner) : null,
            description:    m.museumDescription?.description
        }
    }

    return await Promise.all(museums.map(async (m:any) => await adaptMuseum(m)))
}