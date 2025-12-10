import { ZodType } from 'zod'

export function validate<T>(
  values: unknown,
  schema: ZodType<T>
): { data?: T; error?: any } {
  try {
    const output = schema.parse(values)
    return {
      data: output,
    }
  } catch (error) {
    console.log(`Server error /api/coupon/post.ts: ${error}`)
    return {
      error,
    }
  }
}
