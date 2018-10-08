import React from 'react'
import { Accordion } from '@stardust-ui/react'

const panels = [
  {
    key: 'p',
    title: 'What is a point?',
    content: 'Use the haptic SDD circuit, then you can index the redundant pixel!',
  },
  {
    key: 'd',
    title: 'What is a dimension of a point?',
    content: 'We need to copy the primary USB firewall!',
  },
  {
    key: 'e',
    title: 'Nested Accordion',
    accordion: {
      panels: [
        {
          key: 'f',
          title: 'What is a point?',
          content: 'Use the haptic SDD circuit, then you can index the redundant pixel!',
        },
        {
          key: 'g',
          title: 'What is a dimension of a point?',
          content: 'We need to copy the primary USB firewall!',
        },
      ],
      exclusive: true,
    },
  },
]

const AccordionExample = () => <Accordion panels={panels} />

export default AccordionExample
