 export function verifyFieldsToObject<T>(obj: T): boolean {
    console.log(obj)
    for (const chave in obj) {
      if (chave === null || chave === undefined) {
        console.log(chave)
        return false
      }
    }
    return true
  }