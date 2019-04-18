import * as React from 'react'
import * as _ from 'lodash'
import PerfDataContext from './PerfDataContext'

interface PerfDataProps {
  render: ({ loading: boolean, error: Error, data: any }) => React.ReactElement
  filter?: string
}

/**
 * Reads data from context, filters them and passes them to render function
 * @param render
 * @param filter
 */
const PerfData: React.FC<PerfDataProps> = ({ render, filter }) => {
  const { loading, error, data = [] } = React.useContext(PerfDataContext)

  if (loading || error) {
    return render({ loading, error, data })
  }

  const filteredData = filter
    ? data
        .filter(entry => _.get(entry, `performance.${filter}`))
        .map(entry => ({
          ...entry,
          performance: { [filter]: entry.performance[filter] },
        }))
    : data

  if (filteredData.length === 0) {
    return render({ loading, error: new Error('No data'), data: filteredData })
  }

  return render({
    loading,
    error,
    data: filteredData,
  })
}

export default PerfData
