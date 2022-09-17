import ajax from "ports/ajax";
import setSession from 'services/setSession';
import Response from 'models/Response';

/**Tries to sign-in using the provided data. */
export default async function tryLogin(usernameOrEmail: string, password: string): Promise<Response> {
    
  const response = await ajax("POST", "auth/accounts/log-in", {
    body: JSON.stringify({
      usernameOrEmail: usernameOrEmail.trim(),
      password:        password.trim(),
    })
  });

  if (response.status === 404) {
    response.message = "Usuario o contraseña incorrecta";
    return response;
  }

  if (response.ok) {
    localStorage.clear();
    setSession(response.content);
  }

  return response;
}