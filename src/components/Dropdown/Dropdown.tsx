import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { Extendable, ShorthandValue, ShorthandRenderFunction } from '../../../types/utils'
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
import { AutoControlledComponent, RenderResultConfig, customPropTypes } from '../../lib'
import keyboardKey from 'keyboard-key'
import List from '../List/List'
import Text from '../Text/Text'
import Icon from '../Icon/Icon'
import { commonUIComponentPropTypes } from '../../lib/commonPropTypes'
import Ref from '../Ref/Ref'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import DropdownItem from './DropdownItem'
import DropdownLabel, { DropdownLabelProps } from './DropdownLabel'
import DropdownSearchInput from './DropdownSearchInput'
import { DropdownSearchInputProps } from 'semantic-ui-react'

// To be replaced when Downshift will add highlightedItem in their interface.
export interface DownshiftA11yStatusMessageOptions<Item> extends A11yStatusMessageOptions<Item> {
  highlightedItem: Item
}

export interface DropdownProps extends UIComponentProps<any, any> {
  /** The default value for the search query. */
  defaultSearchQuery?: string

  /** The default value for the dropdown. */
  defaultValue?: ShorthandValue | ShorthandValue[]

  /** A dropdown can take the full width of its container. */
  fluid?: boolean

  /**
   * A function that creates custom accessability message for dropdown status.
   * @param {Object} messageGenerationProps - Object with properties to generate message from. See getA11yStatusMessage from Downshift repo.
   */
  getA11yStatusMessage?: (options: DownshiftA11yStatusMessageOptions<ShorthandValue>) => string

  /**
   * A function that creates custom accessability message for dropdown item selection.
   * @param {DropdownListItem} item - Dropdown selected element.
   */
  getA11ySelectedMessage?: (item: ShorthandValue) => string

  /** A function that creates custom accessability message for dropdown item removal.
   * @param {ShorthandValue} item - Dropdown removed element.
   */
  getA11yRemovedMessage?: (item: ShorthandValue) => string

  /** Array of props for generating dropdown items and selected item labels if multiple selection. */
  items?: ShorthandValue[]

  /**
   * Function to be passed to create selected searchQuery from selected item. It will be displayed on selection in the
   * edit text, for search, or on the button, for non-search. Multiple search will always clear searchQuery on selection.
   */
  itemToString?: (item: ShorthandValue) => string

  /** A dropdown can perform a multiple selection. */
  multiple?: boolean

  /** A string to be displayed when dropdown does not have available items to show. */
  noResultsMessage?: string

  /**
   * Callback for change in dropdown active value(s).
   * @param {ShorthandValue|ShorthandValue[]} value - Dropdown active value(s).
   */
  onDropdownChange?: (value: ShorthandValue | ShorthandValue[]) => any

  /**
   * Callback for change in dropdown search query value.
   * @param {string} searchQuery - The new value in the search field.
   */
  onSearchQueryChange?: (searchQuery: string) => any

  /** A message to serve as placeholder. */
  placeholder?: string

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderItem?: ShorthandRenderFunction

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderLabel?: ShorthandRenderFunction

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderSearchInput?: ShorthandRenderFunction

  /** A dropdown can have a search field instead of trigger button. */
  search?: boolean

  /** Shorthand for the edit text that has the search query, if dropdown is also a search. */
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
    ...commonUIComponentPropTypes,
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
    onDropdownChange: PropTypes.func,
    onSearchQueryChange: PropTypes.func,
    placeholder: PropTypes.string,
    renderItem: PropTypes.func,
    renderLabel: PropTypes.func,
    renderSearchInput: PropTypes.func,
    search: PropTypes.bool,
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
          onChange={this.handleChange}
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
    getRootProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getInputProps: (options?: GetInputPropsOptions) => any,
    highlightedIndex: number,
    selectItemAtIndex: (
      index: number,
      otherStateToSet?: Partial<StateChangeOptions<any>>,
      cb?: () => void,
    ) => void,
  ): JSX.Element {
    const { searchInput, renderSearchInput, multiple, placeholder, variables } = this.props
    const { searchQuery, value } = this.state
    const shouldHavePlaceholder =
      searchQuery.length > 0 || (multiple && (value as ShorthandValue[]).length > 0)

    return DropdownSearchInput.create(searchInput || {}, {
      defaultProps: {
        placeholder: shouldHavePlaceholder ? '' : placeholder,
        inputRef: inputNode => {
          this.inputNode = inputNode
        },
        variables,
      },
      overrideProps: predefinedProps =>
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
    if (items.length > 0) {
      return items.map((item, index) => {
        let itemAsListItem = item
        if (typeof item === 'object') {
          itemAsListItem = _.pickBy(item, (value, key) =>
            _.includes(['key', ...DropdownItem.handledProps], key),
          )
        }
        const downshiftItemProps = getItemProps({ index, item })
        return DropdownItem.create(itemAsListItem, {
          defaultProps: {
            highlighted: highlightedIndex === index,
            variables,
            ...(typeof item === 'object' &&
              !item.hasOwnProperty('key') && {
                key: (item as any).header,
              }),
            ...downshiftItemProps,
          },
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
        overrideProps: predefinedProps => ({
          onRemove: (e: React.SyntheticEvent, dropdownLabelProps: DropdownLabelProps) => {
            this.handleLabelRemove(e, item)
            _.invoke(predefinedProps, 'onRemove', e, dropdownLabelProps)
          },
          onClick: (e: React.SyntheticEvent, dropdownLabelProps: DropdownLabelProps) => {
            e.stopPropagation()
            _.invoke(predefinedProps, 'onClick', e, dropdownLabelProps)
          },
        }),
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
        _.invoke(this.props, 'onSearchQueryChange', changes.inputValue)
        return changes
      default:
        return changes
    }
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
    highlightedItem,
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
  ) => ({
    getAccessibilityRootProps: (
      options?: GetMenuPropsOptions,
      otherOptions?: GetPropsCommonOptions,
    ) => {
      return {
        ...getRootProps(options, otherOptions),
        ..._.invoke(predefinedProps, 'getAccessibilityRootProps', options, otherOptions),
      }
    },
    getAccessibilityInputProps: (options?: GetInputPropsOptions) => {
      return {
        ...getInputProps(options),
        ..._.invoke(predefinedProps, 'getAccessibilityInputProps', options),
      }
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
              this.removeFromActiveValues()
            }
          }
        }

        _.invoke(predefinedProps, 'onKeyUp', e, searchInputProps)
      },
    }),
    onInputBlur: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
      this.setState({ focused: false })

      _.invoke(predefinedProps, 'onInputBlur', e, searchInputProps)
    },
    onInputKeyDown: (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
      if (keyboardKey.getCode(e) === keyboardKey.Tab && highlightedIndex !== undefined) {
        selectItemAtIndex(highlightedIndex)
      }

      _.invoke(predefinedProps, 'onInputKeyDown', e, {
        ...searchInputProps,
        highlightedIndex,
        selectItemAtIndex,
      })
    },
  })

  private handleContainerClick = (isOpen: boolean, e: React.SyntheticEvent) => {
    !isOpen && this.inputNode.focus()
  }

  private handleChange = (item: ShorthandValue) => {
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

    _.invoke(this.props, 'onDropdownChange', newValue)
  }

  private handleLabelRemove(e: React.SyntheticEvent, item: ShorthandValue) {
    this.removeFromActiveValues(item)
    this.inputNode.focus()
    e.stopPropagation()
  }

  private removeFromActiveValues(item?: ShorthandValue) {
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

    _.invoke(this.props, 'onDropdownChange', value)
  }
}
