import ajax from "ports/ajax";
import setSession from 'services/setSession';
import Response from 'models/Response';

export default async function tryLogin(usernameOrEmail: string, password: string): Promise<Response> {
    
  const response = await ajax("POST", "auth/login", {
    body: JSON.stringify({
      usernameOrEmail: usernameOrEmail.trim(),
      password:        password.trim(),
    })
  });

  if (response.status === 404) return {...response, message: "Usuario o contraseña incorrecta"}

  if (response.ok) {
    localStorage.clear();
    setSession(response.content);
  }

  return response;
}