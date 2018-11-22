import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { Extendable, ComponentEventHandler } from '../../../types/utils'
import { ComponentSlotStylesInput, ComponentVariablesInput } from '../../themes/types'
import Downshift, {
  DownshiftState,
  StateChangeOptions,
  A11yStatusMessageOptions,
  GetMenuPropsOptions,
  GetPropsCommonOptions,
  GetInputPropsOptions,
  GetToggleButtonPropsOptions,
  GetItemPropsOptions,
} from 'downshift'
import Label from '../Label/Label'
import { AutoControlledComponent, RenderResultConfig } from '../../lib'
import Input from '../Input/Input'
import keyboardKey from 'keyboard-key'
import List from '../List/List'
import Text from '../Text/Text'
import Image from '../Image/Image'
import ListItem from '../List/ListItem'
import Icon from '../Icon/Icon'
import { commonUIComponentPropTypes } from '../../lib/commonPropTypes'
import Ref from '../Ref/Ref'
import { UIComponentProps } from 'src/lib/commonPropInterfaces'

// To be replaced when Downshift will add highlightedItem in their interface.
export interface DownshiftA11yStatusMessageOptions<Item> extends A11yStatusMessageOptions<Item> {
  highlightedItem: Item
}

export interface DropdownProps extends UIComponentProps<any, any> {
  /** The default value for the search query. */
  defaultSearchQuery?: string

  /** The default value for the dropdown. */
  defaultValue?: DropdownListItem | DropdownListItem[]

  /** A dropdown can take the full width of its container. */
  fluid?: boolean

  /**
   * A function that creates custom accessability message for dropdown status.
   * @param {Object} messageGenerationProps - Object with properties to generate message from. See getA11yStatusMessage from Downshift repo.
   */
  getA11yStatusMessage?: (options: DownshiftA11yStatusMessageOptions<DropdownListItem>) => string

  /**
   * A function that creates custom accessability message for dropdown item selection.
   * @param {DropdownListItem} item - Dropdown selected element.
   */
  getA11ySelectedMessage?: (item: DropdownListItem) => string

  /** A function that creates custom accessability message for dropdown item removal.
   * @param {DropdownListItem} item - Dropdown removed element.
   */
  getA11yRemovedMessage?: (item: DropdownListItem) => string

  /** A function that creates custom aria label accessability message for the remove item button.
   * @param {DropdownListItem} item - The active item to be removed.
   */
  getA11yRemoveItemMessage?: (item: DropdownListItem) => string

  /** Array of props for generating dropdown items and selected item labels if multiple selection. */
  items?: DropdownListItem[]

  /**
   * Function to be passed to create selected searchQuery from selected item. It will be displayed on selection in the
   * edit text, for search, or on the button, for non-search. Multiple search will always clear searchQuery on selection.
   */
  itemToString?: (item: DropdownListItem) => string

  /** A dropdown can perform a multiple selection. */
  multiple?: boolean

  /** A string to be displayed when dropdown does not have available items to show. */
  noResultsMessage?: string

  /**
   * Callback for change in dropdown active value(s).
   * @param {DropdownListItem|DropdownListItem[]} value - Dropdown active value(s).
   */
  onDropdownChange?: (value: DropdownListItem | DropdownListItem[]) => any

  /**
   * Called on clicking the 'X' icon corresponding to an active value.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onCloseIconClick?: ComponentEventHandler<DropdownProps>

  /**
   * Called on key down on the 'X' icon corresponding to an active value.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onCloseIconKeyDown?: ComponentEventHandler<DropdownProps>

  /**
   * Called on edit text blur.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onInputBlur?: ComponentEventHandler<DropdownProps>

  /**
   * Called on edit text focus.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onInputFocus?: ComponentEventHandler<DropdownProps>

  /**
   * Called on edit text key down.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onInputKeyDown?: ComponentEventHandler<DropdownProps>

  /**
   * Called when clicking on an active value, on the text or avatar, if any.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onLabelClick?: ComponentEventHandler<DropdownProps>

  /**
   * Callback for change in dropdown search query value.
   * @param {string} searchQuery - The new value in the search field.
   */
  onSearchQueryChange?: (searchQuery: string) => any

  /** A message to serve as placeholder. */
  placeholder?: string

  /** A dropdown can have a search field instead of trigger button. */
  search?: boolean

  /** The value in the edit text, if dropdown is a search. */
  searchQuery?: string

  /** A dropdown can have a toggle button. */
  toggleButton?: boolean

  /** The value of the dropdown. */
  value?: DropdownListItem | DropdownListItem[]
}

