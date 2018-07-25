import React from 'react'
import { createComponent } from 'react-fela'

import { pxToRem } from 'src/lib'
import KnobsField from './KnobsField'
import KnobsControl from './KnobsControl'
import KnobsLabel from './KnobsLabel'
import KnobsValue from './KnobsValue'

import KnobsBoolean from './KnobsBoolean'
import KnobsScalar from './KnobsScalar'

const Knobs: any = createComponent(
  () => ({
    position: 'relative',
    display: 'inline-block',
    padding: `${pxToRem(5)} ${pxToRem(10)}`,
    width: '50%',
    minWidth: '20rem',
    fontFamily: 'monospace',
    fontSize: pxToRem(12),
    fontWeight: 'bold',
    lineHeight: '1.5',
    background: 'whitesmoke',
    color: '#777',
    '::before': {
      content: "'knobs = {'",
    },
    '::after': {
      content: "'}'",
    },
  }),
  'div',
)
Knobs.Field = KnobsField
Knobs.Control = KnobsControl
Knobs.Label = KnobsLabel
Knobs.Value = KnobsValue

Knobs.Boolean = KnobsBoolean
Knobs.Scalar = KnobsScalar

export default Knobs
