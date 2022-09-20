import openingHours from './openingHours';

type museum = {
    basicData: {
        name: string,
        province: string,
        city: string,
        street: string,
        addressNumber: string,
        description: string,
        banner: Blob,
    },
    plan: Blob,

    contact: {
        type: string,
        value: string
    }[],

    openingHours: openingHours,

    expositions: {
        name: string,
        category: string,
        photo: Blob,
        description: string
    }[]

}
export default museum;