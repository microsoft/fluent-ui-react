import { CarouselProps, CarouselState } from '../../../../components/Carousel/Carousel'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { CarouselVariables } from './carouselVariables'

const carouselNavigationItemStyles: ComponentSlotStylesPrepared<
  CarouselProps & CarouselState,
  CarouselVariables
> = {
  root: (): ICSSInJSStyle => ({}),
}

export default carouselNavigationItemStyles
