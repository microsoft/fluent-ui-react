import { CarouselNavigationProps } from '../../../../components/Carousel/CarouselNavigation'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { CarouselNavigationVariables } from './carouselNavigationVariables'
import { pxToRem } from '../../../../lib'

const carouselNavigationStyles: ComponentSlotStylesPrepared<
  CarouselNavigationProps,
  CarouselNavigationVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    justifyContent: 'center',
    minHeight: pxToRem(24),
    margin: 0,
    padding: 0,
    color: v.color,
    backgroundColor: v.backgroundColor || 'inherit',
    listStyleType: 'none',
  }),
}

export default carouselNavigationStyles