export interface DropdownState {
  value: DropdownListItem | DropdownListItem[]
  backspaceDelete: boolean
  focused: boolean
  searchQuery?: string
}

export interface DropdownListItem {
  header: string
  key?: string
  content?: string
  image?: string
}
/**
 * A Dropdown allows a user to select a value or a multitude of values from a number of options.
 */
export default class Dropdown extends AutoControlledComponent<
  Extendable<DropdownProps>,
  DropdownState
> {
  private inputRef: HTMLElement

  static displayName = 'Dropdown'

  static className = 'ui-dropdown'

  static propTypes = {
    ...commonUIComponentPropTypes,
    defaultSearchQuery: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    fluid: PropTypes.bool,
    getA11yStatusMessage: PropTypes.func,
    getA11ySelectedMessage: PropTypes.func,
    getA11yRemovedMessage: PropTypes.func,
    getA11yRemoveItemMessage: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object),
    itemToString: PropTypes.func,
    multiple: PropTypes.bool,
    noResultsMessage: PropTypes.string,
    onCloseIconClick: PropTypes.func,
    onCloseIconKeyDown: PropTypes.func,
    onDropdownChange: PropTypes.func,
    onInputBlur: PropTypes.func,
    onInputFocus: PropTypes.func,
    onInputKeyDown: PropTypes.func,
    onLabelClick: PropTypes.func,
    onSearchQueryChange: PropTypes.func,
    placeholder: PropTypes.string,
    search: PropTypes.bool,
    searchQuery: PropTypes.string,
    toggleButton: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  }

  static defaultProps = {
    as: 'div',
  }

  static autoControlledProps = ['searchQuery', 'value']

  state: DropdownState = {
    // prevent deletion of last character + last selected value at the same time on backspace.
    backspaceDelete: this.props.multiple,
    focused: false,
    searchQuery: this.props.search ? '' : undefined,
    value: this.props.multiple ? [] : null,
  }

  public renderComponent({
    ElementType,
    classes,
    styles,
    variables,
    rest,
  }: RenderResultConfig<DropdownProps>) {
    const { search, multiple, toggleButton, getA11yStatusMessage, itemToString } = this.props
    const { searchQuery } = this.state
    // in multiple dropdown, we hold active values in the array, and default active is null.
    const optionalDownshiftProps = (multiple && { selectedItem: null }) || {}

    return (
      <ElementType {...rest} className={classes.root}>
        <Downshift
          onChange={this.handleChange}
          inputValue={searchQuery}
          stateReducer={this.stateReducer}
          getA11yStatusMessage={getA11yStatusMessage || this.getA11yStatusMessage}
          itemToString={itemToString || ((item: DropdownListItem) => (item ? item.header : ''))}
          {...optionalDownshiftProps}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            getRootProps,
            getToggleButtonProps,
            isOpen,
            highlightedIndex,
            selectItemAtIndex,
          }) => {
            return (
              <div
                className={classes.containerDiv}
                onClick={this.handleContainerClick.bind(this, isOpen)}
              >
                {multiple && this.renderActiveValues(styles)}
                {search &&
                  this.renderInput(
                    styles,
                    getRootProps,
                    getInputProps,
                    highlightedIndex,
                    selectItemAtIndex,
                  )}
                {toggleButton && this.renderToggleButton(getToggleButtonProps, styles, isOpen)}
                {this.renderList(
                  styles,
                  variables,
                  getMenuProps,
                  getItemProps,
                  isOpen,
                  highlightedIndex,
                )}
              </div>
            )
          }}
        </Downshift>
      </ElementType>
    )
  }

  private renderInput(
    styles: ComponentSlotStylesInput,
    getRootProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getInputProps: (options?: GetInputPropsOptions) => any,
    highlightedIndex: number,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
  ): JSX.Element {
    const { multiple, placeholder } = this.props
    const { searchQuery, value } = this.state

    return (
      <this.RefProvidingWrapper>
        <Input
          inputRef={input => (this.inputRef = input)}
          onFocus={this.handleInputFocus}
          onKeyUp={multiple && this.handleBackspaceDelete}
          wrapper={{
            styles: styles.editTextDiv,
            ...getRootProps({ refKey: 'innerRef' }, { suppressRefError: true }),
          }}
          variables={{ inputFocusBorderBottomColor: 'transparent' }}
          input={{
            type: 'text',
            styles: styles.editTextInput,
            placeholder:
              searchQuery.length > 0 || (multiple && (value as DropdownListItem[]).length > 0)
                ? ''
                : placeholder,
            ...getInputProps({
              onBlur: this.handleInputBlur,
              onKeyDown: this.handleInputKeyDown.bind(this, highlightedIndex, selectItemAtIndex),
            }),
          }}
        />
      </this.RefProvidingWrapper>
    )
  }

  private renderToggleButton(
    getToggleButtonProps: (options?: GetToggleButtonPropsOptions) => any,
    styles: ComponentSlotStylesInput,
    isOpen: boolean,
  ) {
    return (
      <Icon
        name={`chevron ${isOpen ? 'up' : 'down'}`}
        as="button"
        tabIndex="-1"
        styles={styles.toggleButton}
        {...getToggleButtonProps()}
      />
    )
  }

  private renderList(
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
    getMenuProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getItemProps: (options: GetItemPropsOptions<DropdownListItem>) => any,
    isOpen: boolean,
    highlightedIndex: number,
  ) {
    return (
      <this.RefProvidingWrapper>
        <List
          {...getMenuProps({ refKey: 'innerRef' })}
          styles={styles.list}
          aria-hidden={!isOpen}
          items={isOpen ? this.renderItems(variables, getItemProps, highlightedIndex) : []}
        />
      </this.RefProvidingWrapper>
    )
  }

  private renderItems(
    variables: ComponentVariablesInput,
    getItemProps: (options: GetItemPropsOptions<DropdownListItem>) => any,
    highlightedIndex: number,
  ) {
    const { items, noResultsMessage } = this.props
    if (items.length > 0) {
      return items.map((item, index) => {
        // to avoid passing undefined for these props, will spread.
        const optionalItemProps = {
          media: item.image && <Image src={item.image} avatar />,
          content: item.content,
        }
        return (
          <ListItem
            key={item.key || item.header}
            header={item.header}
            {...optionalItemProps}
            variables={{
              ...(highlightedIndex === index && {
                headerColor: variables.listItemTextColor,
                contentColor: variables.listItemTextColor,
              }),
            }}
            styles={{
              backgroundColor:
                highlightedIndex === index
                  ? variables.listItemHighlightedBackgroundColor
                  : variables.listItemBackgroundColor,
            }}
            {...getItemProps({ index, item })}
          />
        )
      })
    }
    // render no match message.
    return [
      {
        key: 'people-picker-no-results-item',
        content: (
          <Text weight="bold" content={noResultsMessage || `We couldn't find any matches.`} />
        ),
        styles: {
          backgroundColor: variables.listItemBackgroundColor,
        },
      },
    ]
  }

  private renderActiveValues(styles: ComponentSlotStylesInput) {
    const value = this.state.value as DropdownListItem[]
    const { getA11yRemoveItemMessage } = this.props

    if (value.length === 0) {
      return null
    }

    return value.map(item => {
      const optionalImage = {
        ...(item.image && {
          image: { src: item.image, avatar: true, onClick: this.handleLabelClick },
        }),
      }
      return (
        <Label
          role="presentation"
          styles={styles.activeListLabel}
          circular
          key={`active-item-${item.key || item.header}`}
          content={<Text content={item.header} onClick={this.handleLabelClick} />}
          {...optionalImage}
          icon={{
            name: 'close',
            onClick: this.handleCloseIconClick.bind(this, item),
            onKeyDown: this.handleCloseIconKeyDown.bind(this, item),
            'aria-label': getA11yRemoveItemMessage
              ? getA11yRemoveItemMessage(item)
              : `Remove ${item.header} from selection.`,
            'aria-hidden': false,
            role: 'button',
          }}
        />
      )
    })
  }

  RefProvidingWrapper = ({ children }) => (
    <Ref innerRef={domNode => _.invoke(children.props, 'innerRef', domNode)}>{children}</Ref>
  )

  private stateReducer = (
    state: DownshiftState<DropdownListItem>,
    changes: StateChangeOptions<DropdownListItem>,
  ) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        this.trySetState({
          searchQuery: changes.inputValue,
        })
        this.setState({
          backspaceDelete: !(state.inputValue.length > 0 && changes.inputValue.length === 0),
        })
        _.invoke(this.props, 'onSearchQueryChange', changes.inputValue)
        return changes
      default:
        return changes
    }
  }

  private getA11yStatusMessage = ({
    highlightedItem,
    isOpen,
    itemToString,
    previousResultCount,
    resultCount,
    selectedItem,
  }: DownshiftA11yStatusMessageOptions<DropdownListItem>) => {
    if (!isOpen) {
      return selectedItem ? itemToString(selectedItem) : ''
    }
    if (!resultCount) {
      return 'No results are available.'
    }
    if (!highlightedItem && resultCount !== previousResultCount) {
      return `${resultCount} result${
        resultCount === 1 ? 'is' : 's are'
      } available, use up and down arrow keys to navigate. Press Enter key to select.`
    }
    return ''
  }

  private setA11yStatus = (statusMessage: string) => {
    const elementId = 'stardust-dropdown-a11y-status'
    let statusDiv = document.getElementById(elementId)

    if (!statusDiv) {
      statusDiv = document.createElement('div')
      statusDiv.setAttribute('id', elementId)
      statusDiv.setAttribute('role', 'status')
      statusDiv.setAttribute('aria-live', 'polite')
      statusDiv.setAttribute('aria-relevant', 'additions text')
      Object.assign(statusDiv.style, {
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px',
      })
      document.body.appendChild(statusDiv)
    }

    statusDiv.textContent = statusMessage
  }

  private handleInputFocus = (e: React.SyntheticEvent) => {
    this.setState({ focused: true })

    _.invoke(this.props, 'onInputFocus', e, this.props)
  }

  private handleInputBlur = (e: React.SyntheticEvent) => {
    this.setState({ focused: false })

    _.invoke(this.props, 'onInputBlur', e, this.props)
  }

  private handleContainerClick = (isOpen: boolean, e: React.SyntheticEvent) => {
    !isOpen && this.inputRef.focus()
  }

  private handleBackspaceDelete = (e: React.SyntheticEvent) => {
    if (keyboardKey.getCode(e) === keyboardKey.Backspace) {
      const { searchQuery, value, backspaceDelete } = this.state

      if (searchQuery === '' && (value as DropdownListItem[]).length > 0) {
        if (!backspaceDelete) {
          this.setState({ backspaceDelete: true })
        } else {
          this.removeFromActiveValues()
        }
      }
    }
  }

  private handleChange = (item: DropdownListItem) => {
    const { multiple, getA11ySelectedMessage } = this.props
    const newValue = multiple ? [...(this.state.value as DropdownListItem[]), item] : item

    this.trySetState({
      value: newValue,
      searchQuery: '',
    })
    this.setA11yStatus(
      getA11ySelectedMessage ? getA11ySelectedMessage(item) : `${item.header} has been selected.`,
    )

    _.invoke(this.props, 'onDropdownChange', newValue)
  }

  private handleLabelClick = (e: React.SyntheticEvent) => {
    e.stopPropagation()

    _.invoke(this.props, 'onLabelClick', e, this.props)
  }

  private handleCloseIconClick = (item: DropdownListItem, e: React.SyntheticEvent) => {
    this.handleCloseIconAction(item, e)

    _.invoke(this.props, 'onCloseIconClick', e, { ...this.props, item })
  }

  private handleCloseIconKeyDown = (item: DropdownListItem, e: React.SyntheticEvent) => {
    if (keyboardKey.getCode(e) === keyboardKey.Enter) {
      this.handleCloseIconAction(item, e)
    }
    _.invoke(this.props, 'onCloseIconKeyDown', e, { ...this.props, item })
  }

  private handleInputKeyDown = (
    highlightedIndex: number,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
    e: React.SyntheticEvent,
  ) => {
    if (keyboardKey.getCode(e) === keyboardKey.Tab && highlightedIndex !== undefined) {
      selectItemAtIndex(highlightedIndex)
    }

    _.invoke(this.props, 'onInputKeyDown', e, {
      ...this.props,
      highlightedIndex,
      selectItemAtIndex,
    })
  }

  /**
   * Common function used by click and keydown handlers for label X icon.
   * Removes item from active values, focuses on edit text and stops event propagation.
   */
  private handleCloseIconAction(item: DropdownListItem, e: React.SyntheticEvent) {
    this.removeFromActiveValues(item)
    this.inputRef.focus()
    e.stopPropagation()
  }

  private removeFromActiveValues(item?: DropdownListItem): void {
    const { getA11yRemovedMessage } = this.props
    let value = this.state.value as DropdownListItem[]
    let poppedItem = item

    if (poppedItem) {
      value = value.filter(currentElement => currentElement !== item)
    } else {
      poppedItem = value.pop()
    }

    this.trySetState({
      value,
    })
    this.setA11yStatus(
      getA11yRemovedMessage
        ? getA11yRemovedMessage(item)
        : `${poppedItem.header} has been removed.`,
    )

    _.invoke(this.props, 'onDropdownChange', value)
  }
}
