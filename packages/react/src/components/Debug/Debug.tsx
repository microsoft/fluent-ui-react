import keyboardKey from 'keyboard-key'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as Stardust from '@stardust-ui/react'
import { toRefObject } from '@stardust-ui/react-component-ref'
import { EventListener } from '@stardust-ui/react-component-event-listener'
import DebugPanel from './DebugPanel'
import { isBrowser } from '../../lib'

//
// react/packages/shared/ReactTypes.js
//
type ReactEventResponder<E, C> = {
  $$typeof: Symbol | number
  displayName: string
  targetEventTypes: null | string[]
  rootEventTypes: null | string[]
  getInitialState: null | ((props: Object) => Object)
  onEvent: null | ((event: E, context: C, props: Object, state: Object) => void)
  onRootEvent: null | ((event: E, context: C, props: Object, state: Object) => void)
  onMount: null | ((context: C, props: Object, state: Object) => void)
  onUnmount: null | ((context: C, props: Object, state: Object) => void)
}

type ReactEventResponderInstance<E, C> = {
  fiber: Object
  props: Object
  responder: ReactEventResponder<E, C>
  rootEventTypes: null | Set<string>
  state: Object
}

//
// react/packages/react-reconciler/src/ReactFiberHooks.js
//
export type HookType =
  | 'useState'
  | 'useReducer'
  | 'useContext'
  | 'useRef'
  | 'useEffect'
  | 'useLayoutEffect'
  | 'useCallback'
  | 'useMemo'
  | 'useImperativeHandle'
  | 'useDebugValue'
  | 'useResponder'

type ReactProviderType<T> = {
  $$typeof: Symbol | number
  _context: ReactContext<T>
}

type ReactContext<T> = {
  $$typeof: Symbol | number
  Consumer: ReactContext<T>
  Provider: ReactProviderType<T>

  _calculateChangedBits: ((a: T, b: T) => number) | null

  _currentValue: T
  _currentValue2: T
  _threadCount: number

  // DEV only
  _currentRenderer?: Object | null
  _currentRenderer2?: Object | null
}

type ContextDependency<T> = {
  context: ReactContext<T>
  observedBits: number
  next: ContextDependency<any> | null
}

// enum WorkTag {
//   FunctionComponent = 0,
//   ClassComponent = 1,
//   IndeterminateComponent = 2, // Before we know whether it is function or class
//   HostRoot = 3, // Root of a host tree. Could be nested inside another node.
//   HostPortal = 4, // A subtree. Could be an entry point to a different renderer.
//   HostComponent = 5,
//   HostText = 6,
//   Fragment = 7,
//   Mode = 8,
//   ContextConsumer = 9,
//   ContextProvider = 10,
//   ForwardRef = 11,
//   Profiler = 12,
//   SuspenseComponent = 13,
//   MemoComponent = 14,
//   SimpleMemoComponent = 15,
//   LazyComponent = 16,
//   IncompleteClassComponent = 17,
//   DehydratedFragment = 18,
//   SuspenseListComponent = 19,
//   FundamentalComponent = 20,
//   ScopeComponent = 21,
// }

type Source = {
  fileName: string
  lineNumber: number
}

type ExpirationTime = number

type Dependencies = {
  expirationTime: ExpirationTime
  firstContext: ContextDependency<any> | null
  responders: Map<ReactEventResponder<any, any>, ReactEventResponderInstance<any, any>> | null
}

//
// react/packages/react-reconciler/src/ReactFiber.js
//

// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
type Fiber = {
  // // These first fields are conceptually members of an Instance. This used to
  // // be split into a separate type and intersected with the other Fiber fields,
  // // but until Flow fixes its intersection bugs, we've merged them into a
  // // single type.
  //
  // // An Instance is shared between all versions of a component. We can easily
  // // break this out into a separate object to avoid copying so much to the
  // // alternate versions of the tree. We put this on a single object for now to
  // // minimize the number of objects created during the initial render.
  //
  // // Tag identifying the type of fiber.
  // tag: WorkTag
  //
  // // Unique identifier of this child.
  // key: null | string

  // The value of element.type which is used to preserve the identity during
  // reconciliation of this child.
  elementType: any

  // The resolved function/class/ associated with this fiber.
  type: any

  // The local state associated with this fiber.
  stateNode: any

  // Conceptual aliases
  // parent : Instance -> return The parent happens to be the same as the
  // return fiber since we've merged the fiber and instance.

  // Remaining fields belong to Fiber

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  return: Fiber | null

  // Singly Linked List Tree Structure.
  child: Fiber | null
  sibling: Fiber | null
  index: number

  // // The ref last used to attach this node.
  // // I'll avoid adding an owner field for prod and model that as functions.
  // ref: React.Ref<any>

  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any // This type will be more specific once we overload the tag.
  memoizedProps: any // The props used to create the output.

  // // A queue of state updates and callbacks.
  // // updateQueue: UpdateQueue<any> | null,

  // The state used to create the output
  memoizedState: any

  // Dependencies (contexts, events) for this fiber, if it has any
  dependencies: Dependencies | null

  // // Bitfield that describes properties about the fiber and its subtree. E.g.
  // // the ConcurrentMode flag indicates whether the subtree should be async-by-
  // // default. When a fiber is created, it inherits the mode of its
  // // parent. Additional flags can be set at creation time, but after that the
  // // value should remain unchanged throughout the fiber's lifetime, particularly
  // // before its child fibers are created.
  // mode: TypeOfMode
  //
  // // Effect
  // effectTag: SideEffectTag
  //
  // // Singly linked list fast path to the next fiber with side-effects.
  // nextEffect: Fiber | null
  //
  // // The first and last fiber with side-effect within this subtree. This allows
  // // us to reuse a slice of the linked list when we reuse the work done within
  // // this fiber.
  // firstEffect: Fiber | null
  // lastEffect: Fiber | null
  //
  // // Represents a time in the future by which this work should be completed.
  // // Does not include work found in its subtree.
  // expirationTime: ExpirationTime
  //
  // // This is used to quickly determine if a subtree has no pending changes.
  // childExpirationTime: ExpirationTime
  //
  // // This is a pooled version of a Fiber. Every fiber that gets updated will
  // // eventually have a pair. There are cases when we can clean up pairs to save
  // // memory if we need to.
  // alternate: Fiber | null
  //
  // // Time spent rendering this Fiber and its descendants for the current update.
  // // This tells us how well the tree makes use of sCU for memoization.
  // // It is reset to 0 each time we render and only updated when we don't bailout.
  // // This field is only set when the enableProfilerTimer flag is enabled.
  // actualDuration?: number
  //
  // // If the Fiber is currently active in the "render" phase,
  // // This marks the time at which the work began.
  // // This field is only set when the enableProfilerTimer flag is enabled.
  // actualStartTime?: number
  //
  // // Duration of the most recent render time for this Fiber.
  // // This value is not updated when we bailout for memoization purposes.
  // // This field is only set when the enableProfilerTimer flag is enabled.
  // selfBaseDuration?: number
  //
  // // Sum of base times for all descendants of this Fiber.
  // // This value bubbles up during the "complete" phase.
  // // This field is only set when the enableProfilerTimer flag is enabled.
  // treeBaseDuration?: number

  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: number
  _debugSource?: Source | null
  _debugOwner?: Fiber | null
  _debugIsCurrentlyTiming?: boolean
  _debugNeedsRemount?: boolean

  // Used to verify that the order of hooks does not change between renders.
  _debugHookTypes?: HookType[] | null
}

class FiberNavigator {
  __fiber: Fiber

  static domNodeToReactFiber = (elm: HTMLElement): Fiber => {
    for (const k in elm) {
      if (k.startsWith('__reactInternalInstance$')) {
        const fiber = elm[k]
        // console.debug('domNodeToReactFiber', { k, elm, fiber })
        return fiber
      }
    }

    return null
  }

