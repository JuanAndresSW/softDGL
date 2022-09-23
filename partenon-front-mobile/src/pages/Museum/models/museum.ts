import exposition from "./exposition";

type museum = {
    basicData: {
        name: string,
        province: string,
        city: string,
        street: string,
        addressNumber: string,
        description: string
    },
    expositions: exposition[]
}
export default museum;