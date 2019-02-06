import { ShorthandValue } from '../types'

export const getKindProp = (item: ShorthandValue, defaultValue: string) => {
  return typeof item === 'object' && (item as any).kind ? (item as any).kind : defaultValue
}
