import Response from 'models/Response';

/**
 * An abstraction layer for the API fetch.
 * @param {("GET"|"POST"|"PUT"|"DELETE"|"HEAD")} [method] - The HTTP method.
 * @param {string}   [url]            - Path to the resource.
 * @param {string}   [content.body]   - Body of the request.
 * @param {string}   [content.token]  - Validation JWT for the API.
 */
export default async function ajax(method:("GET"|"POST"|"PUT"|"DELETE"|"HEAD"), url: string, 
content: {body?:string, token?: string}): Promise<Response> {

  const response = await fetch(url, {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + content.token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: content.body,
  });

  switch (response.status) {
    case 0:   return new Response("No se ha podido establecer la comunicación con el servidor", '', 0);
    case 404: return new Response("No se ha encontrado el recurso solicitado", '', 404);
    case 401: return new Response("No tienes permiso para esta operación", '', 401);
    case 500: return new Response("Error del servidor", '', 500);
    default:  return new Response("", await response.text(), response.status, response.ok);
  } 
      
}