import { CarouselSlideProps } from '../../../../components/Carousel/CarouselSlide'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'

const carouselSlideStyles: ComponentSlotStylesPrepared<CarouselSlideProps> = {
  root: (): ICSSInJSStyle => ({
    height: '100%',
    width: '100%',
  }),
}

export default carouselSlideStyles
