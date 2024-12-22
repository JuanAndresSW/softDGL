import Response from 'models/Response';

const ajax = async (url: string):
Promise<Response> => new Promise((resolve) => {

  const xhr = new XMLHttpRequest();
  if (!xhr) resolve(new Response("Las solicitudes XMLHTTP no son soportadas en tu navegador"));

  url =                     process.env.REACT_APP_API + url;
  xhr.onreadystatechange =  handleResponse;
  xhr.timeout =             15000;
  xhr.ontimeout = () =>     resolve(new Response("Se ha agotado el tiempo de espera del servidor"));

  xhr.open("GET", url, true);
  xhr.send();


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