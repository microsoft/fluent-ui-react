import React from "react"
import {Link} from "gatsby"
import "./index.css"

export function Search({pages, limit = 5}) {
  const [search, setSearch] = React.useState("")
  const [selectedResult, setSelectedResult] = React.useState()
  const [showResults, setShowResults] = React.useState(true)
  const ref = React.useRef()

  // Enable keyboard shortcut to jump to search bar
  useKeyboardShortcut()

  React.useEffect(() => {
    if (!showResults) {
      return
    }

    function handleClick(e) {
      if (!ref.current.contains(e.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [showResults, ref])

  // Get search results for current input
  const results = React.useMemo(() => {
    const results = findMatchingPages(search, pages)
    return results.slice(0, limit)
  }, [pages, search, limit])

  // Categorize those results for rendering
  const categorizedResults = React.useMemo(() => {
    const categories = categorizeResults(results)

    // FIXME: hack for ordering results for keyboard navigation once they've
    // been grouped by category.
    let idx = 0
    for (const c of categories) {
      for (const r of c.results) {
        r.index = idx++
      }
    }

    return categories
  }, [results])

  // If no result is currently selected, select the first one
  React.useLayoutEffect(() => {
    if (!results.includes(selectedResult)) {
      setSelectedResult(results[0])
    }
  }, [results, selectedResult])

  // Support keyboard navigation (arrow keys to navigate, enter to select)
  function handleKeydown(e) {
    switch (e.key) {
      case "ArrowUp":
      case "ArrowDown": {
        e.preventDefault()
        let currIdx = selectedResult.index || 0
        const nextIdx =
          e.key === "ArrowUp"
            ? Math.max(currIdx - 1, 0)
            : Math.min(currIdx + 1, results.length - 1)

        const result = results.find(r => r.index === nextIdx)
        if (result) {
          setSelectedResult(result)
        }
        break
      }
      case "Enter":
        e.preventDefault()
        if (selectedResult) {
          const selected = document.querySelector(
            '.sui-search [data-is-selected="true"]'
          )
          if (selected) {
            selected.click()
          }
        }
        break
      default:
      // noop
    }
  }

  const input = (
    <input
      className="sui-search__input"
      placeholder="Press / to search"
      value={search}
      onChange={e => setSearch(e.target.value)}
      onKeyDown={handleKeydown}
      onFocus={() => setShowResults(true)}
    />
  )

  return (
    <div className="sui-search" ref={ref}>
      {input}
      {React.cloneElement(input, {
        className: "sui-search__input is-mobile",
        placeholder: "Search the docs"
      })}
      {showResults && categorizedResults.length > 0 && (
        <SearchResults
          categories={categorizedResults}
          selectedResult={selectedResult}
        />
      )}
    </div>
  )
}

function SearchResults({categories, selectedResult}) {
  return (
    <div className="sui-search__results">
      {categories.map(({id, results}, categoryIdx) => {
        return (
          <React.Fragment key={id}>
            <div className="sui-search-result-category">{id}</div>
            {results.map((result, resultIdx) => {
              let isSelected = result === selectedResult
              if (!selectedResult && !isSelected) {
                if (categoryIdx === 0 && resultIdx === 0) {
                  isSelected = true
                }
              }
              return (
                <Link
                  key={result.path}
                  to={result.path}
                  className="sui-search-result"
                  data-is-selected={isSelected}
                >
                  <span className="sui-search-result__title">
                    {result.title}
                  </span>
                  {result.description && (
                    <span className="sui-search-result__description">
                      {result.description}
                    </span>
                  )}
                </Link>
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// TODO: prioritize title over description
function findMatchingPages(search, pages) {
  search = search.trim()

  if (!search) {
    return []
  }

  // TODO: escape regex
  const reSearch = new RegExp(search, "i")
  const results = []
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const isMatch = reSearch.test(page.title) || reSearch.test(page.description)
    if (isMatch) {
      results.push(page)
    }
  }
  return results
}

function categorizeResults(results) {
  const map = new Map()
  for (const result of results) {
    if (!map.has(result.category)) {
      map.set(result.category, [])
    }
    map.get(result.category).push(result)
  }

  return [...map.entries()].map(([category, results]) => {
    return {id: category, results}
  })
}

function useKeyboardShortcut() {
  React.useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "/") {
        const input = [...document.querySelectorAll(".sui-search__input")].find(
          isVisible
        )
        if (input) {
          e.preventDefault()
          input.focus()
        }
      }
    }
    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [])
}

function isVisible(node) {
  return node.offsetParent !== null
}
