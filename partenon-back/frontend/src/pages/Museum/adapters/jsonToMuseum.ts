import museum from '../models/museum';
import {base64ToBlob} from "utilities/conversions";
import exposition from '../models/exposition';
import contact from '../models/contact';
import tour from '../models/tour';
import appointment from '../models/appointment';
import piece from '../models/piece';

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
            description:    museum.museumDescription?.description,
            banner: await base64ToBlob(museum.museumBanner?.banner),
        },

        plan: museum.museumPlan === null ? null : await base64ToBlob(museum.museumPlan?.buildingPlan),
    
        contacts: museum.museumContacts.map((contact:any): contact => { return {
            type: contact.contactPK.type === "WSP" ? "WHATSAPP" : contact.contactPK.type, value: contact.museumContact
        }}),

        openingHours: museum.openingHours,

        expositions: await Promise.all(museum.expositions?.map(async (exposition: any): Promise<exposition> => { return {
            ID:             exposition.expositionId,
            name:           exposition.expositionName,
            category:       exposition.category,
            description:    exposition.description,
            startDate:      exposition.startDate? exposition.startDate : '',
            endDate:        exposition.endDate? exposition.endDate : '',
            pieces:         exposition.pieces?.map( async (piece: any): Promise<piece> => { return {
                ID:         piece.ID,
                name:       piece.name,
                photo:      await base64ToBlob(piece?.photo),
                description: piece.description
            }})
        }})),

        tours: museum.tours?.map( (tour: any): tour => { return {
           name:        tour.name,
           description: tour.description,
           duration:    tour.duration 
        }}),

        appointments: museum.appointments.map((appointment: any):appointment => { return {
            language:   appointment.language,
            date:       appointment.appointmentDate,
            email:      appointment.requestedName
        }})
    }
}