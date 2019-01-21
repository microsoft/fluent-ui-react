import { ObjectOf } from '../../../types/utils'

export interface RtlAttributes {
  [partName: string]: ObjectOf<string>
}

export type RtlFunc = (props: any) => RtlAttributes
