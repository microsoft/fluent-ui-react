import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import cx from 'classnames'

import {
  Extendable,
  ShorthandRenderFunction,
  ShorthandValue,
  ComponentEventHandler,
} from '../../types'
import { ComponentSlotStylesInput, ComponentVariablesInput } from '../../themes/types'
import Downshift, {
  DownshiftState,
  StateChangeOptions,
  A11yStatusMessageOptions as DownshiftA11yStatusMessageOptions,
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
  handleRef,
  UIComponentProps,
} from '../../lib'
import keyboardKey from 'keyboard-key'
import Indicator from '../Indicator/Indicator'
import List from '../List/List'
import Ref from '../Ref/Ref'
import DropdownItem from './DropdownItem'
import DropdownSelectedItem, { DropdownSelectedItemProps } from './DropdownSelectedItem'
import DropdownSearchInput, { DropdownSearchInputProps } from './DropdownSearchInput'
import Button from '../Button/Button'
import { screenReaderContainerStyles } from '../../lib/accessibility/Styles/accessibilityStyles'
import ListItem from '../List/ListItem'

export interface DropdownSlotClassNames {
  container: string
  triggerButton: string
  itemsList: string
  selectedItems: string
}

export interface DropdownProps extends UIComponentProps<DropdownProps, DropdownState> {
  /** The index of the currently active selected item, if dropdown has a multiple selection. */
  activeIndex?: number

  /** The initial value for the index of the currently active selected item, in a multiple selection. */
  defaultActiveIndex?: number

  /** The initial value for the search query, if the dropdown is also a search. */
  defaultSearchQuery?: string

  /** The initial value or value array, if the array has multiple selection. */
  defaultValue?: ShorthandValue | ShorthandValue[]

  /** A dropdown can take the width of its container. */
  fluid?: boolean

  /** Object with callbacks for creating announcements on multiple selection add and remove actions. */
  getA11ySelectionMessage?: {
    /**
     * Callback that creates custom accessibility message a screen reader narrates on item added to selection.
     * @param {ShorthandValue} item - Dropdown added element.
     */
    onAdd?: (item: ShorthandValue) => string
    /**
     * Callback that creates custom accessibility message a screen reader narrates on item removed from selection.
     * @param {ShorthandValue} item - Dropdown removed element.
     */
    onRemove?: (item: ShorthandValue) => string
  }

  /**
   * Callback that creates custom accessability message for dropdown status change. Involves changes in highlighted item in the list, selection, toggle status.
   * @param {DownshiftA11yStatusMessageOptions<ShorthandValue>} messageGenerationProps - Object with properties to generate message from. See getA11yStatusMessage from Downshift repo.
   */
  getA11yStatusMessage?: (options: DownshiftA11yStatusMessageOptions<ShorthandValue>) => string

  /** Array of props for generating list options (Dropdown.Item[]) and selected item labels(Dropdown.SelectedItem[]), if it's a multiple selection. */
  items?: ShorthandValue[]

  /**
   * Function to be passed to create string from selected item, if it's a shorthand object. Used when dropdown also has a search function.
   */
  itemToString?: (item: ShorthandValue) => string

  /** A dropdown can show that it is currently loading data. */
  loading?: boolean

  /** A message to be displayed in the list when dropdown is loading. */
  loadingMessage?: ShorthandValue

  /** A dropdown can perform a multiple selection. */
  multiple?: boolean

  /** A message to be displayed in the list when dropdown has no available items to show. */
  noResultsMessage?: ShorthandValue

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

  /** A placeholder message for the input field. */
  placeholder?: string

  /**
   * A custom render function for the item.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderItem?: ShorthandRenderFunction

  /**
   * A custom render function for the selected item.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderSelectedItem?: ShorthandRenderFunction

  /** A dropdown can have a search field instead of trigger button. Can receive a custom search function that will replace the default equivalent. */
  search?: boolean | ((items: ShorthandValue[], searchQuery: string) => ShorthandValue[])

  /** Component for the search input query. */
  searchInput?: ShorthandValue

  /** Sets search query value (controlled mode). */
  searchQuery?: string

  /** Controls appearance of toggle indicator that shows/hides items list. */
  toggleIndicator?: ShorthandValue

  /** Controls appearance of the trigger button if it's a selection dropdown and not a search. */
  triggerButton?: ShorthandValue

