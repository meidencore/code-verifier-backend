import jwt from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'

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

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Check HEADER from Request for 'x-access-token'

  const token: any = req.headers['x-access-token']

  // verify if jwt is present
  if (!token) {
    return res.status(403).send({
      authenticationError: 'Missing JWT in request',
      message: 'Not Authorized to consume this endpoint'
    })
  } else {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(500).send({
          authenticationError: 'JWT verification failed',
          message: 'Failed to verify JWT token in request'
        })
      }
    })
  }

  // verify the token obtained

  // Execute Next function -> Protected Routes will be executed
  next()
}
