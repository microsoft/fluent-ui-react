import * as React from 'react'
import * as PropTypes from 'prop-types'

import { Extendable } from '../../../types/utils'
import { ComponentSlotStyle } from '../../themes/types'
import Downshift, { DownshiftState, StateChangeOptions, A11yStatusMessageOptions } from 'downshift'
import Label from '../Label/Label'
import { AutoControlledComponent, customPropTypes } from '../../lib'
import Input from '../Input/Input'
import keyboardKey from 'keyboard-key'
import List from '../List/List'
import Text from '../Text/Text'
import Image from '../Image/Image'
import ListItem from '../List/ListItem'
import _ from 'lodash'
import Icon from '../Icon/Icon'

export interface DropdownProps {
  className?: string
  fluid?: boolean
  getA11yStatusMessage?: (options: A11yStatusMessageOptions<DropdownListItem>) => string
  getA11ySelectedMessage?: (item: DropdownListItem) => string
  getA11yRemovedMessage?: (item: DropdownListItem) => string
  getA11yRemoveItemMessage?: (item: DropdownListItem) => string
  items?: DropdownListItem[]
  multiple?: boolean
  noResultsMessage?: string
  onChange?: (value: DropdownListItem | DropdownListItem[]) => any
  onSearchChange?: (searchQuery: string) => any
  placeholder?: string
  search?: boolean
  styles?: ComponentSlotStyle<DropdownProps, DropdownState>
  toggleButton?: boolean
}

export interface DropdownState {
  value: DropdownListItem | DropdownListItem[]
  backspaceDelete: boolean
  focused: boolean
  searchQuery?: string
  message?: string
}

export interface DropdownListItem {
  key: string
  header: string
  content?: string
  image?: string
}

/**
 */
export default class Dropdown extends AutoControlledComponent<
  Extendable<DropdownProps>,
  DropdownState
