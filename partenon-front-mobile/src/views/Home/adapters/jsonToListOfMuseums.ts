import listOfMuseums from '../models/listOfMuseums';
import shortMuseum from '../models/shortMuseum';

/**Adapta el objeto de lista de museos recibido al formato esperado.*/
export default function jsonToListOfMuseums(json: string): listOfMuseums {
    const list = JSON.parse(json);

    function anyToShortMuseum(m: any): shortMuseum {
        return {
            ID:             Number.parseInt(m.museumId),
            name:           m.museumName,
            description:    m.description
        }
    }

    return {
        museums:    list.content.map((m:any) => anyToShortMuseum(m)),
        last:       list.last,
        totalPages: list.totalPages
    }
}