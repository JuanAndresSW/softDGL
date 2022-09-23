import Response from 'models/Response';

type method = ("GET"|"POST"|"PUT"|"DELETE"|"HEAD");

/**
 * Implementa una capa de abstracción para la API XMLHR.
 * Permite realizar operaciones get, post, put, delete y head (scan del header) enviando los datos
 * a un URL, y pudiendo adjuntar un JWT opcional.
 * @param {("GET"|"POST"|"PUT"|"DELETE"|"HEAD")} [method] - El método HTTP a ser utilizado.
 * @param {string}   [url]            - Sufijo del url del recurso.
 * @param {string}   [content.body]   - Cuerpo opcional de la petición.
 * @param {string}   [content.token]  - Token JWT opcional de la petición.
 */
const ajax = async (method: method, url: string, content: {body?:string, token?: string}):
Promise<Response> => new Promise((resolve) => {

  const xhr = new XMLHttpRequest();
  if (!xhr) resolve(new Response("Las solicitudes XMLHTTP no son soportadas en tu navegador"));

  //Configurar la request.
  url =                     process.env.REACT_APP_API + url;
  xhr.onreadystatechange =  handleResponse;
  xhr.timeout =             15000;
  xhr.ontimeout = () =>     resolve(new Response("Se ha agotado el tiempo de espera del servidor"));

  //Abrir la request.
  xhr.open(method, url, true);
  if (content.body  !== undefined) xhr.setRequestHeader("Content-Type", "application/json");
  if (content.token !== undefined) xhr.setRequestHeader("Authorization", 'Bearer ' + content.token);

  xhr.send(content.body);


  function handleResponse(): void {
    if (xhr.readyState === XMLHttpRequest.DONE)
    switch (xhr.status) {
      case 0:   return resolve(new Response("No se ha podido establecer la comunicación con el servidor"));
      case 404: return resolve(new Response("No se ha encontrado el recurso solicitado",                  null, 404, false));
      case 401: return resolve(new Response("No tienes permiso para esta operación",                      null, 401, false));
      case 500: return resolve(new Response("Error del servidor",                                         null, 500, false));
      default:  return resolve(new Response("", xhr.responseText, xhr.status, (xhr.status===200||xhr.status===201)));
    }
  }

});
export default ajax;