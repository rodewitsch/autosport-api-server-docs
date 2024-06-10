export function enumToString<T>(enumObj: T): string {
  let result = '';
  for (const key in enumObj) {
    if (!isNaN(parseInt(key))) {
      const value = enumObj[key as keyof T];
      result += `${key} - ${String(value).toLowerCase()}, `;
    }
  }
  result = result.slice(0, -2);
  return result;
}
