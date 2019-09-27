import { pxToRem } from '../../../../lib'
import { CarouselProps } from '../../../../components/Carousel/Carousel'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { CarouselVariables } from './carouselVariables'

const carouselStyles: ComponentSlotStylesPrepared<CarouselProps, CarouselVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
  }),
  contentContainerWrapper: ({ variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    width: pxToRem(v.width),
    overflowX: 'hidden',
  }),
  contentContainer: ({ variables: v }): ICSSInJSStyle => ({
    padding: 0,
    margin: 0,
    display: 'flex',
    listStyle: 'none',
  }),
  itemContainer: ({ variables: v }): ICSSInJSStyle => ({
    width: pxToRem(v.width),
  }),
  item: ({ variables: v }): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
  }),
  buttonNext: ({ variables: v }): ICSSInJSStyle => ({
    height: pxToRem(v.buttonNextSize),
    top: pxToRem(-v.height / 2 - v.buttonNextSize / 2),
    left: pxToRem(v.width - 2 * v.buttonNextSize),
  }),
  buttonPrevious: ({ variables: v }): ICSSInJSStyle => ({
    height: pxToRem(v.buttonPreviousSize),
    top: pxToRem(-v.height / 2 - v.buttonPreviousSize / 2),
  }),
}

export default carouselStyles