  static fromFiber = fiber => {
    const fiberNavigator = new FiberNavigator()
    fiberNavigator.__fiber = fiber
    return fiberNavigator
  }

  static fromDOMNode = domNode => {
    const fiberNavigator = new FiberNavigator()
    fiberNavigator.__fiber = FiberNavigator.domNodeToReactFiber(domNode)

    if (!fiberNavigator.__fiber) {
      throw new Error('There is no React fiber for this DOM node.')
    }

    return fiberNavigator
  }

  static isFiber = fiber => {
    return fiber && fiber.elementType && fiber.type && fiber.tag && fiber.key && fiber.stateNode
  }

  get parent(): FiberNavigator {
    return FiberNavigator.fromFiber(this.__fiber.return)
  }

  get domNode() {
    // TODO: traverse down composite fibers until we get to DOM fiber, then return stateNode
    return this.__fiber.stateNode
  }

  get owner() {
    // TODO: traverse down composite fibers until we get to DOM fiber, then return stateNode
    return this.__fiber._debugOwner
  }

  get ref() {
    // TODO: hey, only works for classes :/ womp...
    return this.__fiber.return.stateNode
  }

  get elementType() {
    return this.__fiber.elementType
  }

  //
  // Component Types
  //

  isClassComponent = () => {
    // React.Component subclasses have this flag
    // https://reactjs.org/docs/implementation-notes.html
    const { type } = this.__fiber
    return typeof type === 'function' && !!type.prototype.isReactComponent
  }

  isFunctionComponent = () => {
    const { type } = this.__fiber
    return typeof type === 'function' && !this.isClassComponent()
  }

  isHostComponent = () => {
    // Host components are platform components (i.e. 'div' on web)
    // https://github.com/acdlite/react-fiber-architecture#type-and-key
    return typeof this.__fiber.type === 'string'
  }

  //
  // What this fiber component renders
  //

  isDOMComponent() {
    const childNavigator = FiberNavigator.fromFiber(this.__fiber.child)

    return childNavigator.isHostComponent()
  }

  isCompositeComponent() {
    return !this.isDOMComponent()
  }
}

const INITIAL_STATE = {
  isSelecting: false,
  stardustDOMNode: null,
  stardustComponent: null,
  stardustRef: null,
}

type DebugProps = {
  /** Existing document the popup should add listeners. */
  mountDocument?: Document
}

class Debug extends React.Component<DebugProps> {
  selectorRef = React.createRef<HTMLPreElement>()

  state = { ...INITIAL_STATE }

  static defaultProps = {
    mountDocument: isBrowser() ? window.document : null,
  }

  static propTypes = {
    mountDocument: PropTypes.object.isRequired,
  }

  handleKeyDown = e => {
    const code = keyboardKey.getCode(e)

    switch (code) {
      case keyboardKey.Escape: {
        this.setState(INITIAL_STATE)
        break
      }

      case keyboardKey.d: {
        if (e.altKey && e.shiftKey) {
          const isSelecting = !this.state.isSelecting

          this.setState({
            ...(!isSelecting && INITIAL_STATE),
            isSelecting,
          })
        }
        break
      }
    }
  }

  handleClick = e => {
    e.preventDefault(e)

    this.setState({
      isSelecting: false,
    })
  }

