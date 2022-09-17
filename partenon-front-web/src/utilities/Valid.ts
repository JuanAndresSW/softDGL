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
    if (password?.length <= 40 && password.length >= 8) return true;
    if (setError) setError("La contraseña debe ser de entre 8 y 40 caracteres");
    return false;
  }

  public static image(image: File, setError?: Function):boolean {
    if (!image) return true;
    if (image?.size < 2097152) return true;
    if (setError) setError("La imágen no debe superar los 2MB");
    return false;
  }

  public static phone(phone: string, setError?: Function): boolean {
    phone = phone?.replace(/ |\.|-/g, "");
    if (phone?.trim().length === 0) return true;
    if (/^\d{10}$/.test(phone)) return true;
    if (setError) setError("Ingrese un número telefónico de 10 dígitos");
    return false;
  }

  public static website(url: string, setError?: Function): boolean {
    if (url?.trim().length === 0) return true;
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(url)) return true;
    if (setError) setError("Ingrese un URL válido");
    return false;
  }

  public static addressNumber(addressNumber: number, setError?: Function): boolean {
    if (/^[1-9]{1}\d{0,3}$/.test(addressNumber?.toLocaleString())) return true;
    if (setError) setError("Ingrese un número de dirección");
    return false;
  }
}