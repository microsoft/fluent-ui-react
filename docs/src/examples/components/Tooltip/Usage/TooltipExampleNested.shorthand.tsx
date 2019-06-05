import * as React from 'react'
import { Button, Tooltip } from '@stardust-ui/react'

const TooltipExampleNested = () => (
  <Tooltip
    content={{
      content: (
        <>
          <div>Hello from first tooltip!</div>
          <Tooltip
            content={{
              content: (
                <>
                  <div>Hello from second tooltip!</div>

                  <Tooltip
                    content="Hello from third tooltip!"
                    trigger={<Button content="Open third" />}
                  />
                </>
              ),
            }}
            trigger={<Button content="Open second" />}
          />
        </>
      ),
    }}
    trigger={<Button content="Open first" />}
  />
)

export default TooltipExampleNested