  handleMouseMove = e => {
    let node = e.target
    let stardustDOMNode: HTMLElement
    let stardustComponent: React.Component
    let stardustRef: React.ElementType

    // We start from a DOM node
    // We need to traverse up the React tree until we find a DOM component responsible for this DOM node
    // That component owns the DOM node.
    // All intermediary components are CompositeComponents and should be overlooked

    // console.group('MOUSEMOVE')

    while (!stardustDOMNode && node && node.parentNode) {
      const fiberNav = FiberNavigator.fromDOMNode(node)
      const SDComponent = Stardust[fiberNav.owner.elementType.name]

      // console.group('WHILE')
      // console.debug({ node, fiber, SDComponent })

      if (SDComponent) {
        stardustDOMNode = node
        stardustComponent = SDComponent
        stardustRef = fiberNav.ref
      } else {
        node = node.parentNode
      }

      // console.debug({ node, fiber, stardustDOMNode, stardustComponent })
      // console.groupEnd()
    }

    // console.groupEnd()

    if (
      stardustDOMNode !== this.state.stardustDOMNode ||
      stardustComponent !== this.state.stardustComponent ||
      stardustRef !== this.state.stardustRef
    ) {
      this.setState({ stardustDOMNode, stardustComponent, stardustRef })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.debug('DEBUG componentDidUpdate', { state: this.state, prevState })
    this.setDebugSelectorPosition()
  }

  setDebugSelectorPosition = () => {
    const { stardustDOMNode } = this.state

    if (stardustDOMNode && this.selectorRef.current) {
      const rect = stardustDOMNode.getBoundingClientRect()

      this.selectorRef.current.style.top = `${rect.top}px`
      this.selectorRef.current.style.left = `${rect.left}px`
      this.selectorRef.current.style.width = `${rect.width}px`
      this.selectorRef.current.style.height = `${rect.height}px`

      requestAnimationFrame(this.setDebugSelectorPosition)
    }
  }

  render() {
    const { mountDocument } = this.props
    const { stardustComponent, stardustRef, stardustDOMNode, isSelecting } = this.state

    const domNodeClassString = (stardustDOMNode && stardustDOMNode.getAttribute('class')) || ''

    return (
      <>
        <EventListener
          targetRef={toRefObject(mountDocument.body)}
          listener={this.handleKeyDown}
          type="keydown"
        />
        {stardustDOMNode && (
          <EventListener
            targetRef={toRefObject(stardustDOMNode)}
            listener={e => {
              console.debug('Clicked stardustDOMNode. Prevent default and stop propagation.', {
                stardustDOMNode,
                stardustRef,
                stardustComponent,
              })
              e.preventDefault()
              e.stopPropagation()
              this.setState({ isSelecting: false })
            }}
            type="click"
          />
        )}
        {isSelecting && (
          <>
            <EventListener
              targetRef={toRefObject(mountDocument.body)}
              listener={this.handleMouseMove}
              type="mousemove"
            />
            <EventListener
              targetRef={toRefObject(mountDocument.body)}
              listener={this.handleClick}
              type="click"
            />
          </>
        )}
        {stardustComponent && (
          <pre
            ref={this.selectorRef}
            style={{
              position: 'fixed',
              padding: 0,
              margin: 0,
              background: '#6495ed22',
              border: '1px solid #6495edcc',
              zIndex: 99999999,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                padding: '2px 4px',
                margin: '-1px 0 0 -1px',
                bottom: '100%',
                left: 0,
                color: '#fff',
                background: '#6495ed',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>
                {`<${stardustComponent.displayName || stardustComponent.name} />`}
              </span>
            </div>
            {stardustDOMNode && (
              <div
                style={{
                  fontSize: '0.9em',
                  position: 'absolute',
                  padding: '2px 4px',
                  margin: '0 0 1px -1px',
                  top: '100%',
                  left: 0,
                  background: '#6495ed',
                }}
              >
                <strong style={{ fontWeight: 'bold', color: 'hsl(160, 100%, 80%)' }}>
                  {stardustDOMNode.tagName.toLowerCase()}
                </strong>
                {domNodeClassString && (
                  <span style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                    .{domNodeClassString.replace(/ +/g, '.')}
                  </span>
                )}
              </div>
            )}
          </pre>
        )}
        {!isSelecting && stardustRef && stardustRef.stardustDebug && (
          <DebugPanel debugData={stardustRef.stardustDebug} />
        )}
      </>
    )
  }
}

export default Debug
