export type UserStatus = 'Available' | 'DoNotDisturb' | 'Away' | 'Offline'

export interface IUser {
  id: string
  avatar: string
  displayName: string
  email: string
  firstName: string
  lastName: string
  status: UserStatus
}

export interface IMessage {
  id: string
  content: string
  date: Date
  timestamp: string
  timestampLong: string
  from: string
  isImportant: boolean
  mine: boolean
}

export interface IChat {
  id: string
  currentUser: IUser
  isOneOnOne: boolean
  members: Map<string, IUser>
  messages: IMessage[]
  title: string
}
