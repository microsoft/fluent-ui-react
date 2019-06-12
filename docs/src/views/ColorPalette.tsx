import {
  Provider,
  ProviderConsumer,
  Grid,
  Header,
  Box,
  Text,
  mergeThemes,
  themes,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'

import ColorBox, { colorBoxStyles, colorBoxVariables } from 'docs/src/components/ColorBox'
import ColorVariants, { colorVariantsStyles } from 'docs/src/components/ColorVariants'
import DocPage from 'docs/src/components/DocPage/DocPage'
import ExampleSnippet from '../components/ExampleSnippet'
import ColorSchemes from 'docs/src/components/ColorSchemes'
import GuidesNavigationFooter from 'docs/src/components/GuidesNavigationFooter'
import { link } from 'docs/src/utils/helpers'

const theme = {
  componentStyles: {
    Box: {
      root: ({ theme: { siteVariables } }) => {
        const colorScheme = siteVariables.colorScheme
        return {
          textAlign: 'center',
          padding: '5px',
          color: colorScheme.brand.foreground3,
          backgroundColor: colorScheme.brand.background3,
          border: `1px solid ${colorScheme.brand.border}`,
          ':hover': {
            color: colorScheme.brand.foregroundHover,
            backgroundColor: colorScheme.brand.backgroundHover1,
            border: `1px solid ${colorScheme.brand.borderHover}`,
          },
        }
      },
    },
  },
}

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
      render={({
        siteVariables: { colors, contextualColors, naturalColors, transparentColors },
      }) => (
        <DocPage title="Colors">
          <Header as="h2">Introduction</Header>
          <p>
            The organizing of the colors for an application has many requirements and constraints.
            There is a need to be intentional and functional with color use. We analyzed existing
            frameworks and picked the best ideas from them. In Stardust, the colors mechanisms are
            completely based on the <code>siteVariables</code>, we don't have any additional API
            specific to the colors.
          </p>
          <p>
            There are two things important in order for colors to work transparently when the theme
            switching is in play:
          </p>
          <ul>
            <li>
              <b>{link('Color palette', '#color-palette')}</b> - central place for all colors
              available in the application
            </li>
            <li>
              <b>{link('Color scheme', '#color-scheme')}</b> - design tokens for all colors used in
              the application that should be appropriately map in all themes
            </li>
          </ul>
          <p>
            Be aware that everything that follows is our recommendation, not requirement (everything
            will work even if you decide to structure the palette and schemas differently in your
            theme)
          </p>
          <Header as="h2" content="Color palette" />
          <p>We have structured the color palette in several categories.</p>

          <Header as="h3">Primitive colors</Header>
          <p>
            This part of the palette includes only <i>black</i> and <i>white</i> colors, we decided
            to separate by semantical ideas. There is nothing blacker than black and nothing whiter
            than white.
          </p>

          <Grid columns={2}>
            {_.map(['black', 'white'], color => (
              <div key={color}>
                <ColorBox name={color} rounded size="big" value={colors[color]} />
              </div>
            ))}
          </Grid>

          <Header as="h3">Natural colors</Header>
          <p>
            This part of palette includes several colors from the set of colors that are the most
            frequently used among popular frameworks (blue, green, grey, orange, pink, purple, teal,
            red, yellow). Each color includes at least ten gradients, this allows us to satisfy most
            common needs. This decision is experienced from Material UI and allows to define more
            variants than semantical naming (lightest, lighter, etc.). The reason why we don't
            require all colors to be implemented, is just becase some application may not use some
            of these colors, so we don't want to add overheader for defining things which are not
            necessary.
          </p>

          <Grid columns={2} variables={{ gridGap: '2rem' }}>
            {_.map(naturalColors, (variants, color) => (
              <div key={color}>
                <ColorBox name={color} rounded value={colors[color][600]} />
              </div>
            ))}
          </Grid>

          <Header as="h3">Contextual colors</Header>
          <p>
            This part of the palette may include brand color as well as danger, success, info colors
            etc.
          </p>

          <Grid columns={2}>
            {_.map(contextualColors, (variants, color) => (
              <div key={color}>
                <ColorBox name={color} rounded size="big" value={colors[color][600]} />
              </div>
            ))}
          </Grid>

          <Header as="h3">All colors</Header>
          <p>These are all colors available in the color palette.</p>
          <Grid columns={2} variables={{ gridGap: '2rem' }}>
            {_.map(
              { ...contextualColors, ...naturalColors, ...transparentColors },
              (variants, color) => (
                <div key={color}>
                  <ColorVariants name={color} />
                </div>
              ),
            )}
          </Grid>

          <Header as="h2" content="Color scheme" />
          <p>
            Now that we know how the color palette is defined, let's see how we can use these
            values, so that they will work correctly when different themes will be applied. As part
            of each theme, we are defining <b>color scheme</b>, which will define the design tokens
            usages of the different colors from the palette, that make sense for the developers.
          </p>

          <p>
            Let's see how the user can safely use the tokens from the color scheme in the styles, as
            those will be mapped to the correct values in all themes. The following example will
            illustrate this:
          </p>

          <ExampleSnippet
            value={`
            import React from 'react'
            import { Button } from '@stardust-ui/react'

            const theme = {
              componentStyles: {
                Box: {
                  root: ({ theme: { siteVariables } }) => {
                    const colorScheme = siteVariables.colorScheme
                    return {
                      color: colorScheme.brand.foreground3,
                      backgroundColor: colorScheme.brand.background,
                      border: \`1px solid \${colorScheme.brand.border}\`,
                      ':hover': {
                        color: colorScheme.brand.foregroundHover,
                        backgroundColor: colorScheme.brand.backgroundHover,
                        border: \`1px solid \${colorScheme.brand.borderHover}\`,
                      },
                    }
                  },
                },
              },
            }

            const ColorSchemeExample = () => (
              <Provider theme={mergeThemes(themes.teams, theme)}>
                 <Text content={'Box in light theme'} />
                 <Box content={'LIGHT THEME - HOVER ME'}/>
                 <Text content={'Box in high contrast theme'} />
                 <Provider theme={themes.teamsHighContrast}>
                   <Box content={'HIGH CONTRAST THEME - HOVER ME'}/>
                 </Provider>
              </Provider>
            )

            export default ColorSchemeExample
        `}
            render={() => (
              <Provider theme={mergeThemes(themes.teams, theme)}>
                <Text content={'Box in light theme'} />
                <Box content={'LIGHT THEME - HOVER ME'} />
                <Text content={'Box in high contrast theme'} />
                <Provider theme={themes.teamsHighContrast}>
                  <Box content={'HIGH CONTRAST THEME - HOVER ME'} />
                </Provider>
              </Provider>
            )}
          />

          <p>
            Here is how one color scheme looks like, defined for brand in Teams light, high contrast
            and dark themes.
          </p>

          <ColorSchemes
            themes={[themes.teams, themes.teamsHighContrast, themes.teamsDark]}
            headers={[
              {
                as: 'h3',
                content: 'Design token',
              },
              {
                as: 'h3',
                content: 'Light theme',
              },
              {
                as: 'h3',
                content: 'HC theme',
              },
              {
                as: 'h3',
                content: 'Dark theme',
              },
            ]}
            name={'brand'}
          />

          <p>
            The color scheme is just a recommendation of how the color design tokens can be
            organized. If needed, you can add multiple color schemes per theme, like inverted, or
            specific to the parts of the application that looks different. If your design team has
            provided you with different names for the design tokens, you can use those, by
            introducing values in the <code>siteVariables</code>, just be sure that they will be
            mapped to the correct color from the palette in each theme.
          </p>
          <GuidesNavigationFooter
            previous={{ name: 'Theming Examples', url: 'theming-examples' }}
            next={{ name: 'Layout', url: 'layout' }}
          />
        </DocPage>
      )}
    />
  </Provider>
)

export default ColorPalette
