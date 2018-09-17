import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'
import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import ItemLayout from '../ItemLayout'
import { ListItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable } from '../../../types/utils'

const END = 35
const HOME = 36
const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const ENTER = 13
const SPACE = 32
const ESC = 27
const TAB = 9

interface IAtomicItemProps {
  idx: number
  isFocused: boolean

  isFirstElement: boolean
  isLastElement: boolean

  onMovePrevious: () => void
  onMoveNext: () => void
  onMoveFirst: () => void
  onMoveLast: () => void
  onEnter: () => void
  onSpace: () => void
  onEsc: () => void
}

interface IAtomicItemState {
  shouldSubContainerBeOpened: boolean
  isLastOpened: boolean
  isHovering: boolean
}

export interface IListItemProps extends IAtomicItemProps {
  accessibility?: Accessibility
  as?: any
  className?: string
  contentMedia?: any
  content?: any
  debug?: boolean
  header?: any
  endMedia?: any
  headerMedia?: any
  important?: boolean
  media?: any
  selection?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

class ListItem extends UIComponent<Extendable<IListItemProps>, IAtomicItemState> {
  static create: Function

  static displayName = 'ListItem'

  static className = 'ui-list__item'

  static propTypes = {
    idx: PropTypes.number,

    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    contentMedia: PropTypes.any,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Toggle debug mode */
    debug: PropTypes.bool,

    header: PropTypes.any,
    endMedia: PropTypes.any,
    headerMedia: PropTypes.any,

    /** A list item can appear more important and draw the user's attention. */
    important: PropTypes.bool,
    media: PropTypes.any,

    /** A list item can indicate that it can be selected. */
    selection: PropTypes.bool,
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    isFocused: PropTypes.bool,

    isFirstElement: PropTypes.bool,
    isLastElement: PropTypes.bool,

    onMovePrevious: PropTypes.func,
    onMoveNext: PropTypes.func,
    onMoveFirst: PropTypes.func,
    onMoveLast: PropTypes.func,
    onEnter: PropTypes.func,
    onSpace: PropTypes.func,
    onEsc: PropTypes.func,
  }

  static handledProps = [
    'idx',
    'accessibility',
    'as',
    'className',
    'content',
    'contentMedia',
    'debug',
    'endMedia',
    'header',
    'headerMedia',
    'important',
    'media',
    'selection',
    'styles',
    'truncateContent',
    'truncateHeader',
    'variables',
    'isFocused',
    'isFirstElement',
    'isLastElement',
    'onMovePrevious',
    'onMoveNext',
    'onMoveFirst',
    'onMoveLast',
    'onEnter',
    'onSpace',
    'onEsc',
  ]

  static defaultProps = {
    as: 'li',
    accessibility: ListItemBehavior as Accessibility,
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  handleKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case END:
        console.log('End Arrow Key Pressed')
        this.moveLast()
        break

      case HOME:
        console.log('Home Arrow Key Pressed')
        this.moveFirst()
        break

      case LEFT_ARROW:
        console.log('Left Arrow Key Pressed')
        if (this.props.parentContainerDirection === 'vertical') {
          break
        }
        this.movePrevious()
        break

      case RIGHT_ARROW:
        console.log('Right Arrow Key Pressed')
        if (this.props.parentContainerDirection === 'vertical') {
          break
        }
        this.moveNext()
        break

      case UP_ARROW:
        console.log('Up Arrow Key Pressed')
        if (this.props.parentContainerDirection === 'horizontal') {
          break
        }
        this.movePrevious()
        break

      case DOWN_ARROW:
        console.log('Down Arrow Key Pressed')
        if (this.props.parentContainerDirection === 'horizontal') {
          break
        }
        this.moveNext()
        break

      case ENTER:
        console.log('ENTER Key Pressed')
        this.enter()
        break

      case SPACE:
        console.log('SPACE Key Pressed')
        this.space()
        break

      case ESC:
        console.log('ESC Key Pressed')

        console.error(`isLastOpened ${this.state.isLastOpened}`)
        this.esc()
        if (this.state.isLastOpened === true) {
          e.preventDefault()
          e.stopPropagation()
          this.setState({ isLastOpened: false })
        }
        break
    }

    // TODO: make this correct
    if (e.keyCode !== TAB && e.keyCode !== ESC) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  private movePrevious() {
    if (this.props.isFirstElement || !this.props.isFocused) {
      return
    }

    this.props.onMovePrevious()
  }

  private moveNext() {
    if (this.props.isLastElement || !this.props.isFocused) {
      return
    }

    this.props.onMoveNext()
  }

  private moveFirst() {
    if (this.props.isFirstElement || !this.props.isFocused) {
      return
    }

    this.props.onMoveFirst()
  }

  private moveLast() {
    if (this.props.isLastElement || !this.props.isFocused) {
      return
    }

    this.props.onMoveLast()
  }

  private enter() {
    this.setState({ isLastOpened: false })

    if (!this.props.isFocused || !this.props.subItems) {
      return
    }

    this.setState({
      shouldSubContainerBeOpened: true,
      isLastOpened: true,
    })

    this.props.onEnter()
  }

  private space() {
    if (!this.props.isFocused) {
      return
    }

    this.props.onSpace()
  }

  private esc() {
    if (!this.props.isFocused) {
      return
    }

    console.warn(`isLastOpened ${this.state.isLastOpened}`)

    this.setState({ shouldSubContainerBeOpened: false })
    this.props.onEsc()
  }

  private itemRef = React.createRef<HTMLLIElement>()

  constructor(props: IAtomicItemProps, state: IAtomicItemState) {
    super(props, state)

    this.state = {
      shouldSubContainerBeOpened: false,
      isLastOpened: false,
      isHovering: false,
    }
  }

  componentDidUpdate() {
    if (this.props.isFocused) {
      const domNode = ReactDOM.findDOMNode(this.itemRef.current!) as HTMLElement
      domNode.focus()
    }
  }

  renderComponent({ ElementType, classes, accessibility, rest, styles }) {
    const {
      idx,
      as,
      debug,
      endMedia,
      media,
      content,
      contentMedia,
      header,
      headerMedia,
      selection,
      truncateContent,
      truncateHeader,
    } = this.props

    const { isHovering } = this.state
    const endArea = isHovering && endMedia

    const hoveringSelectionCSS = selection && isHovering ? { color: 'inherit' } : {}

    const headerCSS = {
      ...styles.header,
      ...hoveringSelectionCSS,
    }
    const headerMediaCSS = {
      ...styles.headerMedia,
      ...hoveringSelectionCSS,
    }
    const contentCSS = {
      ...styles.content,
      ...hoveringSelectionCSS,
    }

    return (
      <ItemLayout
        idx={idx}
        as={as}
        className={classes.root}
        rootCSS={styles.root}
        content={content}
        contentMedia={!isHovering && contentMedia}
        debug={debug}
        endMedia={endArea}
        header={header}
        headerMedia={headerMedia}
        media={media}
        mediaCSS={styles.media}
        selection={selection}
        truncateContent={truncateContent}
        truncateHeader={truncateHeader}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onKeyDown={this.handleKeyDown}
        headerCSS={headerCSS}
        headerMediaCSS={headerMediaCSS}
        contentCSS={contentCSS}
        ref={this.itemRef}
        {...accessibility.attributes.root}
        {...rest}
      />
    )
  }
}

ListItem.create = createShorthandFactory(ListItem, main => ({ main }))

export default ListItem
