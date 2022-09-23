import {base64ToBlob} from "utilities/conversions";
import shortMuseum from '../models/shortMuseum';
import listOfMuseums from "../models/listOfMuseums";

/**Adapta el objeto de lista de museos recibido al formato esperado.*/
export default async function jsonToMuseums(json: string): Promise<listOfMuseums> {
    const museums = JSON.parse(json);

    async function adaptMuseum(m: any): Promise<shortMuseum> {
        return {
            ID:             Number.parseInt(m.museumId),
            name:           m.museumName,
            banner:         m.museumBanner?.banner? await base64ToBlob(m.museumBanner.banner) : null,
            description:    m.museumDescription?.description
        }
    }

    return {
        museums:        await Promise.all(museums.content.map(async (m:any) => await adaptMuseum(m))),
        last:           museums.last,
        totalPages:     museums.totalPages
    }
}