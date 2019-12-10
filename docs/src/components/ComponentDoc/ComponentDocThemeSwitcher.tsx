import * as React from 'react'
import { Dropdown } from '@fluentui/react'
import { ThemeContext, ThemeName } from 'docs/src/context/ThemeContext'

const getA11yStatusMessage = ({
  isOpen,
  itemToString,
  previousResultCount,
  resultCount,
  selectedItem,
}) => {
  if (!isOpen) {
    return selectedItem ? itemToString(selectedItem) : ''
  }
  if (!resultCount) {
    return 'No results are available.'
  }
  if (resultCount !== previousResultCount) {
    return `${resultCount} result${
      resultCount === 1 ? ' is' : 's are'
    } available, use up and down arrow keys to navigate. Press Enter key to select.`
  }
  return ''
}

const getA11ySelectionMessage = {
  onAdd: item => `${item} has been selected.`,
  onRemove: item => `${item} has been removed.`,
}

interface ComponentDocThemeSwitcherProps {
  excludeOptions?: ThemeName[]
}

const ComponentDocThemeSwitcher: React.FunctionComponent<ComponentDocThemeSwitcherProps> = props => (
  <ThemeContext.Consumer>
    {({ changeTheme, themeOptions, selectedTheme }) => (
      <Dropdown
        getA11yStatusMessage={getA11yStatusMessage}
        getA11ySelectionMessage={getA11ySelectionMessage}
        noResultsMessage="We couldn't find any matches."
        placeholder="Theme"
        value={selectedTheme}
        onSelectedChange={changeTheme}
        items={
          !props.excludeOptions
            ? themeOptions
            : themeOptions.filter(
                themeOption => props.excludeOptions.indexOf(themeOption.value) === -1,
              )
        }
      />
    )}
  </ThemeContext.Consumer>
)

export default ComponentDocThemeSwitcher
