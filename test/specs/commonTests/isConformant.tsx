import * as _ from 'lodash'
import * as React from 'react'
import { ReactWrapper } from 'enzyme'
import * as ReactDOMServer from 'react-dom/server'

import isExportedAtTopLevel from './isExportedAtTopLevel'
import {
  assertBodyContains,
  consoleUtil,
  mountWithProvider as mount,
  syntheticEvent,
} from 'test/utils'
import helpers from './commonHelpers'

import * as stardust from 'src/'

import { FocusZone } from 'src/lib/accessibility/FocusZone'
import { FOCUSZONE_WRAP_ATTRIBUTE } from 'src/lib/accessibility/FocusZone/focusUtilities'

export interface Conformant {
  eventTargets?: object
  nestingLevel?: number
  requiredProps?: object
  exportedAtTopLevel?: boolean
  rendersPortal?: boolean
  usesWrapperSlot?: boolean
}

/**
 * Assert Component conforms to guidelines that are applicable to all components.
 * @param {React.Component|Function} Component A component that should conform.
 * @param {Object} [options={}]
 * @param {Object} [options.eventTargets={}] Map of events and the child component to target.
 * @param {boolean} [options.exportedAtTopLevel=false] Is this component exported as top level API?
 * @param {boolean} [options.rendersPortal=false] Does this component render a Portal powered component?
 * @param {Object} [options.requiredProps={}] Props required to render Component without errors or warnings.
 * @param {boolean} [options.usesWrapperSlot=false] This component uses wrapper slot to wrap the 'meaningful' element.
 */
