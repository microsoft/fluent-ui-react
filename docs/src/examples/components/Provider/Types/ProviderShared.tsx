import {
  Customizer,
  Fabric,
  PrimaryButton,
  DefaultButton,
  createTheme,
} from 'office-ui-fabric-react'
import { Provider, Button } from '@fluentui/react'
import * as React from 'react'

/*
const ProviderShared = () => (
  <Provider.Consumer
    render={(ctx: any) => (
      <div>
        <pre>{JSON.stringify(ctx.theme, null, 2)}</pre>
        <div>
          <Fabric>
            <PrimaryButton text="just a button" />
          </Fabric>
        </div>
      </div>
    )}
  />
)

theme.siteVariables.brand = {
  "padding": "0 1.4286rem",
  "height": "2.2857rem",
  "minWidth": "6.8571rem",
  "loadingMinWidth": "8.4286rem",
  "maxWidth": "20rem",
  "borderRadius": "2px",
  "contentFontSize": "1rem",
  "contentFontWeight": 600,
  "contentLineHeight": 1.4286,
  "color": "#252423",
  "colorHover": "#252423",
  "colorActive": "#252423",
  "colorDisabled": "#C8C6C4",
  "backgroundColor": "#fff",
  "backgroundColorActive": "#E1DFDD",
  "backgroundColorHover": "#EDEBE9",
  "backgroundColorDisabled": "#EDEBE9",
  "borderColor": "#E1DFDD",
  "borderColorHover": "#C8C6C4",
  "borderColorActive": "#C8C6C4",
  "borderColorDisabled": "transparent",
  "primaryColor": "#fff",
  "primaryColorHover": "#fff",
  "primaryBackgroundColor": "#6264A7",
  "primaryBackgroundColorActive": "#464775",
  "primaryBackgroundColorHover": "#585A96",
  "primaryBackgroundColorDisabled": "#EDEBE9",
  "primaryBorderColor": "transparent",
  "circularBorderRadius": "71.3571rem",
  "textColor": "#484644",
  "textColorHover": "#6264A7",
  "textPrimaryColor": "#6264A7",
  "textPrimaryColorHover": "#6264A7",
  "textColorDisabled": "#C8C6C4",
  "primaryBoxShadow": "0 .2rem .4rem -.075rem rgba(0, 0, 0, .25)",
  "boxShadow": "0 .2rem .4rem -.075rem rgba(0, 0, 0, .1)",
  "loaderBorderSize": "0.1429rem",
  "loaderSize": "1.4286rem",
  "loaderSvgHeight": "87.1429rem",
  "loaderSvgAnimationHeight": "-85.7143rem",
  "sizeSmallContentFontSize": "0.8571rem",
  "sizeSmallContentLineHeight": 1.3333,
  "sizeSmallHeight": "1.7143rem",
  "sizeSmallMinWidth": "5.1429rem",
  "sizeSmallPadding": "0 0.5714rem",
  "sizeSmallLoaderBorderSize": "0.1429rem",
  "sizeSmallLoaderSize": "1.0714rem",
  "sizeSmallLoaderSvgHeight": "63.9286rem",
  "sizeSmallLoaderSvgAnimationHeight": "-62.8571rem"
}

*/

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
            background: theButtonTokens.primaryBackgroundColor,
            borderRadius: theButtonTokens.borderRadius,
            boxShadow: theButtonTokens.primaryBoxShadow,
            fontWeight: theButtonTokens.contentFontWeight,
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

const ProviderShared = () => (
  <div>
    <Provider.Consumer
      render={theme => (
        <>
          <Fabric>
            <Customizer {...makeCustomizerProps(theme)}>
              <PrimaryButton text="primary" />
              <DefaultButton text="default" />
              <PrimaryButton text="just a button inside a context" />
              <Button primary>I am a Teams button</Button>
            </Customizer>
          </Fabric>
          <pre>{JSON.stringify(theme.componentVariables.Button(theme.siteVariables), null, 2)}</pre>
          <pre>{JSON.stringify(theme.siteVariables, null, 2)}</pre>
        </>
      )}
    />
  </div>
)

export default ProviderShared
