import * as React from 'react'
import {
  Button,
  ButtonProps,
  ComponentSlotStylesInput,
  ComponentVariablesPrepared,
  Flex,
  Provider,
  ThemeInput,
} from '@stardust-ui/react'

import { ButtonVariables } from 'src/themes/teams/components/Button/buttonVariables'

type ButtonTertiaryVariables = {
  backgroundColor: string
  color: string
  colorHover: string
  fontWeight: string
  fontWeightHover: string
}

type CustomTheme = ThemeInput & {
  componentStyles: {
    ButtonTertiary: ComponentSlotStylesInput<ButtonProps, ButtonTertiaryVariables>
  }
  componentVariables: { ButtonTertiary: ComponentVariablesPrepared }
}

const customTheme: CustomTheme = {
  componentStyles: {
    'Button:Disabled': {
      root: { cursor: 'not-allowed' },
    },
    ButtonTertiary: {
      root: ({ variables: v }) => ({
        backgroundColor: v.backgroundColor,
        border: 0,
        color: v.color,
        fontWeight: v.fontWeight,
        textDecoration: 'underline',

        ':hover': {
          color: v.colorHover,
          cursor: 'pointer',
          fontWeight: v.fontWeightHover,
        },
      }),
    },
  },
  componentVariables: {
    'Button:Danger': (siteVariables): Partial<ButtonVariables> => ({
      backgroundColor: siteVariables.colorScheme.red.background1,
      backgroundColorHover: siteVariables.colorScheme.red.backgroundHover,
      color: siteVariables.colorScheme.red.foreground,
      colorHover: siteVariables.colorScheme.red.foregroundHover,
      borderColorHover: siteVariables.colorScheme.red.background3,
    }),
    ButtonTertiary: (siteVariables): ButtonTertiaryVariables => ({
      backgroundColor: 'transparent',
      color: siteVariables.colorScheme.brand.foreground,
      colorHover: siteVariables.colorScheme.brand.foregroundHover,
      fontWeight: siteVariables.fontWeightRegular,
      fontWeightHover: siteVariables.fontWeightSemibold,
    }),
  },
}

const ButtonExample = () => (
  <>
    <Provider theme={customTheme}>
      <Flex gap="gap.medium">
        <Button content="Button:Danger" enhanceName="Button:Danger" />
        <Button content="Button:Disabled" disabled enhanceName="Button:Disabled" />

        <Button content="ButtonTertiary" replaceName="ButtonTertiary" />
      </Flex>
    </Provider>
    <div style={{ margin: 20 }}>
      <button onClick={() => window.switchTheme('teams')}>Light theme</button>
      <button onClick={() => window.switchTheme('teamsDark')}>Dark theme</button>
      <button onClick={() => window.switchTheme('teamsHighContrast')}>HC theme</button>
    </div>
  </>
)

export default ButtonExample
