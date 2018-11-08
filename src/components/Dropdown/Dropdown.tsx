import * as React from 'react'
import * as PropTypes from 'prop-types'

import { Extendable } from '../../../types/utils'
import { ComponentSlotStyle } from '../../themes/types'
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift'
import Label from '../Label/Label'
import { UIComponent, customPropTypes } from '../../lib'
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
  items?: DropdownListItem[]
  multiple?: boolean
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
export default class Dropdown extends UIComponent<Extendable<DropdownProps>, DropdownState> {
  private inputRef: HTMLElement

  static displayName = 'Dropdown'

  static className = 'ui-dropdown'

  static propTypes = {
    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** An input can take the width of its container. */
    fluid: PropTypes.bool,

    /** Shorthand array of props for ListItem. */
    items: customPropTypes.collectionShorthand,

    /** A dropdown can have a multiple selection. */
    multiple: PropTypes.bool,

    /**
     * Callback for change in dropdown active value(s).
     * @param {DropdownListItem|DropdownListItem[]} value - Dropdown active value(s).
     */
    onChange: PropTypes.func,

    /**
     * Callback for change in dropdown search value/
     * @param {string} searchQuery - The new value in the search field.
     */
    onSearchChange: PropTypes.func,

    /** A message to serve as placeholder. */
    placeholder: PropTypes.string,

    /** A dropdown can have a search field. */
    search: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** A dropdown can have a toggle button. */
    toggleButton: PropTypes.bool,
  }

  state: DropdownState = {
    backspaceDelete: true,
    focused: false,
    searchQuery: '',
    value: this.props.multiple ? [] : null,
  }

  public renderComponent({ ElementType, styles, variables }): React.ReactNode {
    const { search, multiple, toggleButton } = this.props
    const { searchQuery } = this.state
    // in multiple dropdown, we hold active values in the array, and default active is null.
    const selectedPropIfMultiple = { ...(multiple && { selectedItem: null }) }

    return (
      <ElementType>
        <Downshift
          onChange={this.handleChange}
          inputValue={searchQuery}
          {...selectedPropIfMultiple}
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
    const { items } = this.props
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
        content: <Text weight="bold" content={`We couldn't find any matches.`} />,
        styles: {
          backgroundColor: variables.listItemBackgroundColor,
        },
      },
    ]
  }

  private renderActiveValues(styles) {
    const value = this.state.value as DropdownListItem[]

    return value.length === 0
      ? null
      : value.map((item, index) => {
          const optionalImage = {
            image: item.image && { src: item.image, avatar: true },
          }
          return (
            <Label
              role="presentation"
              styles={styles.activeListLabel}
              circular
              key={`active-item-${index}`}
              content={<Text content={item.header} onClick={event => event.stopPropagation()} />}
              {...optionalImage}
              icon={{
                name: 'close',
                onClick: this.onCloseIconClick.bind(this, item),
                onKeyDown: this.onCloseIconKeyDown.bind(this, item),
                'aria-label': `Remove ${item.header} from selection.`,
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

  onContainerClick = isOpen => {
    !isOpen && this.inputRef.focus()
  }

  onInputKeyUpIfMultiple = event => {
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

  handleChange = element => {
    const { multiple } = this.props
    const newValue = multiple ? [...(this.state.value as DropdownListItem[]), element] : element

    _.invoke(this.props, 'onChange', newValue)

    this.setState({
      value: newValue,
      searchQuery: '',
      message: `${element.header} has been selected.`,
    })
  }

  onCloseIconClick = (element, event) => this.handleCloseIconAction(element, event)

  onCloseIconKeyDown = (element, event) => {
    if (keyboardKey.getCode(event) === keyboardKey.Enter) {
      this.handleCloseIconAction(element, event)
    }
  }

  onInputKeyDown = (highlightedIndex, selectItemAtIndex, event) => {
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

  stateReducer = (state: DownshiftState<any>, changes: StateChangeOptions<any>) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        _.invoke(this.props, 'onSearchChange', changes.inputValue)
        this.setState({
          searchQuery: changes.inputValue,
          backspaceDelete: !(state.inputValue.length > 0 && changes.inputValue.length === 0),
        })
        return changes
      default:
        return changes
    }
  }

  private handleCloseIconAction(element, event) {
    this.removeFromActiveValues(element)
    this.inputRef.focus()
    event.stopPropagation()
  }

  private removeFromActiveValues(element?) {
    let value = this.state.value as DropdownListItem[]
    let poppedElement = element

    if (poppedElement) {
      value = value.filter(currentElement => currentElement !== element)
    } else {
      poppedElement = value.pop()
    }

    _.invoke(this.props, 'onChange', value)

    this.setState({
      value,
      message: `${poppedElement.header} has been removed.`,
    })
  }
}
