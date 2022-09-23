import museum from '../models/museum';
import exposition from '../models/exposition';

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
            description:    museum.museumDescription.description
        },

        expositions: museum.expositions.map((exposition: any): exposition => { return {
            ID:             exposition.expositionId,
            name:           exposition.expositionName,
            category:       exposition.category,
            description:    exposition.description
        }}),
    }
}