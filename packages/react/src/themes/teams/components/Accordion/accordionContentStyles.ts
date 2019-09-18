import { ComponentSlotStylesPrepared } from '../../../types'
import { AccordionContentProps } from '../../../../components/Accordion/AccordionContent'

const accordionContentStyles: ComponentSlotStylesPrepared<AccordionContentProps> = {
  root: ({ props }) => ({
    display: 'none',
    verticalAlign: 'middle',
    ...(props.active && { display: 'block' }),
    marginInlineStart: 0,
  }),
}

export default accordionContentStyles