  /** Sets currently selected value(s) (controlled mode). */
  value?: ShorthandValue | ShorthandValue[]
}

export interface DropdownState {
  isOpen?: boolean
  value: ShorthandValue | ShorthandValue[]
  activeIndex: number
  backspaceDelete: boolean
  focused: boolean
  searchQuery?: string
  defaultHighlightedIndex: number
}

/**
 * Dropdown allows user to select one or more values from a list of items.
 * Can also be created with search capability.
 * @accessibility
 * Implements ARIA collapsible Listbox design pattern, uses aria-live to announce state changes.
 */
class Dropdown extends AutoControlledComponent<Extendable<DropdownProps>, DropdownState> {
  private buttonRef = React.createRef<HTMLElement>()
  private inputRef = React.createRef<HTMLElement>()
  private listRef = React.createRef<HTMLElement>()
  private selectedItemsRef = React.createRef<HTMLDivElement>()

  static displayName = 'Dropdown'

  static className = 'ui-dropdown'

  static slotClassNames: DropdownSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    activeIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    defaultSearchQuery: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      customPropTypes.collectionShorthand,
    ]),
    fluid: PropTypes.bool,
    getA11ySelectionMessage: PropTypes.object,
    getA11yStatusMessage: PropTypes.func,
    items: customPropTypes.collectionShorthand,
    itemToString: PropTypes.func,
    loading: PropTypes.bool,
    loadingMessage: customPropTypes.itemShorthand,
    multiple: PropTypes.bool,
    noResultsMessage: customPropTypes.itemShorthand,
    onSearchQueryChange: PropTypes.func,
    onSelectedChange: PropTypes.func,
    placeholder: PropTypes.string,
    renderItem: PropTypes.func,
    renderSelectedItem: PropTypes.func,
    search: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    searchQuery: PropTypes.string,
    searchInput: customPropTypes.itemShorthand,
    toggleIndicator: customPropTypes.itemShorthand,
    triggerButton: customPropTypes.itemShorthand,
    value: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      customPropTypes.collectionShorthand,
    ]),
  }

  static defaultProps: DropdownProps = {
    as: 'div',
    itemToString: item => {
      if (!item || React.isValidElement(item)) {
        return ''
      }

      // targets DropdownItem shorthand objects
      return (item as any).header || String(item)
    },
    toggleIndicator: {},
    triggerButton: {},
  }

  static autoControlledProps = ['activeIndex', 'searchQuery', 'value']

  static Item = DropdownItem
  static SearchInput = DropdownSearchInput
  static SelectedItem = DropdownSelectedItem

  getInitialAutoControlledState({ multiple, search }: DropdownProps): DropdownState {
    return {
      activeIndex: multiple ? null : undefined,
      // prevent deletion of last character + last selected value at the same time on backspace.
      backspaceDelete: multiple,
      focused: false,
      searchQuery: search ? '' : undefined,
      value: multiple ? [] : null,
      // used on single selection to open the dropdown with the selected option as highlighted.
      defaultHighlightedIndex: this.props.multiple ? undefined : null,
    }
  }

  public renderComponent({
    ElementType,
    classes,
    styles,
    variables,
    unhandledProps,
    rtl,
  }: RenderResultConfig<DropdownProps>) {
    const { search, multiple, getA11yStatusMessage, itemToString, toggleIndicator } = this.props
    const { defaultHighlightedIndex, searchQuery } = this.state

    return (
      <ElementType className={classes.root} {...unhandledProps}>
        <Downshift
          onChange={this.handleSelectedChange}
          inputValue={search ? searchQuery : null}
          stateReducer={this.handleDownshiftStateChanges}
          itemToString={itemToString}
          selectedItem={null}
          getA11yStatusMessage={getA11yStatusMessage}
          defaultHighlightedIndex={defaultHighlightedIndex}
          onStateChange={this.handleStateChange}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            getRootProps,
            getToggleButtonProps,
            isOpen,
            toggleMenu,
            highlightedIndex,
            selectItemAtIndex,
          }) => {
            const { innerRef, ...accessibilityRootPropsRest } = getRootProps(
              { refKey: 'innerRef' },
              { suppressRefError: true },
            )
            return (
              <Ref innerRef={innerRef}>
                <div
                  className={cx(Dropdown.slotClassNames.container, classes.container)}
                  onClick={search && !isOpen ? this.handleContainerClick : undefined}
                >
                  <div
                    ref={this.selectedItemsRef}
                    className={cx(Dropdown.slotClassNames.selectedItems, classes.selectedItems)}
                  >
                    {multiple && this.renderSelectedItems(variables, rtl)}
                    {search
                      ? this.renderSearchInput(
                          accessibilityRootPropsRest,
                          rtl,
                          highlightedIndex,
                          getInputProps,
                          selectItemAtIndex,
                          variables,
                        )
                      : this.renderTriggerButton(styles, rtl, getToggleButtonProps)}
                  </div>
                  {Indicator.create(toggleIndicator, {
                    defaultProps: {
                      direction: isOpen ? 'top' : 'bottom',
                      onClick: getToggleButtonProps().onClick,
                      styles: styles.toggleIndicator,
                    },
                  })}
                  {this.renderItemsList(
                    styles,
                    variables,
                    isOpen,
                    highlightedIndex,
                    toggleMenu,
                    selectItemAtIndex,
                    getMenuProps,
                    getItemProps,
                    getInputProps,
                  )}
                </div>
              </Ref>
            )
          }}
        </Downshift>
      </ElementType>
    )
  }

  private renderTriggerButton(
    styles: ComponentSlotStylesInput,
    rtl: boolean,
    getToggleButtonProps: (options?: GetToggleButtonPropsOptions) => any,
  ): JSX.Element {
    const content = this.getSelectedItemAsString(this.state.value)

    return (
      <Ref innerRef={this.buttonRef}>
        {Button.create(this.props.triggerButton, {
          defaultProps: {
            className: Dropdown.slotClassNames.triggerButton,
            content,
            fluid: true,
            styles: styles.triggerButton,
            ...getToggleButtonProps({
              onFocus: () => {
                this.setState({ focused: true })
              },
              onBlur: () => {
                this.setState({ focused: false })
              },
              onKeyDown: e => {
                this.handleTriggerButtonKeyDown(e, rtl)
              },
              'aria-label': content,
            }),
          },
        })}
      </Ref>
    )
  }

  private renderSearchInput(
    accessibilityComboboxProps: Object,
    rtl: boolean,
    highlightedIndex: number,
    getInputProps: (options?: GetInputPropsOptions) => any,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
    variables,
  ): JSX.Element {
    const { searchInput, multiple, placeholder } = this.props
    const { searchQuery, value } = this.state

    const noPlaceholder =
      searchQuery.length > 0 || (multiple && (value as ShorthandValue[]).length > 0)

    return DropdownSearchInput.create(searchInput || {}, {
      defaultProps: {
        placeholder: noPlaceholder ? '' : placeholder,
        variables,
        inputRef: this.inputRef,
      },
      overrideProps: (predefinedProps: DropdownSearchInputProps) =>
        this.handleSearchInputOverrides(
          predefinedProps,
          highlightedIndex,
          rtl,
          selectItemAtIndex,
          accessibilityComboboxProps,
          getInputProps,
        ),
    })
  }

  private renderItemsList(
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
    isOpen: boolean,
    highlightedIndex: number,
    toggleMenu: () => void,
    selectItemAtIndex: (index: number) => void,
    getMenuProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue>) => any,
    getInputProps: (options?: GetInputPropsOptions) => any,
  ) {
    const { search } = this.props
    const { innerRef, ...accessibilityMenuProps } = getMenuProps(
      { refKey: 'innerRef' },
      { suppressRefError: true },
    )

    // If it's just a selection, some attributes and listeners from Downshift input need to go on the menu list.
    if (!search) {
      const accessibilityInputProps = getInputProps()

      accessibilityMenuProps['aria-activedescendant'] =
        accessibilityInputProps['aria-activedescendant']
      accessibilityMenuProps['onKeyDown'] = e => {
        this.handleListKeyDown(
          e,
          highlightedIndex,
          accessibilityInputProps['onKeyDown'],
          toggleMenu,
          selectItemAtIndex,
        )
      }
    }

    return (
      <Ref
        innerRef={(listElement: HTMLElement) => {
          handleRef(this.listRef, listElement)
          handleRef(innerRef, listElement)
        }}
      >
        <List
          className={Dropdown.slotClassNames.itemsList}
          {...accessibilityMenuProps}
          styles={styles.list}
          tabIndex={search ? undefined : -1} // needs to be focused when trigger button is activated.
          aria-hidden={!isOpen}
          items={isOpen ? this.renderItems(styles, variables, getItemProps, highlightedIndex) : []}
        />
      </Ref>
    )
  }

  private renderItems(
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue>) => any,
    highlightedIndex: number,
  ) {
    const { loading, loadingMessage, noResultsMessage, renderItem } = this.props
    const filteredItems = this.getItemsFilteredBySearchQuery()

    const items = _.map(filteredItems, (item, index) =>
      DropdownItem.create(item, {
        defaultProps: {
          active: highlightedIndex === index,
          variables,
          ...(typeof item === 'object' &&
            !item.hasOwnProperty('key') && {
              key: (item as any).header,
            }),
        },
        overrideProps: () => this.handleItemOverrides(item, index, getItemProps),
        render: renderItem,
      }),
    )

    return [
      ...items,
      loading &&
        ListItem.create(loadingMessage, {
          defaultProps: {
            key: 'loading-message',
            styles: styles.loadingMessage,
          },
        }),
      !loading &&
        items.length === 0 &&
        ListItem.create(noResultsMessage, {
          key: 'no-results-message',
          styles: styles.noResultsMessage,
        }),
    ]
  }

  private renderSelectedItems(variables, rtl: boolean) {
    const { renderSelectedItem } = this.props
    const value = this.state.value as ShorthandValue[]

    if (value.length === 0) {
      return null
    }

    return value.map((item, index) =>
      DropdownSelectedItem.create(item, {
        defaultProps: {
          active: this.isSelectedItemActive(index),
          variables,
          ...(typeof item === 'object' &&
            !item.hasOwnProperty('key') && {
              key: (item as any).header,
            }),
        },
        overrideProps: (predefinedProps: DropdownSelectedItemProps) =>
          this.handleSelectedItemOverrides(predefinedProps, item, rtl),
        render: renderSelectedItem,
      }),
    )
  }

  private handleDownshiftStateChanges = (
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
          {}, // we don't have event for it, but want to keep the event handling interface, event is empty.
          { ...this.props, searchQuery: changes.inputValue },
        )
        return changes
      case Downshift.stateChangeTypes.blurButton:
        // Downshift closes the list by default on trigger blur. It does not support the case when dropdown is
        // single selection and focuses list on trigger click/up/down/space/enter. Treating that here.
        if (state.isOpen && document.activeElement === this.listRef.current) {
          return {} // won't change state in this case.
        }
      default:
        return changes
    }
  }

  private handleStateChange = (changes: StateChangeOptions<ShorthandValue>) => {
    if (changes.isOpen !== undefined && changes.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: changes.isOpen })
    }

    if (changes.isOpen && !this.props.search) {
      this.listRef.current.focus()
    }
  }

  private getItemsFilteredBySearchQuery = (): ShorthandValue[] => {
    const { items, itemToString, multiple, search } = this.props
    const { searchQuery, value } = this.state
    const filteredItems = multiple ? _.difference(items, value as ShorthandValue[]) : items

    if (search) {
      if (_.isFunction(search)) {
        return search(filteredItems, searchQuery)
      }

      return filteredItems.filter(
        item =>
          itemToString(item)
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) !== -1,
      )
    }

    return filteredItems
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
      Object.assign(statusDiv.style, screenReaderContainerStyles)
      document.body.appendChild(statusDiv)
    }

    statusDiv.textContent = statusMessage
  }

  private isSelectedItemActive = (index: number): boolean => {
    return index === this.state.activeIndex
  }

  private handleItemOverrides = (
    item: ShorthandValue,
    index: number,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue>) => any,
  ) => ({ accessibilityItemProps: getItemProps({ item, index }) })

  private handleSelectedItemOverrides = (
    predefinedProps: DropdownSelectedItemProps,
    item: ShorthandValue,
    rtl: boolean,
  ) => ({
    onRemove: (e: React.SyntheticEvent, DropdownSelectedItemProps: DropdownSelectedItemProps) => {
      this.handleSelectedItemRemove(e, item, predefinedProps, DropdownSelectedItemProps)
    },
    onClick: (e: React.SyntheticEvent, DropdownSelectedItemProps: DropdownSelectedItemProps) => {
      const { value } = this.state as { value: ShorthandValue[] }
      this.trySetState({
        activeIndex: value.indexOf(item),
      })
      e.stopPropagation()
      _.invoke(predefinedProps, 'onClick', e, DropdownSelectedItemProps)
    },
    onKeyDown: (e: React.SyntheticEvent, DropdownSelectedItemProps: DropdownSelectedItemProps) => {
      this.handleSelectedItemKeyDown(e, item, predefinedProps, DropdownSelectedItemProps, rtl)
    },
  })

  private handleSearchInputOverrides = (
    predefinedProps: DropdownSearchInputProps,
    highlightedIndex: number,
    rtl: boolean,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
    accessibilityComboboxProps: Object,
    getInputProps: (options?: GetInputPropsOptions) => any,
  ) => {
    const { multiple } = this.props
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
      switch (keyboardKey.getCode(e)) {
        case keyboardKey.Tab:
          if (!_.isNil(highlightedIndex)) {
            selectItemAtIndex(highlightedIndex)
          }
          break
        case keyboardKey.ArrowLeft:
          if (!rtl) {
            this.setActiveIndexToLastSelectedItem()
          }
          break
        case keyboardKey.ArrowRight:
          if (rtl) {
            this.setActiveIndexToLastSelectedItem()
          }
          break
        case keyboardKey.Backspace:
          const { searchQuery, value, backspaceDelete } = this.state

          if (multiple && searchQuery === '' && (value as ShorthandValue[]).length > 0) {
            if (backspaceDelete) {
              this.removeItemFromValue()
            } else {
              this.setState({ backspaceDelete: true })
            }
          }
          break
        default:
          break
      }

      _.invoke(predefinedProps, 'onInputKeyDown', e, {
        ...searchInputProps,
        highlightedIndex,
        selectItemAtIndex,
      })
    }

    return {
      // getInputProps adds Downshift handlers. We also add our own by passing them as params to that function.
      // user handlers were also added to our handlers previously, at the beginning of this function.
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
      // same story as above for getRootProps.
      accessibilityComboboxProps,
      onFocus: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        this.setState({ focused: true })

        _.invoke(predefinedProps, 'onFocus', e, searchInputProps)
      },
      onInputBlur: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        handleInputBlur(e, searchInputProps)
      },
      onInputKeyDown: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        handleInputKeyDown(e, searchInputProps)
      },
    }
  }

  private setActiveIndexToLastSelectedItem = () => {
    const { value } = this.state as { value: ShorthandValue[] }
    if (this.props.multiple && value.length > 0) {
      this.trySetState({ activeIndex: value.length - 1 })
    }
  }

  private handleContainerClick = () => {
    this.tryFocusSearchInput()
  }

  private handleTriggerButtonKeyDown = (e: React.SyntheticEvent, rtl: boolean) => {
    switch (keyboardKey.getCode(e)) {
      case keyboardKey.ArrowLeft:
        if (!rtl) {
          this.setActiveIndexToLastSelectedItem()
        }
        break
      case keyboardKey.ArrowRight:
        if (rtl) {
          this.setActiveIndexToLastSelectedItem()
        }
        break
      default:
        break
    }
  }

  private handleListKeyDown = (
    e: React.SyntheticEvent,
    highlightedIndex: number,
    accessibilityInputPropsKeyDown: (e) => any,
    toggleMenu: () => void,
    selectItemAtIndex: (index: number) => void,
  ) => {
    switch (keyboardKey.getCode(e)) {
      case keyboardKey.Tab:
        if (_.isNil(highlightedIndex)) {
          toggleMenu()
        } else {
          selectItemAtIndex(highlightedIndex)
        }
        return
      case keyboardKey.Escape:
        accessibilityInputPropsKeyDown(e)
        this.tryFocusTriggerButton()
        return
      default:
        accessibilityInputPropsKeyDown(e)
        return
    }
  }

  private handleSelectedChange = (item: ShorthandValue) => {
    const { items, multiple, getA11ySelectionMessage } = this.props
    const newState = {
      value: multiple ? [...(this.state.value as ShorthandValue[]), item] : item,
      searchQuery: this.getSelectedItemAsString(item),
    }

    this.trySetState(newState)

    if (!multiple) {
      this.setState({ defaultHighlightedIndex: items.indexOf(item) })
    }

    if (getA11ySelectionMessage && getA11ySelectionMessage.onAdd) {
      this.setA11yStatus(getA11ySelectionMessage.onAdd(item))
    }

    if (multiple) {
      setTimeout(
        () =>
          (this.selectedItemsRef.current.scrollTop = this.selectedItemsRef.current.scrollHeight),
        0,
      )
    }

    this.tryFocusTriggerButton()

    // we don't have event for it, but want to keep the event handling interface, event is empty.
    _.invoke(this.props, 'onSelectedChange', {}, { ...this.props, ...newState })
  }

  private handleSelectedItemKeyDown(
    e: React.SyntheticEvent,
    item: ShorthandValue,
    predefinedProps: DropdownSelectedItemProps,
    DropdownSelectedItemProps: DropdownSelectedItemProps,
    rtl: boolean,
  ) {
    const { activeIndex, value } = this.state as { activeIndex: number; value: ShorthandValue[] }
    const previousKey = rtl ? keyboardKey.ArrowRight : keyboardKey.ArrowLeft
    const nextKey = rtl ? keyboardKey.ArrowLeft : keyboardKey.ArrowRight

    switch (keyboardKey.getCode(e)) {
      case keyboardKey.Delete:
      case keyboardKey.Backspace:
        this.handleSelectedItemRemove(e, item, predefinedProps, DropdownSelectedItemProps)
        break
      case previousKey:
        if (value.length > 0 && !_.isNil(activeIndex) && activeIndex > 0) {
          this.trySetState({
            activeIndex: activeIndex - 1,
          })
        }
        break
      case nextKey:
        if (value.length > 0 && !_.isNil(activeIndex)) {
          if (activeIndex < value.length - 1) {
            this.trySetState({
              activeIndex: activeIndex + 1,
            })
          } else {
            this.trySetState({
              activeIndex: null,
            })
            if (this.props.search) {
              this.inputRef.current.focus()
            } else {
              this.buttonRef.current.focus()
            }
          }
        }
        break
      default:
        break
    }
    _.invoke(predefinedProps, 'onKeyDown', e, DropdownSelectedItemProps)
  }

  private handleSelectedItemRemove(
    e: React.SyntheticEvent,
    item: ShorthandValue,
    predefinedProps: DropdownSelectedItemProps,
    DropdownSelectedItemProps: DropdownSelectedItemProps,
  ) {
    this.trySetState({
      activeIndex: null,
    })
    this.removeItemFromValue(item)
    this.tryFocusSearchInput()
    this.tryFocusTriggerButton()
    e.stopPropagation()
    _.invoke(predefinedProps, 'onRemove', e, DropdownSelectedItemProps)
  }

  private removeItemFromValue(item?: ShorthandValue) {
    const { getA11ySelectionMessage } = this.props
    let value = this.state.value as ShorthandValue[]
    let poppedItem = item

    if (poppedItem) {
      value = value.filter(currentElement => currentElement !== item)
    } else {
      poppedItem = value.pop()
    }

    this.trySetState({ value })

    if (getA11ySelectionMessage && getA11ySelectionMessage.onRemove) {
      this.setA11yStatus(getA11ySelectionMessage.onRemove(poppedItem))
    }

    // we don't have event for it, but want to keep the event handling interface, event is empty.
    _.invoke(this.props, 'onSelectedChange', {}, { ...this.props, value })
  }

  private tryFocusTriggerButton = () => {
    if (!this.props.search) {
      this.buttonRef.current.focus()
    }
  }

  private tryFocusSearchInput = () => {
    if (this.props.search) {
      this.inputRef.current.focus()
    }
  }

  /**
   * If there is no value we use the placeholder value
   * otherwise, for single selection we convert the value with itemToString
   * and for multiple selection we return empty string, the values are rendered by renderSelectedItems
   */
  private getSelectedItemAsString = (value: ShorthandValue): string => {
    const { itemToString, multiple, placeholder } = this.props
    const isValueEmpty = _.isArray(value) ? value.length < 1 : !value

    if (isValueEmpty) {
      return placeholder
    }

    if (multiple) {
      return ''
    }

    return itemToString(value)
  }
}

Dropdown.slotClassNames = {
  container: `${Dropdown.className}__container`,
  triggerButton: `${Dropdown.className}__trigger-button`,
  itemsList: `${Dropdown.className}__items-list`,
  selectedItems: `${Dropdown.className}__selected-items`,
}

export default Dropdown
