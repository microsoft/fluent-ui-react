import { mergeThemes, Provider, ThemeInput, ButtonProps } from '@fluentui/react'
import { Customizations, CustomizerContext, ITheme } from 'office-ui-fabric-react'
import * as React from 'react'

interface ReactBaseThemeProps {
  fluentOverridesTheme?: ThemeInput
}

export function useTheme(): ITheme {
  const customizerContext = React.useContext(CustomizerContext)
  const settings = Customizations.getSettings(
    ['theme'],
    'WithTheme',
    customizerContext.customizations,
  )
  return settings.theme
}

// https://github.com/microsoft/fluent-ui-react/blob/master/packages/react/src/themes/teams/components/Button/buttonVariables.ts
function makeFluentTheme(fabricTheme: ITheme, baseTheme: ThemeInput): any {
  const {
    primaryButtonBackground,
    primaryButtonBackgroundDisabled,
    primaryButtonBackgroundPressed,
    primaryButtonBackgroundHovered,
    primaryButtonText,
    primaryButtonTextDisabled,
    primaryButtonTextHovered,
    primaryButtonTextPressed,
  } = fabricTheme.semanticColors

  /**
   * Issues:
   * 1) Cannot override border.
   * 2) colorActive <-> buttonTextPressed & primaryButtonTextPressed
   */
  const buttonOverrides: ThemeInput = {
    componentVariables: {
      Button: {
        padding: '0 20px',
        minWidth: '80px',
        colorActive: primaryButtonTextPressed,
        textPrimaryColor: primaryButtonText,
        textPrimaryColorHover: primaryButtonTextHovered,
        textPrimaryColorDisabled: primaryButtonTextDisabled,
        primaryColorHover: primaryButtonTextHovered,
        primaryBackgroundColor: primaryButtonBackground,
        primaryBackgroundColorActive: primaryButtonBackgroundPressed,
        primaryBackgroundColorHover: primaryButtonBackgroundHovered,
        primaryBackgroundColorDisabled: primaryButtonBackgroundDisabled,
        primaryBoxShadow: 'none',
      },
    },
    // Just a showcase of how we can further customize the styles for the buttons...
    // This should only indicate which variables are missing in the Teams theme, like (primaryBorderWidth)
    componentStyles: {
      Button: {
        root: ({ props: p }: { props: ButtonProps }) => ({
          ...(p.primary && {
            border: 0,
          }),
        }),
      },
    },
  }

  return mergeThemes(baseTheme, buttonOverrides)
}

const FabricToTeamsProvider: React.FunctionComponent<ReactBaseThemeProps> = props => {
  const { fluentOverridesTheme } = props
  const theme = useTheme()
  const generatedTheme = makeFluentTheme(theme, fluentOverridesTheme)
  return <Provider theme={generatedTheme}>{props.children}</Provider>
}

export default FabricToTeamsProvider
