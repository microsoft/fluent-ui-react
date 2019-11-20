import { Provider, ProviderConsumer, Grid } from '@fluentui/react'
import * as _ from 'lodash'
import * as React from 'react'

import ColorBox, { colorBoxStyles, colorBoxVariables } from 'docs/src/components/ColorBox'
import { colorVariantsStyles } from 'docs/src/components/ColorVariants'
import DocPage from 'docs/src/components/DocPage/DocPage'

const ColorPalette = () => (
  <Provider
    theme={{
      componentStyles: {
        ColorBox: colorBoxStyles,
        ColorVariants: colorVariantsStyles,
        Header: {
          root: {
            fontWeight: 700,
          },
        },
      },
      componentVariables: {
        ColorBox: colorBoxVariables,
      },
    }}
  >
    <ProviderConsumer
      render={({ siteVariables: { categoryColors } }) => (
        <DocPage title="Category color palette">
          <p>
            This page displays all category colors in the Teams theme. These colors are used for
            features like calendar, announcement posts, and text formatting.
          </p>

          <Grid columns={2} variables={{ gridGap: '2rem' }}>
            {_.map(categoryColors, (variants, colorName) => (
              <div key={colorName}>
                <ColorBox
                  name={colorName}
                  size="normal"
                  value={
                    categoryColors[colorName][600] ||
                    categoryColors[colorName][500] ||
                    categoryColors[colorName][400]
                  }
                  copyToClipboardIcon={false}
                />
                {_.map(categoryColors[colorName], (value, variable) => (
                  <ColorBox key={variable} name={variable} size="small" value={value} />
                ))}
              </div>
            ))}
          </Grid>
        </DocPage>
      )}
    />
  </Provider>
)

export default ColorPalette
