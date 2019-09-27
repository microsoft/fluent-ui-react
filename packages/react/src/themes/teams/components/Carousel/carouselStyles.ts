import { pxToRem } from '../../../../lib'
import { CarouselProps, CarouselState } from '../../../../components/Carousel/Carousel'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { CarouselVariables } from './carouselVariables'

const carouselStyles: ComponentSlotStylesPrepared<
  CarouselProps & CarouselState,
  CarouselVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
  }),
  contentContainerWrapper: ({ variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    width: pxToRem(v.width),
    overflowX: 'hidden',
  }),
  contentContainer: ({ props: p, variables: v }): ICSSInJSStyle => ({
    padding: 0,
    margin: 0,
    display: 'flex',
    listStyle: 'none',
    transform: `translateX(${pxToRem(-v.width * p.activeIndex)})`,
    transitionDuration: '1s',
    willChange: 'transform',
  }),
  itemContainer: ({ variables: v }): ICSSInJSStyle => ({
    width: pxToRem(v.width),
  }),
  item: ({ variables: v }): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
  }),
  buttonNext: ({ props: p, variables: v }): ICSSInJSStyle => ({
    height: pxToRem(v.buttonNextSize),
    top: pxToRem(-v.height / 2 - v.buttonNextSize / 2),
    left: pxToRem(v.width - 2 * v.buttonNextSize),
    ...(p.items !== undefined && {
      visibility: p.activeIndex === p.items.length - 1 ? 'hidden' : 'visible',
    }),
  }),
  buttonPrevious: ({ props: p, variables: v }): ICSSInJSStyle => ({
    height: pxToRem(v.buttonPreviousSize),
    top: pxToRem(-v.height / 2 - v.buttonPreviousSize / 2),
    ...(p.items !== undefined && {
      visibility: p.activeIndex === 0 ? 'hidden' : 'visible',
    }),
  }),
}

export default carouselStyles
