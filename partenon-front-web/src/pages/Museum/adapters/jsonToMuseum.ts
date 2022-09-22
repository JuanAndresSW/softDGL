import museum from '../models/museum';
import {base64ToBlob} from "utilities/conversions";
import exposition from '../models/exposition';
import contact from '../models/contact';

/**Adapta el objeto de museo recibido al formato esperado.*/
export default async function jsonToMuseum(json: string): Promise<museum> {
    const museum = JSON.parse(json);
    return {
        basicData: {
            name:           museum.museumName,
            province:       museum.province,
            city:           museum.city,
            street:         museum.street,
            addressNumber:  museum.addressNumber,
            description:    museum.museumDescription.description,
            banner: await base64ToBlob(museum.museumBanner?.banner),
        },

        plan: museum.museumPlan === null ? null : await base64ToBlob(museum.museumPlan?.buildingPlan),
    
        contacts: museum.museumContacts.map((contact:any): contact => { return {
            type: contact.type, value: contact.museumContact
        }}),

        openingHours: museum.openingHours,

        expositions: await Promise.all(museum.expositions.map(async (exposition: any): Promise<exposition> => { return {
            ID:             exposition.expositionId,
            name:           exposition.expositionName,
            category:       exposition.category,
            photo:          await base64ToBlob(exposition.photo),
            description:    exposition.description
        }})),

        tours: museum.tours
    }
}