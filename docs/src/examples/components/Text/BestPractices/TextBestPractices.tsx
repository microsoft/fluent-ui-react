import * as React from 'react'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  {
    key: 'one',
    content:
      'Ensure that a contrast ratio of at least 4.5:1 exists between text and the background behind the text.',
  },
  {
    key: 'two',
    content:
      'To ensure that RTL mode will be properly handled for provided `content` value, ensure that `content` is provided as plain string (then dir="auto" attribute will be applied automatically).',
  },
  {
    key: 'three',
    content:
      'For other `content` value types (i.e. that use elements inside), in order to properly jandle RTL mode, ensure that dir="auto" attribute is applied for all places in content where necessary.',
  },
]

const TextBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default TextBestPractices
