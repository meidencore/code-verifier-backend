export enum KataLevel {
  BASIC = 'Basic',
  MEDIUN = 'Medium',
  HIGH = 'High'
}

export interface IKata {
  name: string
  description: string
  level: KataLevel
  intents: number
  stars: number
  creator: string // Id of User
  solution: string
  participants: string[]
}