> {
  private inputRef: HTMLElement

  static displayName = 'Dropdown'

  static className = 'ui-dropdown'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The default value for the search query. */
    defaultSearchQuery: PropTypes.string,

    /** The default value of the dropdown. */
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    /** An input can take the width of its container. */
    fluid: PropTypes.bool,

    /** Array of props for generating dropdown items and selected item labels if multiple selection. */
    items: PropTypes.collectionShorthand,

    /** A function that creates custom accessability message for dropdown status.
     * @param {Object} messageGenerationProps - Object with properties to generate message from. See getA11yStatusMessage from Downshift reoi,
     */
    getA11yStatusMessage: PropTypes.func,

    /** A function that creates custom accessability message for dropdown selection.
     * @param {DropdownListItem} item - Dropdown selected element.
     */
    getA11ySelectedMessage: PropTypes.func,

    /** A function that creates custom accessability message for dropdown removal.
     * @param {DropdownListItem} item - Dropdown removed element.
     */
    getA11yRemovedMessage: PropTypes.func,

    /** A function that creates custom accessability message for active item remove button.
     * @param {DropdownListItem} item - The active item to be removed.
     */
    getA11yRemoveItemMessage: PropTypes.func,

    /** A dropdown can have a multiple selection. */
    multiple: PropTypes.bool,

    /** A string to be displayed when dropdown is not showing any items. */
    noResultsMessage: PropTypes.string,

    /**
     * Callback for change in dropdown active value(s).
     * @param {DropdownListItem|DropdownListItem[]} value - Dropdown active value(s).
     */
    onChange: PropTypes.func,

    /**
     * Callback for change in dropdown search value.
     * @param {string} searchQuery - The new value in the search field.
     */
    onSearchChange: PropTypes.func,

    /** A message to serve as placeholder. */
    placeholder: PropTypes.string,

    /** A dropdown can have a search field. */
    search: PropTypes.bool,

    /** The value in the edit text, if dropdown is a search. */
    searchQuery: PropTypes.string,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** A dropdown can have a toggle button. */
    toggleButton: PropTypes.bool,

    /** The value of the dropdown. */
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  }

  static defaultProps = {
    as: 'div',
  }

  static autoControlledProps = ['searchQuery', 'value']

  state: DropdownState = {
    backspaceDelete: true,
    focused: false,
    searchQuery: '',
    value: this.props.multiple ? [] : null,
  }

  public renderComponent({ ElementType, styles, variables }): React.ReactNode {
    const { search, multiple, toggleButton, getA11yStatusMessage } = this.props
    const { searchQuery } = this.state
    // in multiple dropdown, we hold active values in the array, and default active is null.
    const optionalDownshiftProps = {
      ...(multiple && { selectedItem: null }),
      ...(getA11yStatusMessage && { getA11yStatusMessage }),
    }

    return (
      <ElementType>
        <Downshift
          onChange={this.handleChange}
          inputValue={searchQuery}
          {...optionalDownshiftProps}
          stateReducer={this.stateReducer}
          itemToString={(item: DropdownListItem) => (item ? item.header : '')}
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
              <div style={styles.containerDiv} onClick={this.onContainerClick.bind(this, isOpen)}>
                <span aria-live="assertive" style={styles.ariaLiveSpan}>
                  {this.state.message}
                </span>
                {multiple && this.renderActiveValues(styles)}
                {search &&
                  this.renderInput(
                    styles,
                    variables,
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
    styles,
    variables,
    getRootProps,
    getInputProps,
    highlightedIndex,
    selectItemAtIndex,
  ): JSX.Element {
    const { multiple, placeholder } = this.props
    const { searchQuery, value } = this.state

    return (
      <Input
        inputRef={input => (this.inputRef = input)}
        onFocus={this.onInputFocus}
        onKeyUp={multiple && this.onInputKeyUpIfMultiple}
        styles={styles.editTextDiv}
        wrapper={{ ...getRootProps({ refKey: 'slotRef' }, { suppressRefError: true }) }}
        variables={{ inputFocusBorderColor: variables.editTextInputFocusBorderColor }}
        input={{
          type: 'text',
          styles: styles.editTextInput,
          placeholder:
            searchQuery.length > 0 || (multiple && (value as DropdownListItem[]).length > 0)
              ? ''
              : placeholder,
          ...getInputProps({
            onBlur: this.onInputBlur,
            onKeyDown: this.onInputKeyDown.bind(this, highlightedIndex, selectItemAtIndex),
          }),
        }}
      />
    )
  }

  private renderToggleButton(getToggleButtonProps, styles, isOpen) {
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

  private renderList(styles, variables, getMenuProps, getItemProps, isOpen, highlightedIndex) {
    return (
      <List
        {...getMenuProps({ refKey: 'listRef' })}
        styles={styles.list}
        aria-hidden={!isOpen}
        items={isOpen ? this.renderItems(variables, getItemProps, highlightedIndex) : []}
      />
    )
  }

  private renderItems(variables, getItemProps, highlightedIndex) {
    const { items, noResultsMessage } = this.props
    if (items.length > 0) {
      return items.map((item, index) => {
        const optionalItemProps = {
          media: item.image && <Image src={item.image} avatar />,
          content: item.content,
        }
        return (
          <ListItem
            key={item.key}
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
    // render no match error.
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

  private renderActiveValues(styles) {
    const value = this.state.value as DropdownListItem[]
    const { getA11yRemoveItemMessage } = this.props

    return value.length === 0
      ? null
      : value.map((item, index) => {
          const optionalImage = {
            ...(item.image && {
              image: { src: item.image, avatar: true, onClick: this.onLabelClick },
            }),
          }
          return (
            <Label
              role="presentation"
              styles={styles.activeListLabel}
              circular
              key={`active-item-${index}`}
              content={<Text content={item.header} onClick={this.onLabelClick} />}
              {...optionalImage}
              icon={{
                name: 'close',
                onClick: this.onCloseIconClick.bind(this, item),
                onKeyDown: this.onCloseIconKeyDown.bind(this, item),
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

  onInputFocus = () => {
    this.setState({ focused: true })
  }

  onInputBlur = () => {
    this.setState({ focused: false })
  }

  onContainerClick = (isOpen: boolean) => {
    !isOpen && this.inputRef.focus()
  }

  onInputKeyUpIfMultiple = (event: React.SyntheticEvent) => {
    const { searchQuery, value, backspaceDelete } = this.state

    switch (keyboardKey.getCode(event)) {
      case keyboardKey.Backspace:
        if (searchQuery === '' && (value as DropdownListItem[]).length > 0) {
          if (!backspaceDelete) {
            this.setState({ backspaceDelete: true })
          } else {
            this.removeFromActiveValues()
          }
        }
      default:
        return
    }
  }

  handleChange = (item: DropdownListItem) => {
    const { multiple, getA11ySelectedMessage } = this.props
    const newValue = multiple ? [...(this.state.value as DropdownListItem[]), item] : item

    _.invoke(this.props, 'onChange', newValue)

    this.trySetState({
      value: newValue,
      searchQuery: '',
    })
    this.setState({
      message: getA11ySelectedMessage
        ? getA11ySelectedMessage(item)
        : `${item.header} has been selected.`,
    })
  }

  onCloseIconClick = (item: DropdownListItem, event: React.SyntheticEvent) =>
    this.handleCloseIconAction(item, event)

  onLabelClick = (event: React.SyntheticEvent) => event.stopPropagation()

  onCloseIconKeyDown = (item: DropdownListItem, event: React.SyntheticEvent) => {
    if (keyboardKey.getCode(event) === keyboardKey.Enter) {
      this.handleCloseIconAction(item, event)
    }
  }

  onInputKeyDown = (
    highlightedIndex: number,
    selectItemAtIndex: (index: number) => void,
    event: React.SyntheticEvent,
  ) => {
    switch (keyboardKey.getCode(event)) {
      case keyboardKey.Tab:
        if (highlightedIndex !== undefined) {
          selectItemAtIndex(highlightedIndex)
        }
        return
      default:
        return
    }
  }

  stateReducer = (
    state: DownshiftState<DropdownListItem>,
    changes: StateChangeOptions<DropdownListItem>,
  ) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        _.invoke(this.props, 'onSearchChange', changes.inputValue)
        this.trySetState({
          searchQuery: changes.inputValue,
        })
        this.setState({
          backspaceDelete: !(state.inputValue.length > 0 && changes.inputValue.length === 0),
        })
        return changes
      default:
        return changes
    }
  }

  private handleCloseIconAction(item: DropdownListItem, event: React.SyntheticEvent) {
    this.removeFromActiveValues(item)
    this.inputRef.focus()
    event.stopPropagation()
  }

  private removeFromActiveValues(item?: DropdownListItem) {
    const { getA11yRemovedMessage } = this.props
    let value = this.state.value as DropdownListItem[]
    let poppedItem = item

    if (poppedItem) {
      value = value.filter(currentElement => currentElement !== item)
    } else {
      poppedItem = value.pop()
    }

    _.invoke(this.props, 'onChange', value)

    this.trySetState({
      value,
    })
    this.setState({
      message: getA11yRemovedMessage
        ? getA11yRemovedMessage(item)
        : `${poppedItem.header} has been removed.`,
    })
  }
}
