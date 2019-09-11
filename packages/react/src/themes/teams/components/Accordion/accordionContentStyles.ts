import { ComponentSlotStylesPrepared } from '../../../types'
import { AccordionContentProps } from '../../../../components/Accordion/AccordionContent'
import { AccordionContentVariables } from './accordionContentVariables'

const accordionContentStyles: ComponentSlotStylesPrepared<
  AccordionContentProps,
  AccordionContentVariables
> = {
  root: ({ props }) => ({
    display: 'none',
    verticalAlign: 'middle',
    ...(props.active && { display: 'block' }),
    marginInlineStart: 0,
  }),
}

export default accordionContentStyles
