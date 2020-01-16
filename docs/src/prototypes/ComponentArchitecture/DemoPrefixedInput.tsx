import { compose } from '@fluentui/react-theming'
import { BasePrefixedInput } from './BasePrefixedInput'
import { CustomIcon } from './CustomIcon'

export const DemoPrefixedInput = compose(BasePrefixedInput, {
  slots: {
    icon: CustomIcon,
  },
})
