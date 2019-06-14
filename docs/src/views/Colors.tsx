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
import { Link } from 'react-router-dom'

import ColorBox, { colorBoxStyles, colorBoxVariables } from 'docs/src/components/ColorBox'
import Fader, { faderStyles } from 'docs/src/components/Fader'
import ColorVariants, { colorVariantsStyles } from 'docs/src/components/ColorVariants'
import DocPage from 'docs/src/components/DocPage/DocPage'
import ExampleSnippet from '../components/ExampleSnippet'
import ColorSchemes from 'docs/src/components/ColorSchemes'
import GuidesNavigationFooter from 'docs/src/components/GuidesNavigationFooter'
import { link, code } from 'docs/src/utils/helpers'

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

const Colors = () => (
  <Provider
    theme={{
      componentStyles: {
        ColorBox: colorBoxStyles,
        ColorVariants: colorVariantsStyles,
        Fader: faderStyles,
        Header: {
          root: {
            fontWeight: 700,
          },
        },
        Text: {
          root: ({ theme: { siteVariables } }) => ({
            '& a': {
              color: siteVariables.colorScheme.brand.foreground,
            },
          }),
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
              <Text weight="bold" color="primary">
                {link('Color palette', '#color-palette')}
              </Text>{' '}
              - central place for all colors available in the application,
            </li>
            <li>
              <Text weight="bold" color="primary">
                {link('Color scheme', '#color-scheme')}
              </Text>{' '}
              - design tokens for all colors used in the application that should be appropriately
              mapped in all themes.
            </li>
          </ul>
          <p>
            Be aware that everything that follows is our recommendation, not the requirement
            (everything will work even if you'll decide to structure the palette and schemas
            differently in your theme).
          </p>
          <Header as="h2" content="Color palette" />
          <p>Colors in color palette have the following categorization.</p>

          <Header as="h3">Primitive colors</Header>
          <p>
            This part of the palette contains colors that, semantically, cannot have any tints. This
            group is represented by two colors, {code('black')} and {code('white')} - as there is
            nothing blacker than black and nothing whiter than white.
          </p>

          <Grid columns={2}>
            {_.map(['black', 'white'], color => (
              <div key={color}>
                <ColorBox
                  name={color}
                  rounded
                  size="big"
                  value={colors[color]}
                  copyToClipboardIcon={false}
                />
              </div>
            ))}
          </Grid>

          <Header as="h3">Natural colors</Header>
          <p>
            This part of palette includes colors from those that are the most commonly used among
            popular frameworks ({code('blue')}, {code('green')}, {code('grey')},{code('orange')},{' '}
            {code('pink')}, {code('purple')}, {code('teal')}, {code('red')}, {code('yellow')}). Each
            color includes at least ten gradients, this allows us to satisfy most common needs. This
            decision is experienced from Material UI and allows to define more variants than by
            using semantical naming ({code('lightest')}, {code('lighter')}, etc.).
          </p>
          <p>
            There is no requirement for client to define all the gradient values for each color - it
            is just enough to define those that are actually used in the app.
          </p>

          <Grid columns={2} variables={{ gridGap: '2rem' }}>
            {_.map(naturalColors, (variants, color) => (
              <div key={color}>
                <ColorBox
                  name={color}
                  rounded
                  value={colors[color][600]}
                  copyToClipboardIcon={false}
                />
              </div>
            ))}
          </Grid>

          <Header as="h3">Contextual colors</Header>
          <p>
            This part of the palette may include {code('brand')} color as well as {code('danger')},{' '}
            {code('success')}, {code('info')} colors, etc.
          </p>

          <Grid columns={2}>
            {_.map(contextualColors, (variants, color) => (
              <div key={color}>
                <ColorBox
                  name={color}
                  rounded
                  size="big"
                  value={colors[color][600]}
                  copyToClipboardIcon={false}
                />
              </div>
            ))}
          </Grid>

          <Header as="h3">All colors</Header>
          <p>
            If the theme requires more colors, they can be added as well as available options in the
            color palette. These are all colors available in the Teams' theme color palette.
          </p>
          <Grid columns={2} variables={{ gridGap: '2rem' }}>
            {_.map(['black', 'white'], color => (
              <div key={color}>
                <ColorBox
                  name={color}
                  size="big"
                  value={colors[color]}
                  copyToClipboardIcon={false}
                />
              </div>
            ))}
            {_.map(
              { ...contextualColors, ...naturalColors, ...transparentColors },
              (variants, color) => (
                <div key={color}>
                  <ColorVariants name={color} headerOnly />
                </div>
              ),
            )}
          </Grid>
          <p>
            To see all colors variants in the palette, follow this{' '}
            <Text as={Link} weight="bold" content="link" color="brand" to="color-palette" />.
          </p>

          <Header as="h2" content="Color scheme" />
          <p>
            Now that we know how the color palette is defined, let's see how we can use these
            values, so that they will work correctly when different themes will be applied. As part
            of each theme, we are defining <b>color scheme</b>, which will define the design tokens
            usages of the different colors from the palette. The color scheme is a prop of
            siteVariables, containing schemas for the colors available in the palette. This is the
            typical usage example of color scheme{' '}
            <code>siteVariables.colorScheme.brand.foreground</code>, where:
            <ul>
              <li>colorScheme is the object containing all color tokens</li>
              <li>
                brand is categorization of the tokens per color - contains all tokens for the{' '}
                <code>brand</code> color
              </li>
              <li>
                foreground is a{' '}
                <b>
                  color token (theme-dependent value) that should be used as value in styles. Note
                  that actual token's value is dependent on theme.
                </b>{' '}
                You can see an example of tokens defined for Teams theme{' '}
                <Text as={Link} weight="bold" content="here" color="brand" to="color-schemes" />
              </li>
            </ul>
          </p>
          <p>
            The color tokens defined in the color scheme are mapped to actual values for all themes
            used in the application. This means that, if the developers use some token from the
            schema, it will be mapped to the correct color value provided by the current theme.
          </p>

          <p>Let's illustrate this with an example:</p>

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

          <Fader url={'color-schemes'}>
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
          </Fader>

          <p>
            The color scheme is just a recommendation of how the color design tokens can be
            organized. If needed, you can add multiple color schemes per theme, like inverted, or
            specific to the parts of the application that looks different. If your design team has
            provided you with different names for the design tokens, you can use those, by
            introducing values in the <code>siteVariables</code>, just be sure that they will be
            mapped to the correct color from the palette in each theme. You can see all color
            schemes defined for Teams' themes{' '}
            <Text as={Link} weight="bold" content="here" color="brand" to="color-schemes" />
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

export default Colors
