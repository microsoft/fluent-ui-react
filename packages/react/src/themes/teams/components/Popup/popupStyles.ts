import * as _ from 'lodash'
import * as React from 'react'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { PopupProps } from '../../../../components/Popup/Popup'
import { PopupVariables } from './popupVariables'

const popupStyles: ComponentSlotStylesInput<PopupProps, PopupVariables> = {
  root: (): ICSSInJSStyle => ({}),

  popup: ({ props: p, variables: v }): ICSSInJSStyle => ({
    zIndex: v.zIndex,
    position: 'absolute',
    textAlign: 'left',

    /*
     * This fix handles all cases with wrapped focus trap.
     */
    ...((React.isValidElement(p.content) || _.isFunction(p.content)) && {
      // when FocusTrap exists and `context` is JSX element
      color: v.contentColor,
      background: v.contentBackgroundColor,
    }),
    '&.ui-popup__content': {
      // when there is no FocusTrap
      color: v.contentColor,
      background: v.contentBackgroundColor,
    },
    '& .ui-popup__content': {
      // when FocusTrap exists
      color: v.contentColor,
      background: v.contentBackgroundColor,
    },
  }),
}

export default popupStyles
