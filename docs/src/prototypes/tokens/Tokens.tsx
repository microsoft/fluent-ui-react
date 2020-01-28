import * as React from 'react'
import * as _ from 'lodash'
import { Button } from '@fluentui/react'
import { ThemeInput } from '@fluentui/styles'
import * as Color from 'color'
import { toggleButtonBehavior } from '@fluentui/accessibility'

/**
 TODO LIST
 1. Add 3rd global layer tokens

 2. Add tokens for these:
    PLATE ACCENT SET:
    PlateAccent-Color-Fill-Rest
    PlateAccent -Color-Border-Rest
    PlateAccent-Elevation-Rest
    PlateAccent-Color-Shadow-Rest
    PlateAccent-Corner-UIRadius

    FOREGROUND:
    Type-UILabel-Regular
    PlateAccent -Color-Foreground-Rest

    FOCUS:
    Border-FocusRectOuter-Width
    Border-FocusRectInner-Width
    Color-FocusRectOuter
    Color-FocusRectInner

 3. Once we get some tokens defined:
    - How does a designer use these? What does the UI look like?

 4. Potentially build out Spencer's color page as working prototype

 5. Potentially allow selecting a component, open side panel showing tokens for aspects of design (color, elevation, radius)
 */

// ///////////////////////////////////////
// Color Tools

const colorForegroundOnDark = Color('#fff')
const colorForegroundOnLight = Color('#000')

const lighten = c => c.lighten(0.5)
const darken = c => c.darken(0.5)
const textColorOn = c => {
  return c.isDark() ? colorForegroundOnDark : colorForegroundOnLight
}

// ///////////////////////////////////////
// Alias Tokens

const plateAccent_color_fill_rest = Color('#0078B4')

// Fill
let aliasTokens: any = {}
aliasTokens.plateAccent_color_fill_rest = plateAccent_color_fill_rest
aliasTokens.plateAccent_color_fill_hover = lighten(plateAccent_color_fill_rest)
aliasTokens.plateAccent_color_fill_pressed = darken(plateAccent_color_fill_rest)
aliasTokens.plateAccent_color_fill_disabled = plateAccent_color_fill_rest.grayscale().fade(0.3)
aliasTokens.plateAccent_color_fill_selected = plateAccent_color_fill_rest.lighten(0.4)

// Foreground
aliasTokens.plateAccent_color_foreground_rest = textColorOn(aliasTokens.plateAccent_color_fill_rest)
aliasTokens.plateAccent_color_foreground_hover = textColorOn(
  aliasTokens.plateAccent_color_fill_hover,
)
aliasTokens.plateAccent_color_foreground_pressed = textColorOn(
  aliasTokens.plateAccent_color_fill_pressed,
)
aliasTokens.plateAccent_color_foreground_disabled = textColorOn(
  aliasTokens.plateAccent_color_fill_disabled,
)
aliasTokens.plateAccent_color_foreground_selected = textColorOn(
  aliasTokens.plateAccent_color_fill_selected,
)

aliasTokens = _.mapValues(aliasTokens, c => c.hex())

// Alias Sets
const sets = {
  plateAccent: {
    plateAccent_color_fill_rest: aliasTokens.plateAccent_color_fill_rest,
    plateAccent_color_fill_hover: aliasTokens.plateAccent_color_fill_hover,
    plateAccent_color_fill_pressed: aliasTokens.plateAccent_color_fill_pressed,
    plateAccent_color_fill_disabled: aliasTokens.plateAccent_color_fill_disabled,
    plateAccent_color_fill_selected: aliasTokens.plateAccent_color_fill_selected,
  },
}

// ///////////////////////////////////////////
// Theme

const theme: ThemeInput = {
  siteVariables: aliasTokens,

  componentVariables: {
    Button: {
      ...sets.plateAccent,
    },
  },
}

class Tokens extends React.Component<{}, any> {
  render() {
    return (
      <div style={{ display: 'inline-block', padding: '1em', width: '10em' }}>
        <pre>
          <p>GLOBAL TOKENS</p>
          ...
          <p>ALIAS TOKENS</p>
          ...
          <p>COMPONENT TOKENS</p>
          ...
        </pre>

        <br />

        <Button
          fluid
          styles={{
            background: theme.componentVariables.Button.plateAccent_color_fill_rest,
            // TODO: why is this not white now?
            // color: theme.componentVariables.Button.plateAccent_color_foreground_rest,
            color: 'white',
          }}
        >
          rest
        </Button>
        <br />
        <Button
          fluid
          styles={{
            background: theme.componentVariables.Button.plateAccent_color_fill_hover,
            // TODO: why is this not white now?
            // color: theme.componentVariables.Button.plateAccent_color_foreground_hover,
            color: 'white',
          }}
        >
          hover
        </Button>
        <br />
        <Button
          fluid
          styles={{
            background: theme.componentVariables.Button.plateAccent_color_fill_pressed,
            // TODO: why is this not white now?
            // color: theme.componentVariables.Button.plateAccent_color_foreground_pressed,
            color: 'white',
          }}
        >
          active (pressed)
        </Button>
        <br />
        <Button
          fluid
          styles={{
            background: theme.componentVariables.Button.plateAccent_color_fill_disabled,
            // TODO: why is this not white now?
            // color: theme.componentVariables.Button.plateAccent_color_foreground_disabled,
            color: 'white',
          }}
          disabled
        >
          disabled
        </Button>
        <br />
        <Button
          fluid
          styles={{
            background: theme.componentVariables.Button.plateAccent_color_fill_selected,
            // TODO: why is this not white now?
            // color: theme.componentVariables.Button.plateAccent_color_foreground_selected,
            color: 'white',
          }}
          accessibility={toggleButtonBehavior}
          active
        >
          selected (toggle + on)
        </Button>
        <br />
        <hr />
        <pre>
          <code>theme.siteVariables = {JSON.stringify(aliasTokens, null, 2)}</code>
        </pre>
        <div style={{ padding: '20rem', background: 'green' }}>box</div>
      </div>
    )
  }
}

export default Tokens
