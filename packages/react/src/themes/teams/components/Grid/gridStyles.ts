import { GridVariables } from '../../../base/components/Grid/gridVariables'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { GridProps } from '../../../../components/Grid/Grid'

const gridStyles: ComponentSlotStylesInput<GridProps, GridVariables> = {
  root: (): ICSSInJSStyle => ({ '& > *': { outlineOffset: '-3px' } }),
}

export default gridStyles
