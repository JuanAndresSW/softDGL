/**
 * Define métodos de validación de datos.
 * Cada método devuelve un boolean significando la validez del dato argumentado.
 * Opcionalmente llama a funciones pasando como argumento un mensaje de error.
*/
export default class Valid {
  public static names(name: string, setError?: Function): boolean {
    if (name?.trim().length <= 20 && name.trim().length >= 3) return true;
    if (setError) setError("El nombre debe ser de entre 3 y 20 caracteres");
    return false;
  }

  public static email(email: string, setError?: Function): boolean {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
    if (setError) setError("Ingrese una dirección válida de email");
    return false;
  }

  public static password(password: string, setError?: Function): boolean {
    if (password?.length <= 20 && password.length >= 8) return true;
    if (setError) setError("La contraseña debe ser de entre 8 y 40 caracteres");
    return false;
  }

  public static image(image: File, setError?: Function):boolean {
    if (!image) return true;
    if (image?.size < 2097152) return true;
    if (setError) setError("La imágen no debe superar los 2MB");
    return false;
  }

  public static addressNumber(addressNumber: number, setError?: Function): boolean {
    if (/^[1-9]{1}\d{0,3}$/.test(addressNumber?.toLocaleString())) return true;
    if (setError) setError("Ingrese un número de dirección");
    return false;
  }
}