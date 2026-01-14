import { decodeBase64String } from './decodeBase64String'
import { assert, it } from 'vitest'

it('decodes valid Base64 encoded JSON string', () => {
  const jsonString = '{"name": "John", "age": 30}'
  const encodedString = btoa(jsonString)
  assert.equal(JSON.stringify(decodeBase64String(encodedString)), JSON.stringify({ name: 'John', age: 30 }))
})

it('returns null for invalid JSON string', () => {
  const invalidJsonString = 'this is not valid JSON'
  const encodedString = btoa(invalidJsonString)
  assert.equal(decodeBase64String(encodedString), null)
})

it('returns null for invalid Base64 string', () => {
  const invalidBase64String = 'this is not valid Base64'
  assert.equal(decodeBase64String(invalidBase64String), null)
})
