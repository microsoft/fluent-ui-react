import * as React from 'react'
import Provider from 'src/components/Provider/Provider'
import ProviderConsumer from 'src/components/Provider/ProviderConsumer'
import { mount } from 'enzyme'

describe('Provider', () => {
  test('is exported', () => {
    expect(require('src/index.ts').Provider).toEqual(Provider)
  })

  test('has a ProviderConsumer subcomponent', () => {
    expect(require('src/index.ts').Provider.Consumer).toEqual(ProviderConsumer)
  })

  describe('staticStyles', () => {
    test('are executed with the merged siteVariables', () => {
      const staticStyle = jest.fn()

      mount(
        <Provider theme={{ siteVariables: { brand: 'blue', background: 'red' } }}>
          <Provider
            theme={{
              siteVariables: { brand: 'yellow', gray: '#868686' },
              staticStyles: [staticStyle],
            }}
          >
            <span />
          </Provider>
        </Provider>,
      )

      expect(staticStyle).toHaveBeenCalledWith(
        expect.objectContaining({
          background: 'red',
          brand: 'yellow',
          gray: '#868686',
        }),
      )
    })

    test('are executed only once', () => {
      const firstStaticStyle = jest.fn()
      const secondStaticStyle = jest.fn()

      const providerInstance = mount(
        <Provider theme={{ staticStyles: [firstStaticStyle] }}>
          <span />
        </Provider>,
      )
      providerInstance.setProps({ theme: { staticStyles: [secondStaticStyle] } })

      expect(firstStaticStyle).toHaveBeenCalledTimes(1)
      expect(secondStaticStyle).not.toHaveBeenCalled()
    })
  })
})
