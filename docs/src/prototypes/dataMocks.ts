import * as _ from 'lodash'
import { name, internet } from 'faker'

interface AtMentionItem {
  header: string
  image: string
  content: string
}

const getUserName = () => `${name.firstName()} ${name.lastName()}`

export const getUserNames = (userCount: number): string[] => _.times(userCount, getUserName)

export const atMentionItems: AtMentionItem[] = _.times(10, () => ({
  header: getUserName(),
  image: internet.avatar(),
  content: name.title(),
}))
