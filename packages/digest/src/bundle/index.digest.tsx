import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as qs from 'querystring'

import config from 'stories/config'

const { stories, decorator } = config

// TODO: Remove once digest can pass along story information to consumer.
// Temporary code to spit out object for copy/pasting into consumer until story data can be shared.
// let storiesString = '{';
// Object.keys(stories).forEach(kind => {
//   storiesString += `${kind}: {`;
//   Object.keys(stories[kind]).forEach(story => {
//     storiesString += `${story}: ''`;
//   })
//   storiesString += '},';
// })
// storiesString += '};';
// console.log(storiesString);

// TODO: going to need to support story setup like initializeIcons for Fabric.

const div = document.createElement('div')
document.body.appendChild(div)

const defaultIterations = 1

// This is structure to follow storybook conventions to take advantage of existing storybook CSFs.
// https://storybook.js.org/docs/testing/automated-visual-testing/#custom-solutions
const queryParams = qs.parse(window.location.search.substring(1))
const iterations = queryParams.iterations
  ? parseInt(queryParams.iterations as string, 10)
  : defaultIterations
const selectedKind = queryParams.selectedKind ? (queryParams.selectedKind as string) : undefined
const selectedStory = queryParams.selectedStory ? (queryParams.selectedStory as string) : undefined

// TODO: eval functions here or in config? check perf differences! other considerations?
// TODO: make sure decorator impl doesn't affect perf.
if (selectedKind && selectedStory) {
  ReactDOM.render(
    decorator(
      <div>{Array.from({ length: iterations }, () => stories[selectedKind][selectedStory]())}</div>,
    ),
    div,
  )
} else {
  ReactDOM.render(
    decorator(
      <div>
        <div>Required params missing.</div>
        <div>Required params: selectedKind, selectedStory</div>
        <div>Optional params: iterations</div>
        <div>Displaying all kinds and stories:</div>{' '}
        {Object.keys(stories).map(kindKey => {
          return (
            <div>
              <br />
              <b>Kind: {kindKey}</b>
              {Object.keys(stories[kindKey]).map(storyKey => {
                return (
                  <div>
                    <br />
                    <div>
                      Story:{' '}
                      <a href={`?selectedKind=${kindKey}&selectedStory=${storyKey}&iterations=50`}>
                        {storyKey}
                      </a>
                    </div>
                    <div>{stories[kindKey][storyKey]()}</div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>,
    ),
    div,
  )
}
