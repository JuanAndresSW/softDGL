import shortMuseum from '../models/shortMuseum';

/**Adapta el objeto de lista de museos recibido al formato esperado.*/
export default function jsonToMuseums(json: string): shortMuseum[] {
    const museums = JSON.parse(json);

    function adaptMuseum(m: any): shortMuseum {
        return {
            ID:             Number.parseInt(m.museumId),
            name:           m.museumName,
            description:    m.museumDescription?.description
        }
    }

    return museums.map((m:any) => adaptMuseum(m))
}