import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  'Use `popupFocusTrapBehavior` if the focus needs to be trapped inside of the Popup.',
  "If Popup's content is lazy loaded and focus needs to be trapped inside - make sure to use state change to trigger `componentDidUpdate`, so the focus can be set correctly to the first tabbable element inside Popup or manually set focus to the element inside once content is loaded.",
  'Do set `trapFocus` if the focus needs to be trapped inside of the Popup.',
  'Beware of using `autoFocus` as it just grabs focus and do not traps it. User is able to tab out from popup, so consider to use `inline` prop to save a correct tab order.',
]

const dontList = [
  "Don't use `trapFocus` for `inline` popup, as it leads to broken behavior for screen reader users.",
]

const PopupBestPractices = () => {
  return <ComponentBestPractices doList={doList} dontList={dontList} />
}

export default PopupBestPractices
