import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import {
  default as Dropdown,
  DropdownProps,
  DropdownState,
} from '../../../../components/Dropdown/Dropdown'
import { DropdownVariablesHOC } from 'src/themes/teams-high-contrast/components/Dropdown/dropdownVariables'

type DropdownPropsAndState = DropdownProps & DropdownState

const transparentColorStyle: ICSSInJSStyle = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderBottomColor: 'transparent',
}

const dropdownStyles: ComponentSlotStylesInput<DropdownPropsAndState, DropdownVariablesHOC> = {
  container: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ':hover': {
      backgroundColor: v.backgroundColorHover,
      borderColor: v.borderColorHover,
      [`.${Dropdown.slotClassNames.triggerButton}`]: {
        color: v.triggerButtonColorHover,
      },
    },
  }),

  triggerButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ':hover': {
      ...transparentColorStyle,
      color: v.triggerButtonColorHover,
    },
    ':focus': {
      color: v.color,
      ':active': {
        color: v.color,
      },
    },
  }),
}

export default dropdownStyles
