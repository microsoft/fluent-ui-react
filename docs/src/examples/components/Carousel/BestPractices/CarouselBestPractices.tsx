import * as React from 'react'
import { Text, Box } from '@fluentui/react'
import { link } from '../../../../utils/helpers'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  <Text>
    'Add textual representation for `CarouselItem`. Use `aria-label` attribute ( refer to{' '}
    {link('reported issue', 'https://bugs.chromium.org/p/chromium/issues/detail?id=1040924')} for
    details).
  </Text>,
  'Provide  localized string of the "carousel" using `ariaRoleDescription` prop.',
  'Provide label to the carousel using `ariaLabel` prop.',
  <Box>
    If carousel contains `navigation`:
    <ul>
      <li> provide label to `navigation` and to navigation item using `aria-label` attribute</li>
      <li> add `aria-controls` attribute to navigation item referencing to `carouselItem` id </li>
    </ul>
  </Box>,
]

const CarouselBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />
}

export default CarouselBestPractices
