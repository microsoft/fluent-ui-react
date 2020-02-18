import { Customizer, Fabric, createTheme } from 'office-ui-fabric-react'
import { Provider } from '@fluentui/react'
import * as React from 'react'

interface FluentToFabricProviderProps {}

const makeCustomizerProps = (theme: any): any => {
  const theButtonTokens: any = theme.componentVariables.Button(theme.siteVariables)
  const theTheme = createTheme({
    palette: {
      themePrimary: theme.siteVariables.colorScheme.brand.background,
      themeLighterAlt: theme.siteVariables.colorScheme.brand.background,
      themeLighter: theme.siteVariables.colorScheme.brand.background,
      themeLight: theme.siteVariables.colorScheme.brand.background,
      themeTertiary: theme.siteVariables.colorScheme.brand.background,
      themeSecondary: theme.siteVariables.colorScheme.brand.background,
      themeDarkAlt: theme.siteVariables.colorScheme.brand.background,
      themeDark: theme.siteVariables.colorScheme.brand.background,
      themeDarker: theme.siteVariables.colorScheme.brand.background,
      neutralLighterAlt: theme.siteVariables.colorScheme.default.foregroundActive,
      neutralLighter: theme.siteVariables.colorScheme.default.foregroundActive,
      neutralLight: theme.siteVariables.colorScheme.default.foregroundActive,
      neutralQuaternaryAlt: theme.siteVariables.colorScheme.default.foregroundActive,
      neutralQuaternary: theme.siteVariables.colorScheme.default.foregroundActive,
      neutralTertiaryAlt: theme.siteVariables.colorScheme.default.foregroundActive,
      neutralTertiary: theme.siteVariables.colorScheme.default.foregroundActive,
      neutralSecondary: theme.siteVariables.colorScheme.default.foregroundActive,
      neutralPrimaryAlt: theme.siteVariables.colorScheme.default.borderPressed,
      neutralPrimary: theme.siteVariables.colorScheme.default.backgroundHover,
      neutralDark: theme.siteVariables.colorScheme.default.borderHover,
      black: theme.siteVariables.colorScheme.default.foreground1,
      white: theme.siteVariables.colorScheme.default.background,
    },
    semanticColors: {
      primaryButtonBackgroundHovered: theButtonTokens.primaryBackgroundColorHover,
    },
  })

  const theProps = {
    scopedSettings: {
      PrimaryButton: {
        styles: {
          root: {
            color: theButtonTokens.primaryColor,
            background: theButtonTokens.primaryBackgroundColor,
            borderRadius: theButtonTokens.borderRadius,
            boxShadow: theButtonTokens.primaryBoxShadow,
            fontWeight: theButtonTokens.contentFontWeight,
          },
        },
      },
      DefaultButton: {
        styles: {
          root: {
            color: theButtonTokens.color,
            boxShadow: theButtonTokens.boxShadow,
            borderColor: theButtonTokens.borderColor,
          },
        },
      },
    },
    settings: {
      theme: theTheme,
    },
  }

  return theProps
}

const TeamsToFabricProvider: React.FunctionComponent<FluentToFabricProviderProps> = props => (
  <Provider.Consumer
    render={theme => (
      <Fabric>
        <Customizer {...makeCustomizerProps(theme)}>{props.children}</Customizer>
      </Fabric>
    )}
  />
)

export default TeamsToFabricProvider