export default (Component, options: Conformant = {}) => {
  const {
    eventTargets = {},
    exportedAtTopLevel = true,
    nestingLevel = 0,
    requiredProps = {},
    rendersPortal = false,
    usesWrapperSlot = false,
  } = options
  const { throwError } = helpers('isConformant', Component)

  const componentType = typeof Component

  // This is added because the component is mounted
  const getComponent = (wrapper: ReactWrapper) => {
    // FelaTheme wrapper and the component itself:
    let component = wrapper

    /**
     * The wrapper is mounted with Provider, so in total there are three HOC components
     * that we want to get rid of: ThemeProvider, the actual Component and FelaTheme,
     * in order to be able to get to the actual rendered result of the component we are testing
     */
    _.times(nestingLevel + 3, () => {
      component = component.childAt(0)
    })

    if (component.type() === FocusZone) {
      // another HOC component is added: FocuZone
      component = component.childAt(0) // skip through <FocusZone>
      if (component.prop(FOCUSZONE_WRAP_ATTRIBUTE)) {
        component = component.childAt(0) // skip the additional wrap <div> of the FocusZone
      }
    }

    if (usesWrapperSlot) {
      /**
       * If there is a wrapper slot, then again, we need to get rid of all three HOC components:
       * ThemeProvider, Wrapper (Slot), and FelaTheme in order to be able to get to the actual
       * rendered result of the component we are testing
       */
      _.times(3, () => {
        component = component.childAt(0)
      })
    }

    return component
  }

  // make sure components are properly exported
  if (componentType !== 'function') {
    throwError(`Components should export a class or function, got: ${componentType}.`)
  }

  // tests depend on Component constructor names, enforce them
  const constructorName = Component.prototype.constructor.name
  if (!constructorName) {
    throwError(
      [
        'Component is not a named function. This should help identify it:\n\n',
        `${ReactDOMServer.renderToStaticMarkup(<Component />)}`,
      ].join(''),
    )
  }

  // ----------------------------------------
  // Component info
  // ----------------------------------------
  // This is pretty ugly because:
  // - jest doesn't support custom error messages
  // - jest will run all test
  const infoJSONPath = `docs/src/componentInfo/${constructorName}.info.json`

  let info

  try {
    info = require(infoJSONPath)
  } catch (err) {
    // handled in the test() below
    test('component info file exists', () => {
      throw new Error(
        [
          '!! ==========================================================',
          `!! Missing ${infoJSONPath}.`,
          '!! Run `yarn test` or `yarn test:watch` again to generate one.',
          '!! ==========================================================',
        ].join('\n'),
      )
    })
    return null
  }

  // ----------------------------------------
  // Docblock description
  // ----------------------------------------
  const hasDocblockDescription = info.docblock.description.join('').trim().length > 0

  test('has a docblock description', () => {
    expect(hasDocblockDescription).toEqual(true)
  })

  if (hasDocblockDescription) {
    const minWords = 5
    const maxWords = 25
    test(`docblock description is long enough to be meaningful (>${minWords} words)`, () => {
      expect(_.words(info.docblock.description).length).toBeGreaterThan(minWords)
    })

    test(`docblock description is short enough to be quickly understood (<${maxWords} words)`, () => {
      expect(_.words(info.docblock.description).length).toBeLessThan(maxWords)
    })
  }

  // ----------------------------------------
  // Class and file name
  // ----------------------------------------
  test(`constructor name matches filename "${constructorName}"`, () => {
    expect(constructorName).toEqual(info.filenameWithoutExt)
  })

  // find the apiPath in the stardust object
  const foundAsSubcomponent = _.isFunction(_.get(stardust, info.apiPath))

  exportedAtTopLevel && isExportedAtTopLevel(constructorName, info.displayName)
  if (info.isChild) {
    test('is a static component on its parent', () => {
      const message =
        `'${info.displayName}' is a child component (is in ${info.repoPath}).` +
        ` It must be a static prop of its parent '${info.parentDisplayName}'`
      expect({ foundAsSubcomponent, message }).toEqual({
        message,
        foundAsSubcomponent: true,
      })
    })
  }

  // ----------------------------------------
  // Props
  // ----------------------------------------
  test('spreads user props', () => {
    const propName = 'data-is-conformant-spread-props'
    const props = { [propName]: true }

    const component = mount(<Component {...requiredProps} {...props} />)

    // The component already has the prop, so we are testing if it's children also have the props,
    // that is why we are testing if it is greater then 1
    expect(component.find(props).length).toBeGreaterThan(1)
  })

  if (!rendersPortal) {
    describe('"as" prop (common)', () => {
      test('renders the component as HTML tags or passes "as" to the next component', () => {
        // silence element nesting warnings
        consoleUtil.disableOnce()

        const tags = [
          'a',
          'em',
          'div',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'i',
          'p',
          'span',
          'strong',
        ]

        tags.forEach(tag => {
          const wrapper = mount(<Component {...requiredProps} as={tag} />)
          const component = getComponent(wrapper)
          try {
            expect(component.is(tag)).toEqual(true)
          } catch (err) {
            expect(component.type()).not.toEqual(Component)
            expect(component.prop('as')).toEqual(tag)
          }
        })
      })

      test('renders as a functional component or passes "as" to the next component', () => {
        const MyComponent = () => null

        const wrapper = mount(<Component {...requiredProps} as={MyComponent} />)
        const component = getComponent(wrapper)

        try {
          expect(component.type()).toEqual(MyComponent)
        } catch (err) {
          expect(component.type()).not.toEqual(Component)
          expect(
            component
              .find('[as]')
              .last()
              .prop('as'),
          ).toEqual(MyComponent)
        }
      })

      test('renders as a ReactClass or passes "as" to the next component', () => {
        class MyComponent extends React.Component {
          render() {
            return <div data-my-react-class />
          }
        }

        const wrapper = mount(<Component {...requiredProps} as={MyComponent} />)
        const component = getComponent(wrapper)

        try {
          expect(component.type()).toEqual(MyComponent)
        } catch (err) {
          expect(component.type()).not.toEqual(Component)
          expect(component.prop('as')).toEqual(MyComponent)
        }
      })

      test('passes extra props to the component it is renders as', () => {
        const MyComponent = () => null
        const wrapper = mount(
          <Component {...requiredProps} as={MyComponent} data-extra-prop="foo" />,
        )

        expect(wrapper.find('MyComponent[data-extra-prop="foo"]').length).toBeGreaterThan(0)
      })
    })
  }

  describe('handles props', () => {
    test('defines handled props in Component.handledProps', () => {
      expect(Component.handledProps).toBeDefined()
      expect(Array.isArray(Component.handledProps)).toEqual(true)
    })

    test(`has 'styles' as handled prop`, () => {
      expect(Component.handledProps).toContain('styles')
    })

    test(`has 'variables' as handled prop`, () => {
      expect(Component.handledProps).toContain('variables')
    })

    test('Component.handledProps includes all handled props', () => {
      const computedProps = _.union(
        Component.autoControlledProps,
        _.keys(Component.defaultProps),
        _.keys(Component.propTypes),
      )
      const expectedProps = _.uniq(computedProps).sort()

      const message =
        'Not all handled props were defined in static handledProps. Add all props defined in' +
        ' static autoControlledProps, static defaultProps and static propTypes must be defined' +
        ' in static handledProps.'

      expect({
        message,
        handledProps: Component.handledProps,
      }).toEqual({
        message,
        handledProps: expectedProps,
      })
    })
  })

  // ----------------------------------------
  // Events
  // ----------------------------------------

  test('handles events transparently', () => {
    // Events should be handled transparently, working just as they would in vanilla React.
    // Example, both of these handler()s should be called with the same event:
    //
    //   <Button onClick={handler} />
    //   <button onClick={handler} />
    //
    // This test catches the case where a developer forgot to call the event prop
    // after handling it internally. It also catch cases where the synthetic event was not passed back.
    _.each(syntheticEvent.types, ({ eventShape, listeners }) => {
      _.each(listeners, listenerName => {
        // onKeyDown => keyDown
        const eventName = _.camelCase(listenerName.replace('on', ''))

        const handlerSpy = jest.fn()
        const props = {
          ...requiredProps,
          [listenerName]: handlerSpy,
          'data-simulate-event-here': true,
        }

        const component = mount(<Component {...props} />).childAt(0)

        const eventTarget = eventTargets[listenerName]
          ? component
              .find(eventTargets[listenerName])
              .hostNodes()
              .first()
          : component
              .find('[data-simulate-event-here]')
              .hostNodes()
              .first()

        if (eventTarget.length === 0) {
          throw new Error(
            'The event prop was not delegated to the children. You probably ' +
              'forgot to use `getUnhandledProps` util to spread the `unhandledProps` props.',
          )
        }
        const customHandler: Function = eventTarget.prop(listenerName)

        if (customHandler) {
          customHandler(eventShape)
        } else {
          if (Component.propTypes[listenerName]) {
            throw new Error(
              `Handler for '${listenerName}' is not passed to child event emitter element <${eventTarget.type()} />`,
            )
          }
          return
        }

        // give event listeners opportunity to cleanup
        if (component.instance() && component.instance().componentWillUnmount) {
          component.instance().componentWillUnmount()
        }

        // <Dropdown onBlur={handleBlur} />
        //                   ^ was not called once on "blur"
        const leftPad = ' '.repeat(info.displayName.length + listenerName.length + 3)

        // onKeyDown => handleKeyDown
        const handlerName = _.camelCase(listenerName.replace('on', 'handle'))

        try {
          expect(handlerSpy).toHaveBeenCalled()
        } catch (err) {
          throw new Error(
            [
              `<${info.displayName} ${listenerName}={${handlerName}} />\n`,
              `${leftPad} ^ was not called once on "${eventName}".`,
              'You may need to hoist your event handlers up to the root element.\n',
            ].join(''),
          )
        }

        let expectedArgs = [eventShape]
        let errorMessage = 'was not called with (event)'

        if (_.has(Component.propTypes, listenerName)) {
          expectedArgs = [eventShape, expect.objectContaining(component.props())]
          errorMessage = [
            'was not called with (event, data).\n',
            `Ensure that 'props' object is passed to '${listenerName}'\n`,
            `event handler of <${Component.displayName} />.`,
          ].join('')
        }

        // Components should return the event first, then any data
        try {
          expect(handlerSpy).toHaveBeenLastCalledWith(...expectedArgs)
        } catch (err) {
          throw new Error(
            [
              `<${info.displayName} ${listenerName}={${handlerName}} />\n`,
              `${leftPad} ^ ${errorMessage}`,
              'It was called with args:',
              JSON.stringify(handlerSpy.mock.calls[0], null, 2),
            ].join('\n'),
          )
        }
      })
    })
  })

  // ----------------------------------------
  // Handles className
  // ----------------------------------------
  describe('static className (common)', () => {
    const getClassesOfRootElement = component => {
      const classes = component
        .find('[className]')
        .hostNodes()
        .filterWhere(c => !c.prop(FOCUSZONE_WRAP_ATTRIBUTE)) // filter out FocusZone wrap <div>
        .at(usesWrapperSlot ? 1 : 0)
        .prop('className')
      return classes
    }

    test(`is a static equal to "${info.componentClassName}"`, () => {
      expect(Component.className).toEqual(info.componentClassName)
    })

    test(`is applied to the root element`, () => {
      const component = mount(<Component {...requiredProps} />)

      // only test components that implement className
      if (component.find('[className]').hostNodes().length > 0) {
        expect(
          _.includes(getClassesOfRootElement(component), `${info.componentClassName}`),
        ).toEqual(true)
      }
    })

    test("applies user's className to root component", () => {
      const className = 'is-conformant-class-string'

      // Portal powered components can render to two elements, a trigger and the actual component
      // The actual component is shown when the portal is open
      // If a trigger is rendered, open the portal and make assertions on the portal element
      // TODO some component using renderPortal = 'true'
      if (rendersPortal) {
        const mountNode = document.createElement('div')
        document.body.appendChild(mountNode)

        const wrapper = mount(<Component {...requiredProps} className={className} />, {
          attachTo: mountNode,
        })
        wrapper.setProps({ open: true })

        // portals/popups/etc may render the component to somewhere besides descendants
        // we look for the component anywhere in the DOM
        assertBodyContains(`.${className}`)

        wrapper.detach()
        document.body.removeChild(mountNode)
      } else {
        const component = mount(<Component {...requiredProps} className={className} />)
        expect(_.includes(getClassesOfRootElement(component), className)).toEqual(true)
      }
    })

    test("user's className does not override the default classes", () => {
      const component = mount(<Component {...requiredProps} />)
      const defaultClasses = getClassesOfRootElement(component)

      if (!defaultClasses) return

      const userClasses = 'generate'
      const wrapperWithCustomClasses = mount(
        <Component {...requiredProps} className={userClasses} />,
      )
      const mixedClasses = getClassesOfRootElement(wrapperWithCustomClasses)

      const message = [
        'Make sure you are using the `getUnhandledProps` util to spread the `unhandledProps` props.',
        'This may also be of help: https://facebook.github.io/react/docs/transferring-props.html.',
      ].join(' ')

      defaultClasses.split(' ').forEach(defaultClass => {
        expect({ message, result: _.includes(mixedClasses, defaultClass) }).toEqual({
          message,
          result: true,
        })
      })
    })
  })

  // ----------------------------------------
  // displayName
  // ----------------------------------------
  describe('static displayName (common)', () => {
    test('matches constructor name', () => {
      expect(Component.displayName).toEqual(info.constructorName)
    })
  })

  const validListenerNames = _.reduce(
    syntheticEvent.types,
    (result, { listeners }) => [...result, ...listeners],
    [],
  )

  // ---------------------------------------
  // Opt-in tests
  // ---------------------------------------
  return {
    // -------------------------------------
    // Ensure that props are passed as a
    // second argument to event handler
    // -------------------------------------
    hasExtendedHandlerFor(onEventName) {
      describe(`has extended handler for '${onEventName}' event`, () => {
        test(`'${onEventName}' is a valid event listener name`, () => {
          expect(validListenerNames).toContain(onEventName)
        })

        test(`is declared in props`, () => {
          expect(Component.propTypes[onEventName]).toBeTruthy()
        })
      })

      // -----------------------------------
      // Allows chained calls for optional
      // test suites
      // -----------------------------------
      return this
    },
  }
}
