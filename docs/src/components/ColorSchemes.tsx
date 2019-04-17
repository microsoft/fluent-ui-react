import * as React from 'react'
import { createComponent, ComponentSlotStylesInput, ThemePrepared, Grid } from '@stardust-ui/react'

import ColorBox from './ColorBox'

type ColorVariantsProps = {
  name?: string
  themes?: ThemePrepared[]
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
  render: ({ name, themes, stardust: { classes } }) => {
    if (themes.length === 0) return <></>
    const schema = themes[0].siteVariables.colorScheme[name]
    const elements = []

    Object.keys(schema).forEach(key => {
      let isFirstElement: boolean = true
      for (let i = 0; i < themes.length; i++) {
        if (isFirstElement) {
          elements.push(<ColorBox name={key} key={`${i}schema`} size="small" value={undefined} />)
          isFirstElement = false
        }
        const value = themes[i].siteVariables.colorScheme[name][key]
        elements.push(<ColorBox key={`${i}${key}`} size="small" value={value} />)
      }
    })
    return (
      <div className={classes.root}>
        <Grid columns={themes.length + 1} styles={{ backgroundColor: '#f2f2f2' }}>
          {elements}
        </Grid>
      </div>
    )
  },
})

export default ColorSchemes
