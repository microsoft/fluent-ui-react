import fs from 'fs'
import path from 'path'
import flamegrill, { CookResult, CookResults, ScenarioConfig, Scenarios } from 'flamegrill'

import { generateUrl } from '@fluentui/digest'

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO:
//
// As much of this file should be absorbed into flamegrill as possible.
// Flamegrill knows all possible kinds and stories from digest. Could default to running tests against all.
// Embed iterations in stories as well as scenarios. That way they would apply for static tests as well.
//
// Fundamentally this script needs to know all of the kinds and stories, but cannot use the same
// require.context approach as it is running in a just task environment. Need to be able to share
// available kinds and stories to this script somehow, ideally with the perf bundle output so as
// not to have redundant globs/require.context specifications. Best idea so far is to generate
// a blob with bundle that has all kinds and story information that can be used by this script.
//
// Ideas tried:
//  - req.context args passed by client (this cannot be easily used by digest since the args aren't literal)
//    - this approach is possible since storybook uses it, but requires generating JS output with req.context strings
//    - also need to be able to pass args to webpack config, and not sure if webpack/just can consume these easily
//  - webpack plugin that monitors for req.context lookups and spits out JSON blob (also complex)
//    - hard to do without knowing req.context args used by consumer, particularly if consumer code has a bunch of
//        other req.contexts
//
// Storybook creates require.context output using virtual web module:
// https://github.com/storybookjs/storybook/blob/123d0c6a544e989f96c3c3663a0c7f29fde8be01/lib/core/src/server/preview/iframe-webpack.config.js#L29
//
// For now this file hardcodes the kinds/stories/iterations (partially generated from index.digest.tsx):
// const defaultIterations = 5000
const stories = {
  // Attachment: {
  //   default: defaultIterations,
  // },
  // Button: {
  //   default: defaultIterations,
  // },
  // Chat: {
  //   default: 50,
  // },
  // ChatWithPopover: {
  //   default: 50,
  // },
  // Divider: {
  //   default: defaultIterations,
  // },
  // Dropdown: {
  //   default: 50,
  // },
  // Header: {
  //   default: defaultIterations,
  // },
  // HeaderDescription: {
  //   default: defaultIterations,
  // },
  // Icon: {
  //   default: defaultIterations,
  // },
  // List: {
  //   default: 1000,
  // },
  // Loader: {
  //   default: 1000,
  // },
  // ProviderMergeThemes: {
  //   default: 50,
  // },
  // CustomToolbar: {
  //   default: 500,
  // },
  Button: {
    Fabric: 5000,
    Fluent: 5000,
  },
  Checkbox: {
    Fabric: 5000,
    Fluent: 5000,
  },
  Icon: {
    Fabric: 5000,
    Fluent: 5000,
  },
  Slider: {
    Fabric: 5000,
    Fluent: 5000,
  },
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// TODO: We can't do CI, measure baseline or do regression analysis until master & PR files are deployed and publicly accessible.
// const urlForDeployPath = process.env.BUILD_SOURCEBRANCH
//   ? `http://fabricweb.z5.web.core.windows.net/pr-deploy-site/${process.env.BUILD_SOURCEBRANCH}/perf-test`
//   : `file://${path.resolve(__dirname, '../dist/')}`;
const urlForDeployPath = `file://${path.resolve(__dirname, '../dist/')}`

// const urlForMaster = process.env.SYSTEM_PULLREQUEST_TARGETBRANCH
//   ? `http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/${process.env.SYSTEM_PULLREQUEST_TARGETBRANCH}/perf-test/index.html`
//   : 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/perf-test/index.html';

const urlForDeploy = `${urlForDeployPath}/index.html`

const outDir = path.join(__dirname, '../dist')
const tempDir = path.join(__dirname, '../logfiles')

export default async function getPerfRegressions() {
  // TODO: support iteration/kind/story via commandline as in other perf-test script
  // TODO: align flamegrill terminology with CSF (story vs. scenario)
  const scenarios: Scenarios = {}
  const scenarioList: string[] = []

  Object.keys(stories).forEach(kind => {
    Object.keys(stories[kind]).forEach(story => {
      const scenarioName = `${kind}.${story}`
      scenarioList.push(scenarioName)
      scenarios[scenarioName] = {
        // TODO: We can't do CI, measure baseline or do regression analysis until master & PR files are deployed and publicly accessible.
        // baseline: generateUrl(urlForMaster, kind, story, iterations),
        scenario: generateUrl(urlForDeploy, kind, story, stories[kind][story]),
      }
    })
  })

  console.log(`\nRunning scenarios: ${scenarioList}\n`)

  if (!fs.existsSync(tempDir)) {
    console.log(`Making temp directory ${tempDir}...`)
    fs.mkdirSync(tempDir)
  }

  const tempContents = fs.readdirSync(tempDir)

  if (tempContents.length > 0) {
    console.log(`Unexpected files already present in ${tempDir}`)
    tempContents.forEach(logFile => {
      const logFilePath = path.join(tempDir, logFile)
      console.log(`Deleting ${logFilePath}`)
      fs.unlinkSync(logFilePath)
    })
  }

  const scenarioConfig: ScenarioConfig = { outDir, tempDir }
  const scenarioResults = await flamegrill.cook(scenarios, scenarioConfig)

  const comment = createReport(scenarioResults)

  // TODO: determine status according to perf numbers
  const status = 'success'

  console.log(`Perf evaluation status: ${status}`)
  console.log(`Writing comment to file:\n${comment}`)

  // Write results to file
  fs.writeFileSync(path.join(outDir, 'perfCounts.html'), comment)

  console.log(
    `##vso[task.setvariable variable=PerfCommentFilePath;]apps/perf-test/dist/perfCounts.html`,
  )
  console.log(`##vso[task.setvariable variable=PerfCommentStatus;]${status}`)
}

/**
 * Create test summary based on test results.
 *
 * @param {CookResults} testResults
 * @returns {string}
 */
function createReport(testResults: CookResults): string {
  const report = ''

    // TODO: We can't do CI, measure baseline or do regression analysis until master & PR files are deployed and publicly accessible.
    // // Show only significant changes by default.
    // .concat(createScenarioTable(testResults, false))

    // // Show all results in a collapsible table.
    // .concat('<details><summary>All results</summary><p>')
    // .concat(createScenarioTable(testResults, true))
    // .concat('</p></details>');

    .concat(createScenarioTable(testResults, true))

  return report
}

/**
 * Create a table of scenario results.
 *
 * @param {CookResults} testResults
 * @param {boolean} showAll Show only significant results by default.
 * @returns {string}
 */
function createScenarioTable(testResults: CookResults, showAll: boolean): string {
  const resultsToDisplay = Object.keys(testResults).filter(
    key =>
      showAll ||
      (testResults[key].analysis &&
        testResults[key].analysis.regression &&
        testResults[key].analysis.regression.isRegression),
  )

  if (resultsToDisplay.length === 0) {
    return '<p>No significant results to display.</p>'
  }

  // TODO: We can't do CI, measure baseline or do regression analysis until master & PR files are deployed and publicly accessible.
  // const result = `
  // <table>
  // <tr>
  //   <th>Scenario</th>
  //   <th>
  //     <a href="https://github.com/OfficeDev/office-ui-fabric-react/wiki/Perf-Testing#why-are-results-listed-in-ticks-instead-of-time-units">Master Ticks</a>
  //   </th>
  //   <th>
  //     <a href="https://github.com/OfficeDev/office-ui-fabric-react/wiki/Perf-Testing#why-are-results-listed-in-ticks-instead-of-time-units">PR Ticks</a>
  //   </th>
  //   <th>Status</th>
  // </tr>`.concat(
  //   resultsToDisplay
  //     .map(key => {
  //       const testResult = testResults[key];

  //       return `<tr>
  //           <td>${scenarioNames[key] || key}</td>
  //           ${getCell(testResult, true)}
  //           ${getCell(testResult, false)}
  //           ${getRegression(testResult)}
  //          </tr>`;
  //     })
  //     .join('\n')
  //     .concat(`</table>`),
  // );

  // TODO: add iterations column (and maybe ticks per iteration)
  const result = `
  <table>
  <tr>
    <th>Kind</th>
    <th>Story</th>
    <th>Iterations</th>
    <th>
      <a href="https://github.com/OfficeDev/office-ui-fabric-react/wiki/Perf-Testing#why-are-results-listed-in-ticks-instead-of-time-units">PR Ticks</a>
    </th>
  </tr>`.concat(
    resultsToDisplay
      .map(key => {
        const testResult = testResults[key]

        console.dir(testResult)
        const [kind, story] = key.split('.')
        return `<tr>
            <td>${kind}</td>
            <td>${story}</td>
            <td>${stories[kind][story]}</td>
            ${getCell(testResult, false)}
           </tr>`
      })
      .join('\n')
      .concat(`</table>`),
  )

  return result
}

/**
 * Helper that renders an output cell based on a test result.
 *
 * @param {CookResult} testResult
 * @param {boolean} getBaseline
 * @returns {string}
 */
function getCell(testResult: CookResult, getBaseline: boolean): string {
  let flamegraphFile = testResult.processed.output && testResult.processed.output.flamegraphFile
  let errorFile = testResult.processed.error && testResult.processed.error.errorFile
  let numTicks = testResult.analysis && testResult.analysis.numTicks

  if (getBaseline) {
    const processedBaseline = testResult.processed.baseline
    flamegraphFile =
      processedBaseline && processedBaseline.output && processedBaseline.output.flamegraphFile
    errorFile = processedBaseline && processedBaseline.error && processedBaseline.error.errorFile
    numTicks =
      testResult.analysis && testResult.analysis.baseline && testResult.analysis.baseline.numTicks
  }

  const cell = errorFile
    ? `<a href="${urlForDeployPath}/${path.basename(errorFile)}">err</a>`
    : flamegraphFile
    ? `<a href="${urlForDeployPath}/${path.basename(flamegraphFile)}">${numTicks}</a>`
    : `n/a`

  return `<td>${cell}</td>`
}

/**
 * Helper that renders an output cell based on a test result.
 *
 * @param {CookResult} testResult
 * @returns {string}
 */
// TODO: We can't do CI, measure baseline or do regression analysis until master & PR files are deployed and publicly accessible.
// function getRegression(testResult: CookResult): string {
//   const cell = testResult.analysis && testResult.analysis.regression && testResult.analysis.regression.isRegression
//     ? testResult.analysis.regression.regressionFile
//       ? `<a href="${urlForDeployPath}/${path.basename(testResult.analysis.regression.regressionFile)}">Possible regression</a>`
//       : ''
//     : '';

//   return `<td>${cell}</td>`;
// }
