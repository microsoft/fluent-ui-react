# Layout

```
const contents = {
  header: 'This is the header!',
  content: 'This is the content!',
  'start-bar': 'This is the start-bar!',
  'end-bar': 'This is the end-bar!',
  footer: 'This is the footer!',
}

const layoutA = `
  header     header   header
  start-bar  content  end-bar
  footer     footer   footer
`

const layoutB = `
  start-bar  header   end-bar
  start-bar  content  end-bar
  start-bar  footer   end-bar
`

renderLayout(contents, layoutA)
renderLayout(contents, layoutB)
```
