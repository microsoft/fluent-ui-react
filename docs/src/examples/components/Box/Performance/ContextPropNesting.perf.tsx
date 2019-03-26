import { ThemeInput } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

const C: React.FunctionComponent<{ t: ThemeInput }> = props => (
  <div>
    {props.children}
    {(!!props.t.rtl).toString()}
  </div>
)

const ContextPropNestingPerf = () => (
  <ThemeContext.Consumer>
    {theme =>
      _.times(100, key => (
        <C key={key} t={theme}>
          <C t={theme}>
            <C t={theme}>
              <C t={theme}>
                <C t={theme}>
                  <C t={theme}>
                    <C t={theme}>
                      <C t={theme}>
                        <C t={theme}>
                          <C t={theme}>
                            <C t={theme}>
                              <C t={theme}>
                                <C t={theme}>
                                  <C t={theme}>
                                    <C t={theme}>
                                      <C t={theme}>
                                        <C t={theme}>
                                          <C t={theme}>
                                            <C t={theme}>
                                              <C t={theme}>
                                                <C t={theme}>
                                                  <C t={theme}>
                                                    <C t={theme}>
                                                      <C t={theme}>
                                                        <C t={theme}>
                                                          <C t={theme}>
                                                            <C t={theme}>
                                                              <div />
                                                            </C>
                                                          </C>
                                                        </C>
                                                      </C>
                                                    </C>
                                                  </C>
                                                </C>
                                              </C>
                                            </C>
                                          </C>
                                        </C>
                                      </C>
                                    </C>
                                  </C>
                                </C>
                              </C>
                            </C>
                          </C>
                        </C>
                      </C>
                    </C>
                  </C>
                </C>
              </C>
            </C>
          </C>
        </C>
      ))
    }
  </ThemeContext.Consumer>
)

export default ContextPropNestingPerf
