import * as React from 'react'
import * as _ from 'lodash'
import { FlexibleXYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, Crosshair } from 'react-vis'

const ChartTooltip = ({ x, data, ...rest }: { x: number; data: any }) => {
  return (
    <Crosshair {...rest} values={[{ x, y: 20 }]}>
      <div style={{ background: '#555', color: 'white', padding: '.5em' }}>
        <div>Build:&nbsp;{x}</div>
        <div>Date:&nbsp;{data.ts}</div>
        <table className="tooltip">
          <thead>
            <tr>
              <th>Example</th>
              <th>Min</th>
              <th>Median</th>
              <th>Max</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.performance)
              .sort()
              .map(chartName => (
                <tr key={chartName}>
                  <td>{chartName}</td>
                  <td>{_.get(data, `performance.${chartName}.actualTime.min`, '-')}</td>
                  <td>{_.get(data, `performance.${chartName}.actualTime.median`, '-')}</td>
                  <td>{_.get(data, `performance.${chartName}.actualTime.max`, '-')}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Crosshair>
  )
}

/**
 * Draws a performance chart for all items in perfData.performance.
 * Shows tooltip with details for selected build on mouse hover.
 * x-axis is a build number
 * y-axis is a render time
 */
const PerfChart: React.FC<any> = ({ perfData }) => {
  const availableCharts: string[] = perfData
    .reduce(
      (acc, next) => {
        return Array.from(new Set([...acc, ...Object.keys(next.performance)]))
      },
      [] as string[],
    )
    .sort()

  const [nearestX, setNearestX] = React.useState<number>()

  return (
    <FlexibleXYPlot
      onMouseLeave={() => {
        setNearestX(undefined)
      }}
    >
      <YAxis title="ms" />
      <XAxis title="build" />

      <HorizontalGridLines />
      {availableCharts.map((chartName, index) => (
        <LineSeries
          key={chartName}
          data={perfData.map(entry => ({
            x: entry.build,
            y: _.get(entry, `performance.${chartName}.actualTime.median`, 0),
          }))}
          {...(index === 0
            ? {
                onNearestX: (d: any) => {
                  setNearestX(d.x)
                },
              }
            : undefined)}
        />
      ))}

      {nearestX ? (
        <ChartTooltip x={nearestX} data={perfData.find(entry => entry.build === nearestX)} />
      ) : (
        undefined
      )}
    </FlexibleXYPlot>
  )
}

export default PerfChart
