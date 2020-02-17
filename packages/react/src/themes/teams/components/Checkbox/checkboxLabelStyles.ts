import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { CheckboxLabelProps } from '../../../../components/Checkbox/CheckboxLabel'

const checkboxLabelStyles: ComponentSlotStylesPrepared<CheckboxLabelProps, never> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    display: 'block', // IE11: should be forced to be block, as inline-block is not supported
    gridColumn: p.labelPosition === 'start' ? 1 : 3,
  }),
}

export default checkboxLabelStyles
