export const museumID = Number.parseInt(sessionStorage.getItem("museumID")?.replace(/\"/g, ''));

/**Lista de provincias de argentina, en orden alfabético. Ciudad de Buenos Aires no incluida. */
export const provinces = [
    {value: "Buenos Aires"},
    {value: "Catamarca"},
    {value: "Chaco"},
    {value: "Chubut"},
    {value: "Córdoba"},
    {value: "Corrientes"},
    {value: "Entre Ríos"},
    {value: "Formosa"},
    {value: "Jujuy"},
    {value: "Mendoza"},
    {value: "Misiones"},
    {value: "Neuquén"},
    {value: "La Pampa"},
    {value: "La Rioja"},
    {value: "Río Negro"},
    {value: "Salta"},
    {value: "San Juan"},
    {value: "San Luis"},
    {value: "Santa Cruz"},
    {value: "Santa Fe"},
    {value: "Santiago del Estero"},
    {value: "Tierra del Fuego"},
    {value: "Tucumán"}
];

//Idiomas permitidos por el item de pedido de turnos para recorridos.
export const languages = [
    {value: "Español"},
    {value: "Inglés"},
    {value: "Portugués"},
    {value: "Guaraní"}
];