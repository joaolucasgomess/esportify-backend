export function verifyFieldsToObject(objeto: any) {
    return Object.values(objeto).every(
        (valor) => valor !== undefined && valor !== null && valor !== "",
    );
}
