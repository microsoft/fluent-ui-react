import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'

const AccessibilityDescription: React.FunctionComponent<{ value: string }> = ({ value }) => (
  <ReactMarkdown source={value} />
)

export default AccessibilityDescription
