import { DropdownSelectedItemProps } from '../../../../components/Dropdown/DropdownSelectedItem'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'

const dropdownSelectedItemStyles: ComponentSlotStylesInput<DropdownSelectedItemProps> = {
  root: (): ICSSInJSStyle => ({
    margin: '.4rem 0 0 .4rem',
  }),
}

export default dropdownSelectedItemStyles
