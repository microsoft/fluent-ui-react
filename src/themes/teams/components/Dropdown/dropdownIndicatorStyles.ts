import { DropdownMessageNoResultsProps } from '../../../../components/Dropdown/DropdownMessageNoResults'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'

const dropdownIndicatorStyles: ComponentSlotStylesInput<DropdownMessageNoResultsProps, any> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    height: v.toggleButtonSize,
    width: v.toggleButtonSize,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    ...(p.fluid ? { right: 0 } : { left: `calc(${v.width} - ${v.toggleButtonSize})` }),
  }),
}

export default dropdownIndicatorStyles
