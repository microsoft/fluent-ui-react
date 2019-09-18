import { ComponentSlotStylesInput, ThemeInput } from '@stardust-ui/react'
import { ChatBookendProps } from '../ChatBookend'

export type LDSComponentSlotStylesInput = ComponentSlotStylesInput & {
  ChatBookend: ComponentSlotStylesInput<ChatBookendProps>
}
export type LDSThemeInput = ThemeInput & { componentStyles: LDSComponentSlotStylesInput }
