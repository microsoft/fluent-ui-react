import { ComponentSlotStylesInput } from '../../../types'
import { AppLayoutProps } from '../../../../components/AppLayout/AppLayout'

import { AppLayoutVariables } from './appLayoutVariables'

const appLayoutStyles: ComponentSlotStylesInput<AppLayoutProps, AppLayoutVariables> = {
  root: ({ props }) => ({
    position: 'relative',
    boxSizing: 'border-box',
    display: 'grid',
    gridGap: props.gap,
    gridTemplate: props.template,

    // fill view
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',

    // debug
    ...(props.debug && {
      border: '4px solid red',
    }),
  }),
}

export default appLayoutStyles
