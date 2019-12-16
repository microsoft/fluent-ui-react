import { getClassName } from './compose'
import { ClassCache } from './ClassCache'

describe('compose', () => {
  describe('getClassName', () => {
    it('returns nothing in the default case', () => {
      expect(getClassName(new ClassCache(), {}, {}, '')).toEqual({})
    })

    it('returns classNames for a single slot', () => {
      expect(getClassName(new ClassCache(), {}, {}, '')).toEqual({})
    })

    it('returns customized classNames for a single slot', () => {
      const cssRenderer = (args: any) => {
        if (args.background === '#fff') {
          return 'correct'
        }
        return 'incorrect'
      }
      expect(
        getClassName(
          new ClassCache(),
          {
            components: {
              foo: {
                variants: {
                  primary: {
                    true: {
                      root: {
                        background: '#fff',
                      },
                    },
                  },
                },
              },
            },
          },
          { primary: true },
          'foo',
          cssRenderer,
        ),
      ).toEqual({ root: 'correct' })
    })

    it('returns customized classNames for a single slot when multiple variants are specified', () => {
      const cssRenderer = (args: any) => {
        if (args.background === '#fff' && args.color === '#000') {
          return 'correct'
        }
        return 'incorrect'
      }
      expect(
        getClassName(
          new ClassCache(),
          {
            components: {
              foo: {
                variants: {
                  primary: {
                    true: {
                      root: {
                        background: '#fff',
                      },
                    },
                  },
                  disabled: {
                    true: {
                      root: {
                        color: '#000',
                      },
                    },
                  },
                },
              },
            },
          },
          { primary: true, disabled: true },
          'foo',
          cssRenderer,
        ),
      ).toEqual({ root: 'correct' })
    })

    it('returns customized classNames for ennumerated variants', () => {
      const cssRenderer = (args: any) => {
        if (args.background === '#fff') {
          return 'correct'
        }
        return 'incorrect'
      }
      expect(
        getClassName(
          new ClassCache(),
          {
            components: {
              foo: {
                variants: {
                  primary: {
                    very: {
                      root: {
                        background: '#fff',
                      },
                    },
                  },
                },
              },
            },
          },
          { primary: 'very' },
          'foo',
          cssRenderer,
        ),
      ).toEqual({ root: 'correct' })
    })
  })

  describe('caching', () => {
    it('uses the cache for a simple variant', () => {
      let counter = 0
      const cssRenderer = (args: any) => `class-${counter++}`
      const theme = {
        components: {
          foo: {
            variants: {
              primary: {
                true: {
                  root: {
                    background: '#fff',
                  },
                },
              },
            },
          },
        },
      }
      const cache = new ClassCache()
      const originalClassNames = getClassName(cache, theme, { primary: true }, 'foo', cssRenderer)
      const nextRenderClassNames = getClassName(cache, theme, { primary: true }, 'foo', cssRenderer)
      expect(nextRenderClassNames).toEqual(originalClassNames)
    })

    it('skips the cache for a separate theme', () => {
      let counter = 0
      const cssRenderer = (args: any) => `class-${counter++}`
      const theme = {
        components: {
          foo: {
            variants: {
              primary: {
                true: {
                  root: {
                    background: '#fff',
                  },
                },
              },
            },
          },
        },
      }
      const anotherTheme = { ...theme }
      const cache = new ClassCache()
      const originalClassNames = getClassName(cache, theme, { primary: true }, 'foo', cssRenderer)
      const nextRenderClassNames = getClassName(
        cache,
        anotherTheme,
        { primary: true },
        'foo',
        cssRenderer,
      )
      expect(nextRenderClassNames).not.toEqual(originalClassNames)
    })
  })

  it('correctly merges variants', () => {
    const cssRendererImportant = (args: any) => {
      if (args.background === 'red') {
        return 'correct'
      }
      return 'incorrect'
    }
    expect(
      getClassName(
        new ClassCache(),
        {
          components: {
            foo: {
              variants: {
                primary: {
                  true: {
                    root: {
                      background: '#fff',
                    },
                  },
                },
                important: {
                  true: {
                    root: {
                      background: 'red',
                    },
                  },
                },
              },
            },
          },
        },
        { primary: true, important: true },
        'foo',
        cssRendererImportant,
      ),
    ).toEqual({ root: 'correct' })

    const cssRendererPrimary = (args: any) => {
      if (args.background === '#fff') {
        return 'correct'
      }
      return 'incorrect'
    }
    expect(
      getClassName(
        new ClassCache(),
        {
          components: {
            foo: {
              variants: {
                important: {
                  true: {
                    root: {
                      background: 'red',
                    },
                  },
                },
                primary: {
                  true: {
                    root: {
                      background: '#fff',
                    },
                  },
                },
              },
            },
          },
        },
        { important: true, primary: true },
        'foo',
        cssRendererPrimary,
      ),
    ).toEqual({ root: 'correct' })
  })
})
