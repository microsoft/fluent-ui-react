import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Flex, Divider } from '@stardust-ui/react'

type PageDescriptor = {
  name: string
  url: string
}

type GuidesNavigationFooterProps = {
  previous?: PageDescriptor
  next?: PageDescriptor
}

const GuidesNavigationFooter: React.FC<GuidesNavigationFooterProps> = ({ previous, next }) => (
  <>
    <br />
    <Divider size={1} />
    <br />
    <Flex gap="gap.small">
      {previous && (
        <Button
          as={NavLink}
          content={previous.name}
          icon="arrow left"
          iconPosition="before"
          primary
          to={previous.url}
        />
      )}
      {next && (
        <Button
          as={NavLink}
          content={next.name}
          icon="arrow right"
          iconPosition="after"
          primary
          to={next.url}
        />
      )}
    </Flex>
  </>
)

export default GuidesNavigationFooter
