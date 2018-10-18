import * as React from 'react'
import { Header } from '@stardust-ui/react'
import AddFocusZone from './AddFocusZone'
import { Button } from 'semantic-ui-react'

class CsssGridPrototype extends React.Component<any, any> {
  render() {
    return (
      <div>
        <p>Use TAB to navigate through rows and left/right arrows to navigate within the row.</p>

        {this.grid('In order', ['area1', 'area2', 'area3'], ['area1', 'area2', 'area3'])}
        {this.grid(
          'Switched order (1-3-2)',
          ['area1', 'area2', 'area3'],
          ['area1', 'area3', 'area2'],
        )}
      </div>
    )
  }

  grid(title: string, domAreas: string[], templateAreas: string[]) {
    return (
      <>
        <Header as="h4">{title}</Header>
        <div>
          DOM: {domAreas.join('-')}, template {templateAreas.join('-')}
        </div>
        <AddFocusZone>
          <div
            style={{
              display: 'grid',
              gridTemplateAreas: `'${templateAreas.join(' ')}'`,
              gridTemplateColumns: templateAreas.map(a => '100 px').join(' '),
              gridTemplateRows: 'auto',
            }}
          >
            {this.buttons(domAreas)}
          </div>
        </AddFocusZone>
      </>
    )
  }

  buttons(areas: string[]) {
    return areas.map(area => (
      <div key={area} style={{ gridArea: area }}>
        <Button>{area}</Button>
      </div>
    ))
  }
}

export default CsssGridPrototype
