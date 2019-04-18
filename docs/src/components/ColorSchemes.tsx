import * as React from 'react'
import * as _ from 'lodash'
import {
  createComponent,
  ComponentSlotStylesInput,
  ThemePrepared,
  Grid,
  ShorthandValue,
  Header,
} from '@stardust-ui/react'

import ColorBox from './ColorBox'

type ColorVariantsProps = {
  name?: string
  themes?: ThemePrepared[]
  headers?: ShorthandValue[]
}

export const colorVariantsStyles: ComponentSlotStylesInput<ColorVariantsProps> = {
  root: {
    border: '1px solid transparent',
    borderRadius: '.25rem',
    overflow: 'hidden',
  },
}

const ColorSchemes = createComponent<ColorVariantsProps>({
  displayName: 'ColorVariants',
  render: ({ name, themes, headers, stardust: { classes } }) => {
    if (themes.length === 0) return <></>
    const schema = themes[0].siteVariables.colorScheme[name]
    const elements = []

    Object.keys(schema).forEach(key => {
      let isFirstElement: boolean = true
      for (let i = 0; i < themes.length; i++) {
        if (isFirstElement) {
          elements.push(
            <ColorBox
              name={key}
              key={`${i}schema`}
              size="small"
              value={undefined}
              styles={{ backgroundColor: '#f2f2f2' }}
            />,
          )
          isFirstElement = false
        }
        const value = themes[i].siteVariables.colorScheme[name][key]
        elements.push(<ColorBox key={`${i}${key}`} size="small" value={value} />)
      }
    })

    const columns = `auto ${_.times(themes.length, () => '180px').join(' ')}`
    return (
      <div className={classes.root}>
        <Grid columns={columns}>
          {headers && headers.map(header => Header.create(header))}
          {elements}
        </Grid>
      </div>
    )
  },
})

export default ColorSchemes
