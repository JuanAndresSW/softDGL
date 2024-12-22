//Métodos de conversión y formateo.

/**Devuelve un string base 64 a partir de un valor tipo File. */
export const fileToBase64 = (file: File|Blob) => 
new Promise((resolve, reject): void => {
    const reader = new FileReader();
    if (!file) return resolve(undefined);
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
});


/**Devuelve un Blob a partir de un string en base 64.*/
export async function base64ToBlob(base64String:string): Promise<Blob> {
    const base64Response = await window.fetch(base64String);
    return await base64Response.blob();
}