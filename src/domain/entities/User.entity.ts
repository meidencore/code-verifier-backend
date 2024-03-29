import mongoose from 'mongoose'
import { type IUser } from '../interfaces/IUser.interface'

export const userEntity = () => {
  const userSchema = new mongoose.Schema<IUser>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      age: { type: Number, required: true },
      password: { type: String, required: true }
    }
  )

  return mongoose.models.Users || mongoose.model<IUser>('Users', userSchema)
}
