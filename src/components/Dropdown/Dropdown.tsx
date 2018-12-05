import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import {
  Extendable,
  ShorthandValue,
  ShorthandRenderFunction,
  ComponentEventHandler,
} from '../../../types/utils'
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
import {
  AutoControlledComponent,
  RenderResultConfig,
  customPropTypes,
  commonPropTypes,
} from '../../lib'
import keyboardKey from 'keyboard-key'
import List from '../List/List'
import Text from '../Text/Text'
import Icon from '../Icon/Icon'
import Ref from '../Ref/Ref'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import DropdownItem, { DropdownItemProps } from './DropdownItem'
import DropdownLabel, { DropdownLabelProps } from './DropdownLabel'
import DropdownSearchInput from './DropdownSearchInput'
import { DropdownSearchInputProps } from 'semantic-ui-react'

// TODO: To be replaced when Downshift will add highlightedItem in their interface.
export interface DownshiftA11yStatusMessageOptions<Item> extends A11yStatusMessageOptions<Item> {
  highlightedItem: Item
}

export interface DropdownProps extends UIComponentProps<any, any> {
  /** The initial value for the search query, if search. */
  defaultSearchQuery?: string

  /** The initial value or value array, if multiple. */
  defaultValue?: ShorthandValue | ShorthandValue[]

  /** A dropdown can take the full width of its container. */
  fluid?: boolean

  /** Object that contains callbacks for creating aria-live messages needed for multiple selection dropdown. */
  getA11ySelectionMessage?: {
    /**
     * A function that creates custom accessability message a screen reader narrates on item added to selection.
     * @param {ShorthandValue} item - Dropdown added element.
     */
    onAdd?: (item: ShorthandValue) => string
    /**
     * A function that creates custom accessability message a screen reader narrates on item removed from selection.
     * @param {ShorthandValue} item - Dropdown removed element.
     */
    onRemove?: (item: ShorthandValue) => string
  }

  /**
   * A function that creates custom accessability message for dropdown status, updated on highlighting an item, opening list or navigating
   * with the screen reader on the dropdown combobox when an item is selected.
   * @param {Object} messageGenerationProps - Object with properties to generate message from. See getA11yStatusMessage from Downshift repo.
   */
  getA11yStatusMessage?: (options: DownshiftA11yStatusMessageOptions<ShorthandValue>) => string

  /** Array of props for generating list options (Dropdown.Item[]) and selected item labels(Dropdown.Label[]), if multiple. */
  items?: ShorthandValue[]

  /**
   * Function to be passed to create selected searchQuery from selected item. It will be displayed when an item is selected, inside the
   * edit text, for search, or on the button, for non-search.
   */
  itemToString?: (item: ShorthandValue) => string

  /** A dropdown can perform a multiple selection. */
  multiple?: boolean

  /** A string to be displayed in the list when dropdown has no available items to show. */
  noResultsMessage?: string

  /**
   * Callback for change in dropdown search query value.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {Object} data - All props and the new search query value in the edit text.
   */
  onSearchQueryChange?: ComponentEventHandler<DropdownProps>

  /**
   * Callback for change in dropdown active value(s).
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {Object} data - All props and the new active value(s).
   */
  onSelectedChange?: ComponentEventHandler<DropdownProps>

  /** A message to serve as placeholder, on the edit text, if search, or on the button, if not. */
  placeholder?: string

  /**
   * A custom render function the Dropdown.Item slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderItem?: ShorthandRenderFunction

  /**
   * A custom render function the Dropdown.Label slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderLabel?: ShorthandRenderFunction

  /**
   * A custom render function the Dropdown.SearchInput slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderSearchInput?: ShorthandRenderFunction

  /** A dropdown can have a search field instead of trigger button. Can receive a function that will replace the default search. */
  search?: boolean | ((items: ShorthandValue[], searchQuery: string) => ShorthandValue[])

