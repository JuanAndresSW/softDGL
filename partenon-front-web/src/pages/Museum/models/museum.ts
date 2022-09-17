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

    openingHours: {
        monday: string,
        tuesday: string,
        wednesday: string,
        thursday: string,
        friday: string,
        saturday: string,
        sunday: string,
    },

    expositions: {
        name: string,
        category: string,
        photo: Blob,
        description: string
    }[]

}
export default museum;