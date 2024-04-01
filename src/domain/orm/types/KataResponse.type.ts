import { type IKata } from '../../interfaces/IKata.interface'

export type KataResponse = {
  katas: IKata[]
  totalPages: number
  currentPage: number
}
