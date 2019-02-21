import * as React from 'react'

const DivExample = () => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ flexBasis: '50px' }}>
      <div>Media</div>
    </div>

    <div style={{ flexGrow: 1 }}>
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <div>Header</div>
          </div>
          <div style={{ flexBasis: '30px' }}>
            <div>Media</div>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <div>Content</div>
          </div>
          <div style={{ flexBasis: '30px' }}>
            <div>Media</div>
          </div>
        </div>
      </div>
    </div>

    <div style={{ flexBasis: '50px' }}>
      <div>End Media</div>
    </div>
  </div>
)

export default DivExample
