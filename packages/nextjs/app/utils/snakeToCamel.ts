import { camelCase } from 'lodash'

/**
 * This function converts either an object and it's keys or an array of objects and it's keys to camelCase
 */
export function snakeToCamel(obj: any): any {
  if (typeof obj !== 'object' || obj === null || obj instanceof Date) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel)
  }

  const camelCasedObj: any = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCasedKey = camelCase(key)
      camelCasedObj[camelCasedKey] = snakeToCamel(obj[key])
    }
  }

  return camelCasedObj
}
