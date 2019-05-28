import { ComponentSlotStylesInput } from '../../../types'
import { AppLayoutAreaProps } from '../../../../components/AppLayout/AppLayoutArea'

import { AppLayoutAreaVariables } from './appLayoutAreaVariables'

const appLayoutAreaStyles: ComponentSlotStylesInput<AppLayoutAreaProps, AppLayoutAreaVariables> = {
  root: ({ props }) => ({
    boxSizing: 'border-box',
    gridArea: props.area,
    overflow: 'hidden',

    // make chilren fill the area
    '> *': {
      // alignSelf: 'stretch',
      height: '100%',
      width: '100%',
    },

    // debug
    ...(props.debug && {
      border: '4px solid cornflowerblue',
    }),
  }),
}

export default appLayoutAreaStyles
