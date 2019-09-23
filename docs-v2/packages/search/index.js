import React from "react"
import {Link} from "gatsby"
import "./index.css"

const RESULT_LIMIT = 5

export function Search({pages}) {
  const [search, setSearch] = React.useState("")
  const [selectedIndex] = React.useState(0)

  // Enable keyboard shortcut to jump to search bar
  const inputRef = React.useRef()
  useKeyboardShortcut(inputRef)

  // Get search results for current input
  const categorizedResults = React.useMemo(() => {
    let results = findMatchingPages(search, pages)
    results = results.slice(0, RESULT_LIMIT)
    return categorizeResults(results)
  }, [pages, search])

  return (
    <div className="sui-search">
      <input
        className="sui-search__input"
        placeholder="Press / to search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        ref={inputRef}
      />
      {categorizedResults.length > 0 && (
        <SearchResults
          categories={categorizedResults}
          selectedIndex={selectedIndex}
        />
      )}
    </div>
  )
}

function SearchResults({categories, selectedIndex}) {
  return (
    <div className="sui-search__results">
      {categories.map(({id, results}) => {
        return (
          <React.Fragment key={id}>
            <div className="sui-search-result-category">{id}</div>
            {results.map((result, idx) => {
              return (
                <Link
                  key={result.href}
                  to={result.href}
                  className="sui-search-result"
                  data-is-selected={idx === selectedIndex}
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

function useKeyboardShortcut(inputRef) {
  React.useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "/" && inputRef.current) {
        e.preventDefault()
        inputRef.current.focus()
      }
    }
    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [inputRef])
}
