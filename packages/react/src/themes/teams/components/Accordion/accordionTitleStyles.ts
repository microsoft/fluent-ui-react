import { ICSSInJSStyle } from '../../../types'
import Indicator from '../../../../components/Indicator/Indicator'

const accordionTitleStyles = {
  root: (): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '.5rem 0',
    cursor: 'pointer',

    ':hover': {
      [`& .${Indicator.className}`]: {
        opacity: 1,
      },
    },
  }),
  indicator: (): ICSSInJSStyle => ({
    marginTop: '-.4rem',
    userSelect: 'none',
    opacity: 0.5,
  }),
}

export default accordionTitleStyles
