import { ComponentSlotStylesPrepared } from '@fluentui/styles'
import { AccordionTitleProps } from '../../../../components/Accordion/AccordionTitle'

const accordionTitleStyles: ComponentSlotStylesPrepared<AccordionTitleProps> = {
  root: () => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '.5rem 0',
    cursor: 'pointer',
  }),
  indicator: () => ({
    userSelect: 'none',
  }),
}

export default accordionTitleStyles
