import { lorem, date, random, name, internet } from 'faker'
import * as _ from 'lodash'
import { IMessage, IUser, IChat, UserStatus } from './interfaces'

export interface ChatOptions {
  userCount?: number
  msgCount?: number
}

const userStatuses: UserStatus[] = ['Available', 'Away', 'DoNotDisturb', 'Offline']

class ChatMock {
  private static readonly minUserCount = 2
  private static readonly defaultCount = 10
  private static readonly defaultChatTitle = 'Test Chat'

  private userIds: string[] = []
  private usersMap: Map<string, IUser> = new Map()
  private chatMessages: IMessage[] = []
  public chat: IChat

  constructor(
    private options: ChatOptions = {
      userCount: ChatMock.defaultCount,
      msgCount: ChatMock.defaultCount,
    },
  ) {
    if (this.options.userCount < ChatMock.minUserCount) {
      throw `[ChatMock]: A chat has a minimum of ${ChatMock.minUserCount} users`
    }

    this.userIds = _.times(this.options.userCount, i => random.uuid())

    this.userIds.forEach(id => {
      const firstName = name.firstName()
      const lastName = name.lastName()
      const user: IUser = {
        id,
        firstName,
        lastName,
        avatar: internet.avatar(),
        displayName: internet.userName(firstName, lastName),
        email: internet.email(firstName, lastName),
        status: userStatuses[_.random(userStatuses.length - 1)],
      }

      this.usersMap.set(id, user)
    })

    const currentUser = this.usersMap.get(this.userIds[0])

    this.chatMessages = _.times(this.options.msgCount, id => {
      const mine = random.boolean()
      const from = (mine ? currentUser : this.getRandomUser()).id

      const message: IMessage = {
        id,
        from,
        mine,
        content: lorem.sentences(_.random(1, 5, false)),
        date: date.past(),
        isImportant: random.boolean(),
      }

      return message
    })

    this.chat = {
      id: random.uuid(),
      currentUser,
      isOneOnOne: this.usersMap.size === ChatMock.minUserCount,
      messages: this.chatMessages,
      members: this.usersMap,
      title: ChatMock.defaultChatTitle,
    }
  }

  private getRandomUser(max: number = this.usersMap.size - 1): IUser {
    return this.usersMap.get(this.userIds[random.number({ max, precision: 1 })])
  }
}

export const getChatMock = (options?: ChatOptions) => new ChatMock(options)
