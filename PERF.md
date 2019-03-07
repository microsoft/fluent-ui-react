!! DUE TO DEV MODE PERFORMANCE ISSUES, ALL NUMBERS REPORTED ARE WITH FELA RENDERER DEV_MODE FALSE !!

# Conclusions / Changes

- [ ] Do not console.error in renderComponent, costs ~200ms each log.  Wrap in dead code eliminated prod check.

## Skipping fela

If we modify getClasses to return empty strings, avoiding all calls into fela's internals for generating CSS and writing to the DOM, these are the timings we get:

~175ms Chat 30 msgs

| function                      | time     |
|-------------------------------|----------|
| renderComponent               | 123.295  |
| mergeThemes                   | 27.359   |
| mergeThemeStyles              | 17.080   |
| mergeComponentStyles          | 10.725   |
| getClasses                    | 3.260    |
| getElementType                | 2.909    |
| mergeComponentVariables       | 2.739    |
| mergeSiteVariables            | 1.994    |
| mergeStyles                   | 2.135    |
| mergeThemeVariables           | 3.310    |
| (fela) renderer.renderStatic  | 3.039    |
| (fela) renderer.renderFont    | 0.790    |
| mergeIcons                    | 0.479    |
| mergeAnimations               | 0.369    |
| mergeFontFaces                | 0.269    |
| (fela) renderer._emitChange   | 0.210    |
| mergeRTL                      | 0.195    |
| mergeStaticStyles             | 0.195    |
| (fela) renderer.subscribe     | 0.075    |

# Number of components

The shear number of components times the mounting time seems to be a primary cause of first load issues.

| Time  | Ea    |Components | Box | Text | Description                                                       |
|-------|-------|-----------|-----|------|-------------------------------------------------------------------|
| 17    | 5.6   | 3         | 0   | 0    | Chat with single "Today" divider                                  |
| 23    | 3.3   | 7         | 2   | 2    | Chat with single text message that is "mine"                      | 
| 28    | 3.1   | 9         | 3   | 2    | Chat with single text message from other with avatar              | 
| 60    | 1.8   | 33        | 8   | 2    | Chat 1 item, reaction menu, 5 items, 3 shown on hover             | 
| 675   | 0.7   | 961       | 240 | 60   | ^ 30 items                                                        | 
| 45    | 1.4   | 33        | 8   | 2    | ^ re-render / forceUpdate                                         |
| 45    | 1.4   | 33        | 8   | 2    | ^ skip fela                                                       |
| 250   | 1.09  | 229       | 66  | 54   | Chat with 30 items (text messages, few dividers, no reactions)    |

>Because the most prevalent component is Box, it is listed separately.
>Text is included for similar reasons.

# Perf Investigation

This test uses the default Chat example with 30 messages.  This simulates a similar scenario to initial render in multi window.

We created a tracing function that marks function names and the number of calls they've had in Chrome's performance dev tools.  We wrapped key functions in Stardust's `renderComponent()` code path down through fela's internals.  This gives us a perf story with this life cycle:

For each component: 
- Theme Consumer mount
- Component mount
- getClasses() (Stardust)

## Baseline HTML

3 - 4ms per HTML parse, required two HTML parse passes... not sure why

## Use case

The majority of time is spent creating classes after a component mounts.  The tip of this timing iceberg is in Stardust, but the bulk is in fela.

## Initial findings

### Death by 1,000 papercuts (literally)

30 chat messages calls renderStyleToClassNames 868 times.  This function is insanely fast, 0.009ms - 0.045ms, accounting for 1-5ms.

### Theme merging

Very fast given the task and that theme merging is not optimized, 4 - 8ms. This also only happens at the Provider level, usually once per page.  Component's do not need to merge the theme on re-render.  So, overall theme merging cost is very low.

Components do need to merge `props.variables` and `props.styles` on every render, however, `mergeComponentStyles` and `mergeComponentProps` are also incredibly fast, 0.01 - 0.04 milliseconds per call.

This area is not preventing us from rendering components in sub millisecond times.

### Mounting, Re-rendering, Un-mount re-mount with cache

~360ms First mount, writing classes
~60ms Re-render, mounted, classes in cache (saved 83% compared to first mount)
~270ms Unmount/Remount with cached classes (save 25% compared to first mount)

### getClasses

This is where our time is being taken.  Each component gets its classes on mount.  Components which compose other components (Avatar > Status > Icon) must getClasses no less than 3 times.  Each getClasses call is taking 

### Fela

After the first styles are written and cached, subsequent renders are much faster.
There are some dev mode slow downs.
We are in a death-by 1,000 paper cuts scenario for the remaining perf gains.

#### FelaTheme

Every component grabs the theme on mount.  There is wasted time waiting on FelaTheme to mount during component mount for unknown reasons.  Delving into the source, FelaTheme is essentially a 1:1 thin abstraction on React's `createContext()` there is no logic involved at this layer.

It seems the issue with consumer mounting is that React searches the entire tree to properly propagate context.

Removing all Fela consumers from renderComponent() (all our UI components) dropped render times from avg 362ms to avg 323ms, 10% improvement.  Less often, there is a variance in timings of up to 10% so this figure might not be completely valid.  The majority of the time, the savings are there.  In the case with Provider Consumer's, timings are NEVER below 355.  In the case without Provider Consumer's the timings are usually ~320, but are SOMETIMES still ~360. 

#### Fela's devMode
See http://fela.js.org/docs/advanced/DOMRendering.html


When fela's renderer is in devMode (default local), the `insertRule()` function uses a de-optimized code path (`insertRuleInDevMode.js`) for writing style updates to the style nodes.  It replaces the text of the style node in the head, opposed to using the browser's optimized `CSSStyleSheet.insertRule()` method.

Per the file comments, this is to keep the browser's dev tools happy with runtime style node changes. See `fela-dom/es/dom/connection/insertRule.js`.

If we bypass the style node text replace and opt for the `insertRule` method, Chrome's perf tools show a 40-50% reduction in render times from ~700-800ms down to a consistent ~362ms.   

Maximized Chat example with 30 messages:
- ~500-700ms: total render time in isolated maximized route
- ~300ms: inside getClasses() 

The lifecycle for styling a component at runtime looks like this:

- Component Mount
  - FelaTheme Mount
    - Stardust getClasses()
      - Fela renderer renderRule (renders style func, like button.root)
        - Fela renderer renderStyle (renders style object, from style func)
          - Fela renderer renderStyleToClassNames (renders style object, from style func)

This is where the bulk

/Users/levithomason/src/stardust-ui/react/node_modules/fela-dom/es/dom/connection/insertRule.js
