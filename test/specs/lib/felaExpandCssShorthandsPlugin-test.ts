import felaExpandCssShorthandsPlugin from 'src/lib/felaExpandCssShorthandsPlugin'

const expandCssShorthands = felaExpandCssShorthandsPlugin()

describe('felaExpandCssShorthandsPlugin', () => {
  test('should expand one-word css prop', () => {
    const style = {
      display: 'block',
      margin: '0px 10px',
    }

    expect(expandCssShorthands(style)).toEqual({
      display: 'block',
      marginTop: '0px',
      marginRight: '10px',
      marginBottom: '0px',
      marginLeft: '10px',
    })
  })

  test('should expand two-words css prop', () => {
    const style = {
      borderColor: 'red',
    }

    expect(expandCssShorthands(style)).toEqual({
      borderTopColor: 'red',
      borderRightColor: 'red',
      borderBottomColor: 'red',
      borderLeftColor: 'red',
    })
  })

  test('should expand pseudo object', () => {
    const style = {
      display: 'block',
      '::before': {
        margin: '0px',
      },
    }

    expect(expandCssShorthands(style)).toEqual({
      display: 'block',
      '::before': {
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
      },
    })
  })

  test('should expand nested pseudo object', () => {
    const style = {
      display: 'block',
      '::before': {
        margin: '0px',
        ':hover': {
          padding: '10px',
        },
      },
    }

    expect(expandCssShorthands(style)).toEqual({
      display: 'block',
      '::before': {
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        ':hover': {
          paddingTop: '10px',
          paddingRight: '10px',
          paddingBottom: '10px',
          paddingLeft: '10px',
        },
      },
    })
  })
})