  /** Shorthand for the edit text (Dropdown.SearchInput) that has the search query, if search. */
  searchInput?: ShorthandValue

  /** The value in the edit text, if dropdown is a search. */
  searchQuery?: string

  /** A dropdown can have a toggle button. */
  toggleButton?: boolean

  /** The value of the dropdown. */
  value?: ShorthandValue | ShorthandValue[]
}

export interface DropdownState {
  value: ShorthandValue | ShorthandValue[]
  backspaceDelete: boolean
  focused: boolean
  searchQuery?: string
}

/**
 * A Dropdown allows a user to select a value or a multitude of values from a number of options.
 */
export default class Dropdown extends AutoControlledComponent<
  Extendable<DropdownProps>,
  DropdownState
> {
  private inputNode: HTMLElement

  static displayName = 'Dropdown'

  static className = 'ui-dropdown'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    defaultSearchQuery: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      customPropTypes.collectionShorthand,
    ]),
    fluid: PropTypes.bool,
    getA11yStatusMessage: PropTypes.func,
    getA11ySelectedMessage: PropTypes.func,
    getA11yRemovedMessage: PropTypes.func,
    items: customPropTypes.collectionShorthand,
    itemToString: PropTypes.func,
    multiple: PropTypes.bool,
    noResultsMessage: PropTypes.string,
    onSearchQueryChange: PropTypes.func,
    onSelectedChange: PropTypes.func,
    placeholder: PropTypes.string,
    renderItem: PropTypes.func,
    renderLabel: PropTypes.func,
    renderSearchInput: PropTypes.func,
    search: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    searchQuery: PropTypes.string,
    searchInput: customPropTypes.itemShorthand,
    toggleButton: PropTypes.bool,
    value: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      customPropTypes.collectionShorthand,
    ]),
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
          onChange={this.handleSelectedChange}
          inputValue={searchQuery}
          stateReducer={this.stateReducer}
          getA11yStatusMessage={getA11yStatusMessage || this.getA11yStatusMessage}
          itemToString={itemToString || this.itemToString}
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
                {multiple && this.renderLabels(styles)}
                {search &&
                  this.renderInput(
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
    variables: ComponentVariablesInput,
    getRootProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getInputProps: (options?: GetInputPropsOptions) => any,
    highlightedIndex: number,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
  ): JSX.Element {
    const { searchInput, renderSearchInput, multiple, placeholder } = this.props
    const { searchQuery, value } = this.state
    const shouldNotHavePlaceholder =
      searchQuery.length > 0 || (multiple && (value as ShorthandValue[]).length > 0)

    return DropdownSearchInput.create(searchInput || {}, {
      defaultProps: {
        placeholder: shouldNotHavePlaceholder ? '' : placeholder,
        inputRef: (inputNode: HTMLElement) => {
          this.inputNode = inputNode
        },
        variables,
      },
      overrideProps: (predefinedProps: DropdownSearchInputProps) =>
        this.handleSearchInputOverrides(
          predefinedProps,
          highlightedIndex,
          selectItemAtIndex,
          getRootProps,
          getInputProps,
        ),
      render: renderSearchInput,
    })
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
    getItemProps: (options: GetItemPropsOptions<ShorthandValue>) => any,
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
    getItemProps: (options: GetItemPropsOptions<ShorthandValue>) => any,
    highlightedIndex: number,
  ) {
    const { items, noResultsMessage, renderItem } = this.props
    const filteredItems = this.getFilteredItems(items)
    if (filteredItems.length > 0) {
      return filteredItems.map((item, index) => {
        let itemAsListItem = item
        if (typeof item === 'object') {
          itemAsListItem = _.pickBy(item, (value, key) =>
            _.includes(['key', ...DropdownItem.handledProps], key),
          )
        }
        return DropdownItem.create(itemAsListItem, {
          defaultProps: {
            highlighted: highlightedIndex === index,
            variables,
            ...(typeof item === 'object' &&
              !item.hasOwnProperty('key') && {
                key: (item as any).header,
              }),
          },
          overrideProps: (predefinedProps: DropdownItemProps) =>
            this.handleItemOverrides(item, index, getItemProps),
          render: renderItem,
        })
      })
    }
    // render no match message.
    return [
      {
        key: 'people-picker-no-results-item',
        content: (
          <Text weight="bold" content={noResultsMessage || `We couldn't find any matches.`} />
        ),
        variables: {
          backgroundColor: variables.listItemBackgroundColor,
        },
      },
    ]
  }

  private renderLabels(styles: ComponentSlotStylesInput) {
    const value = this.state.value as ShorthandValue[]
    const { renderLabel } = this.props

    if (value.length === 0) {
      return null
    }

    return value.map(item => {
      let itemAsLabel = item
      if (typeof item === 'object') {
        itemAsLabel = _.pickBy(item, (value, key) =>
          _.includes(['key', ...DropdownLabel.handledProps], key),
        )
      }
      return DropdownLabel.create(itemAsLabel, {
        defaultProps: {
          styles: styles.activeListLabel,
          ...(typeof item === 'object' &&
            !item.hasOwnProperty('key') && {
              key: (item as any).header,
            }),
        },
        overrideProps: (predefinedProps: DropdownLabelProps) =>
          this.handleLabelOverrides(predefinedProps, item),
        render: renderLabel,
      })
    })
  }

  RefProvidingWrapper = ({ children }) => (
    <Ref innerRef={domNode => _.invoke(children.props, 'innerRef', domNode)}>{children}</Ref>
  )

  private stateReducer = (
    state: DownshiftState<ShorthandValue>,
    changes: StateChangeOptions<ShorthandValue>,
  ) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        this.trySetState({
          searchQuery: changes.inputValue,
        })
        this.setState({
          backspaceDelete: !(state.inputValue.length > 0 && changes.inputValue.length === 0),
        })
        _.invoke(
          this.props,
          'onSearchQueryChange',
          {},
          { ...this.props, searchQuery: changes.inputValue },
        )
        return changes
      default:
        return changes
    }
  }

  private getFilteredItems = (items: ShorthandValue[]): ShorthandValue[] => {
    const { multiple, search } = this.props
    const { searchQuery } = this.state
    let filteredItems = items
    if (multiple) {
      const value = this.state.value as ShorthandValue[]
      filteredItems = filteredItems.filter(item => value.indexOf(item) === -1)
    }
    const itemToString = this.props.itemToString || this.itemToString
    filteredItems = filteredItems.filter(
      item =>
        search && _.isFunction(search)
          ? search(filteredItems, searchQuery)
          : itemToString(item)
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) !== -1,
    )

    return filteredItems
  }

  private itemToString = (item: ShorthandValue): string => {
    if (!item) {
      return ''
    }
    if (typeof item === 'object') {
      return (item as any).header || ''
    }
    if (typeof item === 'string') {
      return item
    }
    return ''
  }

  private getA11yStatusMessage = ({
    isOpen,
    itemToString,
    previousResultCount,
    resultCount,
    selectedItem,
  }: DownshiftA11yStatusMessageOptions<ShorthandValue>) => {
    if (!isOpen) {
      return selectedItem ? itemToString(selectedItem) : ''
    }
    if (!resultCount) {
      return 'No results are available.'
    }
    if (resultCount !== previousResultCount) {
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

  private handleItemOverrides = (
    item: ShorthandValue,
    index: number,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue>) => any,
  ) => ({
    accessibilityItemProps: getItemProps({ item, index }),
  })

  private handleLabelOverrides = (predefinedProps: DropdownLabelProps, item: ShorthandValue) => ({
    onRemove: (e: React.SyntheticEvent, dropdownLabelProps: DropdownLabelProps) => {
      this.handleLabelRemove(e, item)
      _.invoke(predefinedProps, 'onRemove', e, dropdownLabelProps)
    },
    onClick: (e: React.SyntheticEvent, dropdownLabelProps: DropdownLabelProps) => {
      e.stopPropagation()
      _.invoke(predefinedProps, 'onClick', e, dropdownLabelProps)
    },
  })

  private handleSearchInputOverrides = (
    predefinedProps: DropdownSearchInputProps,
    highlightedIndex: number,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
    getRootProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getInputProps: (options?: GetInputPropsOptions) => any,
  ) => {
    const handleInputBlur = (
      e: React.SyntheticEvent,
      searchInputProps: DropdownSearchInputProps,
    ) => {
      this.setState({ focused: false })

      _.invoke(predefinedProps, 'onInputBlur', e, searchInputProps)
    }
    const handleInputKeyDown = (
      e: React.SyntheticEvent,
      searchInputProps: DropdownSearchInputProps,
    ) => {
      if (keyboardKey.getCode(e) === keyboardKey.Tab && highlightedIndex !== undefined) {
        selectItemAtIndex(highlightedIndex)
      }

      _.invoke(predefinedProps, 'onInputKeyDown', e, {
        ...searchInputProps,
        highlightedIndex,
        selectItemAtIndex,
      })
    }

    return {
      accessibilityInputProps: {
        ...getInputProps({
          onBlur: e => {
            handleInputBlur(e, predefinedProps)
          },
          onKeyDown: e => {
            handleInputKeyDown(e, predefinedProps)
          },
        }),
      },
      accessibilityWrapperProps: {
        ...getRootProps({ refKey: 'innerRef' }, { suppressRefError: true }),
      },
      onFocus: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        this.setState({ focused: true })

        _.invoke(predefinedProps, 'onFocus', e, searchInputProps)
      },
      ...(this.props.multiple && {
        onKeyUp: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
          if (keyboardKey.getCode(e) === keyboardKey.Backspace) {
            const { searchQuery, value, backspaceDelete } = this.state

            if (searchQuery === '' && (value as ShorthandValue[]).length > 0) {
              if (!backspaceDelete) {
                this.setState({ backspaceDelete: true })
              } else {
                this.removeFromValues()
              }
            }
          }

          _.invoke(predefinedProps, 'onKeyUp', e, searchInputProps)
        },
      }),
      onInputBlur: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        handleInputBlur(e, searchInputProps)
      },
      onInputKeyDown: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        handleInputKeyDown(e, searchInputProps)
      },
    }
  }

  private handleContainerClick = (isOpen: boolean, e: React.SyntheticEvent) => {
    !isOpen && this.inputNode.focus()
  }

  private handleSelectedChange = (item: ShorthandValue) => {
    const { multiple, getA11ySelectedMessage } = this.props
    const newValue = multiple ? [...(this.state.value as ShorthandValue[]), item] : item

    this.trySetState({
      value: newValue,
      searchQuery: '',
    })
    this.setA11yStatus(
      getA11ySelectedMessage
        ? getA11ySelectedMessage(item)
        : `${typeof item === 'object' ? (item as any).header : item} has been selected.`,
    )

    _.invoke(this.props, 'onSelectedChange', {}, { ...this.props, value: newValue })
  }

  private handleLabelRemove(e: React.SyntheticEvent, item: ShorthandValue) {
    this.removeFromValues(item)
    this.inputNode.focus()
    e.stopPropagation()
  }

  private removeFromValues(item?: ShorthandValue) {
    const { getA11yRemovedMessage } = this.props
    let value = this.state.value as ShorthandValue[]
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
        : `${
            typeof poppedItem === 'object' ? (poppedItem as any).header : poppedItem
          } has been removed.`,
    )

    _.invoke(this.props, 'onSelectedChange', {}, { ...this.props, value })
  }
}
