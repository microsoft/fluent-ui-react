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

  describe('RTL', () => {
    test('Sets dir="rtl" on the div for RTL theme', () => {
      const component = mount(
        <Provider id="top-level-provider" theme={{ rtl: true }}>
          <span />
        </Provider>,
      )
      const providerDiv = component.find('div#top-level-provider')
      expect(providerDiv.exists()).toBe(true)
      expect(providerDiv.prop('dir')).toEqual('rtl')
    })

    test('Sets dir="ltr" on the div for LTR theme', () => {
      const component = mount(
        <Provider id="top-level-provider" theme={{}}>
          <span />
        </Provider>,
      )
      const providerDiv = component.find('div#top-level-provider')
      expect(providerDiv.exists()).toBe(true)
      expect(providerDiv.prop('dir')).toEqual('ltr')
    })

    const parentChildMatrix = [
      {
        parentIsRtl: true,
        childIsRtl: true,
        expectedChildDir: undefined,
      },
      {
        parentIsRtl: true,
        childIsRtl: undefined,
        expectedChildDir: undefined,
      },
      {
        parentIsRtl: true,
        childIsRtl: false,
        expectedChildDir: 'ltr',
      },
      {
        parentIsRtl: false,
        childIsRtl: false,
        expectedChildDir: undefined,
      },
      {
        parentIsRtl: false,
        childIsRtl: undefined,
        expectedChildDir: undefined,
      },
      {
        parentIsRtl: false,
        childIsRtl: true,
        expectedChildDir: 'rtl',
      },
    ]

    parentChildMatrix.forEach(({ parentIsRtl, childIsRtl, expectedChildDir }) => {
      test(`Nested providers: parent is RTL: ${parentIsRtl}, child is RTL: ${childIsRtl}, expected child dir: ${expectedChildDir}`, () => {
        const component = mount(
          <Provider theme={{ rtl: parentIsRtl }}>
            <Provider id="nested-provider" theme={{ rtl: childIsRtl }}>
              <span />
            </Provider>
          </Provider>,
        )
        const nestedProviderDiv = component.find('div#nested-provider')
        expect(nestedProviderDiv.exists()).toBe(true)
        expect(nestedProviderDiv.prop('dir')).toEqual(expectedChildDir)
      })
    })
  })
})
