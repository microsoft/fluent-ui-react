import { CarouselContentProps } from '../../../../components/Carousel/CarouselContent'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'

const carouselContentStyles: ComponentSlotStylesPrepared<CarouselContentProps> = {
  root: (): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
  }),
}

export default carouselContentStyles
