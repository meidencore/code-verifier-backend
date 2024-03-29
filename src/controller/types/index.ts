/**
 * Basic Json response for controllers
 */
export type BasicResponse = {
  message: string
}

/**
 * Error Json response for controllers
 */
export type ErrorResponse = {
  error: string
  message: string
}

/**
 * Auth Json response for controllers
 */
export type AuthResponse = {
  message: string
  token: string
}
