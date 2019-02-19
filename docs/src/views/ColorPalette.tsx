import { Provider, ProviderConsumer, Grid, Header } from '@stardust-ui/react'
import * as faker from 'faker'
import * as _ from 'lodash'
import * as React from 'react'

import ColorBox, { colorBoxStyles, colorBoxVariables } from 'docs/src/components/ColorBox'
import ColorVariants, { colorVariantsStyles } from 'docs/src/components/ColorVariants'
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
      render={({ siteVariables: { colors, contextualColors, emphasisColors, naturalColors } }) => (
        <DocPage title="Color Palette">
          <Header as="h2">Introduction</Header>
          <p>
            The color palette for a theme has many requirements and constraints. There is a need to
            be intentional and functional with color use. We analyzed existing frameworks and picked
            the best ideas from them.
          </p>
          <p>
            Each theme should match our color palette types fully. This will allow you to use our
            theming features completely and keep your palette structured.
          </p>

          <Header as="h2">Primitive colors</Header>
          <p>
            This part of the palette includes only <i>black</i> and <i>white</i> colors, we decided
            to separate by semantical ideas. There is nothing blacker than black and nothing whiter
            than white.
          </p>

          <Grid columns={2}>
            {_.map(['black', 'white'], color => (
              // TODO:try to use Segment here
              <div key={color}>
                <ColorBox name={color} rounded size="big" value={colors[color]} />
              </div>
            ))}
          </Grid>

          <Header as="h2">Natural colors</Header>
          <p>
            This part of palette includes nine colors (note, this number might be different for
            non-default theme) that are the most frequently used among popular frameworks. Each
            color includes ten gradients, this allows us to satisfy most common needs. This decision
            is experienced from Material UI and allows to define more variants than semantical
            naming (lightest, lighter, etc.).
          </p>

          <Grid columns={2} variables={{ gridGap: '2rem' }}>
            {_.map(naturalColors, (variants, color) => (
              <div key={color}>
                <ColorBox name={color} rounded value={colors[color][500]} />
              </div>
            ))}
          </Grid>

          <Header as="h2">Emphasis colors</Header>
          <p>This part of the palette includes primary and secondary colors.</p>

          <Grid columns={2}>
            {_.map(emphasisColors, (variants, color) => (
              <div key={color}>
                <ColorBox name={color} rounded size="big" value={colors[color][500]} />
              </div>
            ))}
          </Grid>

          <Header as="h2">Contextual colors</Header>
          <p>
            Contextual colors can be used to provide "meaning through colors", however they can be
            just aliases for natural colors.
          </p>

          <Grid columns={2}>
            {_.map(contextualColors, (variants, color) => (
              <div key={color}>
                <ColorBox name={color} rounded size="big" value={colors[color][500]} />
              </div>
            ))}
          </Grid>

          <Header as="h2">Text colors</Header>
          <p>
            Text variants are also provided as a separate color because in the most cases it's not
            correct to use grey color for text.
          </p>

          {_.map(colors.text, (color, variant) => (
            <ColorBox key={color} size="small" value={color}>
              {`${variant} | ${faker.lorem.sentence(4)}`}
            </ColorBox>
          ))}

          <Header as="h2">Color variables</Header>
          <Grid columns={2} variables={{ gridGap: '2rem' }}>
            {_.map(
              { ...emphasisColors, ...contextualColors, ...naturalColors },
              (variants, color) => (
                <div key={color}>
                  <ColorVariants name={color} />
                </div>
              ),
            )}
          </Grid>
        </DocPage>
      )}
    />
  </Provider>
)

export default ColorPalette
