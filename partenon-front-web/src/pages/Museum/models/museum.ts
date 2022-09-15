type museum = {
    museumName: string,
    province: string,
    city: string,
    street: string,
    addressNumber: string,
    description: string,
    banner: File,
    plan: File,

    contact: {
        type: string,
        value: string
    }[],

    openingHours: {
        monday: string,
        tuesday: string,
        wednesday: string,
        thursday: string,
        friday: string,
        sunday: string,
    },

    expositions: {
        name: string,
        category: string,
        photo: File,
        description: string
    }[]

}
export default museum;