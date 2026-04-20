
export interface Success<T> {
  success:true
  data:T
}
export function success<T>(value: T): Success<T> {
  return { success: true, data: value }
}
export interface Failure {
  success:false
  error:unknown
}
export function failure(error:unknown): Failure {
  return { success: false, error: error }
}
export type Result<T> = Success<T> | Failure
