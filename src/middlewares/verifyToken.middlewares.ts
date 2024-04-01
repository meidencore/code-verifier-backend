import jwt from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
import { type jwtErrorResponse } from './types'

// configuration of dotenv
dotenv.config()

// Obtain the SECRETKEY to verify the Token
const secret: any = process.env.SECRETKEY

/**
 *
 * @param {Request} req Original Request previus middleware of verification JWT
 * @param {Response} res Response to verification of JWT
 * @param {NextFunction} next Next function to be executed
 * @returns Errors of verification or next execution
 */

export const verifyToken = (req: Request, res: Response, next: NextFunction): Response<jwtErrorResponse> | undefined => {
  // Check HEADER from Request for 'x-access-token'
  const token: any = req.headers['x-access-token']

  // verify if jwt is present
  if (!token) {
    return res.status(403).send({
      authenticationError: 'Missing JWT in request',
      message: 'Not Authorized to consume this endpoint'
    })
  } else {
    // verify the token obtained
    jwt.verify(token, secret, (err: any, decoded: any) => {
      // Check for expired first cause err are always an instance of JsonWebTokenError and only expired are instance of TokenExpiredError
      if (err instanceof jwt.TokenExpiredError) {
        // Response if the token has expired
        return res.status(401).send({
          authenticationError: 'JWT verification failed',
          message: 'Expired token provided'
        })
      } else if (err instanceof jwt.JsonWebTokenError && err.message === 'invalid token') {
        // Response if the token is not valid
        return res.status(400).send({
          authenticationError: 'JWT verification failed',
          message: 'Invalid token provided'
        })
      } else if (err) {
        // throw an exception to any other error
        return res.status(400).send({
          authenticationError: 'JWT verification failed',
          message: 'Failed to verify JWT token in request'
        })
      } else {
        // Execute Next function -> Protected Routes will be executed
        next()
      }
    })
  }
}
