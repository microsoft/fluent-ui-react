import { Customizer, Fabric, PrimaryButton, DefaultButton } from 'office-ui-fabric-react'
import { Provider } from '@fluentui/react'
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

const makeFabricScopedSettings = (theme: any): any => {
  const theButtonColors: any = theme.componentVariables.Button(theme.siteVariables)

  return {
    DefaultButton: {
      styles: {
        root: {
          background: theButtonColors.primaryBackgroundColor,
        },
      },
    },
  }
}

const ProviderShared = () => (
  <div>
    <Provider.Consumer
      render={theme => (
        <>
          <div>
            <Fabric>
              <Customizer scopedSettings={makeFabricScopedSettings(theme)}>
                <PrimaryButton text="just a button inside a context" />
              </Customizer>
            </Fabric>

            <DefaultButton>Hello World</DefaultButton>
          </div>
          <code>
            theme.siteVariables.brand ={' '}
            {JSON.stringify(theme.componentVariables.Button(theme.siteVariables), null, 2)}
          </code>
        </>
      )}
    />
  </div>
)

export default ProviderShared
