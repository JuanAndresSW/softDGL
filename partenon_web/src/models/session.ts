/**Objeto con los datos que constituyen una sesión de usuario. */
type session = {
    accessToken:    string;  //El JWT usado para autenticar peticiones.
    refreshToken:   string;  //El JWT usado para autenticar una solicitud de renovación de token de acceso.
    museumID:       string;
};
export default session;