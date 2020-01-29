import { createContext, useContextSelector } from '@fluentui/react-context-selector'
import { mount } from 'enzyme'
import * as React from 'react'

class TestBoundary extends React.Component<{ onError: (e: Error) => void }, { hasError: boolean }> {
  state = { hasError: false }

  componentDidCatch(error: Error) {
    this.props.onError(error)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return null
    }

    return this.props.children
  }
}

const TestContext = createContext<{ index: number }>({ index: -1 })

const TestComponent: React.FC<{ index: number; onUpdate?: () => void }> = props => {
  const active = useContextSelector(TestContext, v => v.index === props.index)

  React.useEffect(() => {
    props.onUpdate && props.onUpdate()
  })

  return <div data-active={active} />
}

describe('useContextSelector', () => {
  it('propogates values via Context', () => {
    const wrapper = mount(
      <TestContext.Provider value={{ index: 1 }}>
        <TestComponent index={1} />
      </TestContext.Provider>,
    )

    expect(wrapper.find('div').prop('data-active')).toBe(true)
  })

  it('updates only on selector match', () => {
    const onUpdate = jest.fn()
    const wrapper = mount(
      <TestContext.Provider value={{ index: 0 }}>
        <TestComponent index={1} onUpdate={onUpdate} />
      </TestContext.Provider>,
    )

    expect(wrapper.find('div').prop('data-active')).toBe(false)
    expect(onUpdate).toBeCalledTimes(1)

    // No match, (v.index: 2, p.index: 1)
    wrapper.setProps({ value: { index: 2 } })
    expect(wrapper.find('div').prop('data-active')).toBe(false)
    expect(onUpdate).toBeCalledTimes(1)

    // Match => update, (v.index: 1, p.index: 1)
    wrapper.setProps({ value: { index: 1 } })
    expect(wrapper.find('div').prop('data-active')).toBe(true)
    expect(onUpdate).toBeCalledTimes(2)

    // Match previous => no update, (v.index: 1, p.index: 1)
    wrapper.setProps({ value: { index: 1 } })
    expect(wrapper.find('div').prop('data-active')).toBe(true)
    expect(onUpdate).toBeCalledTimes(2)
  })

  it('updates only with in React.memo()', () => {
    // Will never pass updates
    // https://reactjs.org/docs/react-api.html#reactmemo
    const MemoComponent = React.memo(TestComponent, () => false)

    const onUpdate = jest.fn()
    const wrapper = mount(
      <TestContext.Provider value={{ index: 0 }}>
        <MemoComponent index={1} onUpdate={onUpdate} />
      </TestContext.Provider>,
    )

    wrapper.setProps({ value: { index: 1 } })
    expect(wrapper.find('div').prop('data-active')).toBe(true)
    expect(onUpdate).toBeCalledTimes(2)
  })

  it('throws on usage outside Provider', () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {})

    const onError = jest.fn()
    mount(
      <TestBoundary onError={onError}>
        <TestComponent index={0} />
      </TestBoundary>,
    )

    expect(onError).toBeCalledWith(
      expect.objectContaining({
        message: 'Please use <Provider /> component from "@fluentui/react-context-selector"',
      }),
    )
  })
})
