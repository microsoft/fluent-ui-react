import { ThemeInput } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import { FelaTheme } from 'react-fela'

const C: React.FunctionComponent = props => (
  <FelaTheme>
    {(theme: ThemeInput) => (
      <div>
        {props.children}
        {(!!theme.rtl).toString()}
      </div>
    )}
  </FelaTheme>
)

const ContextFelaThemeNestingPerf = () => (
  <>
    {_.times(100, key => (
      <C key={key}>
        <C>
          <C>
            <C>
              <C>
                <C>
                  <C>
                    <C>
                      <C>
                        <C>
                          <C>
                            <C>
                              <C>
                                <C>
                                  <C>
                                    <C>
                                      <C>
                                        <C>
                                          <C>
                                            <C>
                                              <C>
                                                <C>
                                                  <C>
                                                    <C>
                                                      <C>
                                                        <C>
                                                          <C>
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
    ))}
  </>
)

export default ContextFelaThemeNestingPerf
