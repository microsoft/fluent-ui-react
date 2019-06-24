import { Provider, ProviderConsumer, Icon, themes } from '@stardust-ui/react'
import * as React from 'react'
import DocPage from 'docs/src/components/DocPage/DocPage'

const Icons = () => (
  <Provider
    theme={{
      componentStyles: {
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
    }}
  >
    <ProviderConsumer
      render={() => (
        <DocPage title="Icons">
          <div className="sd_flex">
            {Object.keys(themes['teams'].icons).map(name => (
              <div key={name} className="sd_iconItem">
                <Icon name={name} size="larger" />
                <br />
                <div className="sd_iconName">{name}</div>
              </div>
            ))}
          </div>
        </DocPage>
      )}
    />
  </Provider>
)

export default Icons
