import { mount } from 'enzyme'
import * as React from 'react'

import Provider from 'src/components/Provider/Provider'
import ProviderConsumer from 'src/components/Provider/ProviderConsumer'
import { ThemeInput } from 'src/themes/types'
import teams from 'src/themes/teams'
import RendererMock from './RendererMock'

describe('Provider', () => {
  test('is exported', () => {
    expect(require('src/index.ts').Provider).toEqual(Provider)
  })

  test('has a ProviderConsumer subcomponent', () => {
    expect(require('src/index.ts').Provider.Consumer).toEqual(ProviderConsumer)
  })

  describe('overwrite', () => {
    const outerTheme = { siteVariables: { brand: 'blue' } }
    const innerTheme = { siteVariables: { secondary: 'yellow' } }

    test('do not overwrite by default', () => {
      const wrapper = mount(
        <Provider theme={outerTheme}>
          <Provider theme={innerTheme}>
            <span />
          </Provider>
        </Provider>,
      )

      expect(
        wrapper
          .find('ThemeProvider')
          .at(1)
          .prop('theme'),
      ).toEqual(
        expect.objectContaining({
          theme: expect.objectContaining({
            siteVariables: {
              brand: 'blue',
              secondary: 'yellow',
              fontSizes: {},
            },
          }),
        }),
      )
    })

    test('does overwrite when is true', () => {
      const wrapper = mount(
        <Provider theme={outerTheme}>
          <Provider overwrite theme={innerTheme}>
            <span />
          </Provider>
        </Provider>,
      )

      expect(
        wrapper
          .find('ThemeProvider')
          .at(1)
          .prop('theme'),
      ).toEqual(
        expect.objectContaining({
          theme: expect.objectContaining({
            siteVariables: {
              secondary: 'yellow',
              fontSizes: {},
            },
          }),
        }),
      )
    })
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
        <Provider id="top-level-provider" rtl>
          <span />
        </Provider>,
      )
      const providerDiv = component.find('div#top-level-provider')
      expect(providerDiv.exists()).toBe(true)
      expect(providerDiv.prop('dir')).toEqual('rtl')
    })

    test('Sets dir="ltr" on the div for LTR theme', () => {
      const component = mount(
        <Provider id="top-level-provider">
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
          <Provider rtl={parentIsRtl}>
            <Provider id="nested-provider" rtl={childIsRtl}>
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

  describe('calls provided renderer', () => {
    test('calls renderFont', () => {
      const theme: ThemeInput = {
        fontFaces: teams.fontFaces,
      }

      const rendererMock = new RendererMock()
      const renderFontSpy = jest.spyOn(rendererMock, 'renderFont')

      mount(
        <Provider theme={theme} renderer={rendererMock}>
          <div />
        </Provider>,
      )

      expect(renderFontSpy).toHaveBeenCalled()
    })
  })

  test('calls renderStatic', () => {
    const theme: ThemeInput = {
      staticStyles: [
        {
          a: {
            textDecoration: 'none',
          },
        },
      ],
    }

    const rendererMock = new RendererMock()
    const renderStaticSpy = jest.spyOn(rendererMock, 'renderStatic')

    mount(
      <Provider theme={theme} renderer={rendererMock}>
        <div />
      </Provider>,
    )

    expect(renderStaticSpy).toHaveBeenCalled()
  })
})
