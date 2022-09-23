import museum from '../models/museum';
import exposition from '../models/exposition';

/**Adapta el objeto de museo recibido al formato esperado.*/
export default async function jsonToMuseum(json: string): Promise<museum> {
    const museum = JSON.parse(json);
    return {
 
        name:           museum.name,
        description:    museum.description,

        expositions: museum.expositions.map((exposition: any): exposition => { return {
            name:           exposition.expositionName,
            category:       exposition.category,
            description:    exposition.description
        }}),
    }
}