import piece from "./piece";
type exposition = {
    ID?:             number,
    name:            string,
    category:        string,
    description:     string,
    startDate:       string,
    endDate:      string,
    pieces:          piece[]
}
export default exposition;