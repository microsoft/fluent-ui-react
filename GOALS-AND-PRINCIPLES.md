This document outlines goals and principles which drive architecture decisions within Fluent.

This is a work in progress; as goals and principles evolve, we should document them and adhere to them.

# Vision

> TODO: Fill this in. :)

# Goals

This is a living list; we should add/remove/refine as we learn more.

1. Split platform from components so others can build component libraries.

2. Components broken into smaller purposeful packages; less uber component libraries!

3. Awesome patterns to use for new libraries to be built.

4. Theming solution that can meet the needs of any component library.

> TODO: review/complete; I'm sure there are more here.

# Principles

This is a living list; we should add/remove/refine as we learn more.

1. Use easy to understand and enforcable coding patterns which minimize cognitive load on new developers.

2. Specs; we need to clearly document things, because someday someone else will maintain your code and wonder what the intent was.

3. Leverage modern framework features, strive to achieve the best perf and bundle size possible within the constraints of your requirements.

4. Avoid overarchitecting for potential scenarios. Solve the known scenarios in the most ergonomic way possible, but allocate time to factor out sharable parts when you need to.

> TODO: review/complete; there are more here! Possibly need
