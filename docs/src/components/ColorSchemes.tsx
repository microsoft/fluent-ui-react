import * as React from 'react'
import * as _ from 'lodash'
import {
  createComponent,
  ComponentSlotStylesInput,
  Grid,
  Header,
  HeaderProps,
  ShorthandCollection,
  ThemeInput,
} from '@stardust-ui/react'

import ColorBox from './ColorBox'

type ColorVariantsProps = {
  name?: string
  themes?: ThemeInput[]
  headers?: ShorthandCollection<HeaderProps>
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

    const colorSchemes = _.map(themes, theme => theme.siteVariables.colorScheme[name])

    const elements = _.flatMap(_.head(colorSchemes), (i, token) => [
      <ColorBox
        copyToClipboardIcon={false}
        showColorValue={false}
        name={token}
        key={`${token}schema`}
        size="small"
        value={undefined}
        styles={{ backgroundColor: '#f2f2f2' }}
      />,
      ..._.map(colorSchemes, (colorScheme, i) => (
        <ColorBox
          key={`${token}${i}`}
          size="small"
          value={colorScheme[token]}
          copyToClipboardIcon={false}
        />
      )),
    ])

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
