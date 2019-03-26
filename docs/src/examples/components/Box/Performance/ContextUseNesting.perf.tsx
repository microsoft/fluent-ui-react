import { ThemeInput } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

const C: React.FC = props => {
  const theme = React.useContext<ThemeInput>(ThemeContext)

  return (
    <div>
      {props.children}
      {(!!theme.rtl).toString()}
    </div>
  )
}

const ContextUseNestingPerf = () => (
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

export default ContextUseNestingPerf
