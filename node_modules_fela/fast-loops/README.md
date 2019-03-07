# Fast Loops

A collection of small, performant & immutable iteration utilities for Arrays and Objects.

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/fast-loops.svg?branch=master"> <a href="https://codeclimate.com/github/rofrischmann/fast-loops/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/fast-loops/badges/coverage.svg"></a> <img alt="gzipped size" src="https://img.shields.io/badge/gzipped+minified-0.46kb-brightgreen.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/fast-loops.svg"> <img alt="npm version" src="https://badge.fury.io/js/fast-loops.svg">

## Installation
```sh
yarn add fast-loops
```
Alternatively use `npm i --save fast-loops`.

## Why?
Because JavaScript's native "functional" APIs such as `forEach`, `reduce`, `map` and `filter` are slow. There're many different utility packages out there already, e.g. lodash. But lodash's `reduce` method itself is 4.5kb gzipped which is way too much for a simple Array/Object reduce utility.

## API

> All methods are immutable by defaults, yet they're not safe from mutating.

* [arrayEach](#arrayeacharr-iterator)
* [arrayFilter](#arrayfilterarr-filter)
* [arrayMap](#arraymaparr-mapper)
* [arrayReduce](#arrayreducearr-reducer-accumulator)
* [objectEach](#objecteachobj-iterator)
* [objectFilter](#objectfilterobj-filter)
* [objectFind](#objectfindobj-query)
* [objectReduce](#objectreduceobj-reducer-accumulator)

### `arrayEach(arr, iterator)` <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.38kb-brightgreen.svg">

Iterates over each value in the array.<br>
Similar to `Array.prototype.forEach`.

1. `arr` (*Array*): The array to iterate over
2. `iterator` (*Function*): The iterator method with the signature `(value, index, length, arr) => void`

```javascript
import { arrayEach } from 'fast-loops'

arrayEach([1, 2, 3], console.log)
// 1, 0, 3, [1, 2, 3]
// 2, 1, 3, [1, 2, 3]
// 3, 2, 3, [1, 2, 3]
```


### `arrayFilter(arr, filter)` <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.4kb-brightgreen.svg">

Filters an array according to the filter criteria.<br>
Similar to `Array.prototype.filter`.

1. `arr` (*Array*): The array that gets filtered
2. `filter` (*Function*): The filter method with the signature `(value, index, length, arr) => boolean`.

```javascript
import { arrayFilter } from 'fast-loops'

const biggerThan2 = arrayFilter([1, 2, 3, 4], value => value > 2)

console.log(biggerThan2)
// => [3, 4]
```

### `arrayMap(arr, mapper)` <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.39kb-brightgreen.svg">

Maps an array by running the mapper on each value.<br>
Similar to `Array.prototype.map`.

1. `arr` (*Array*): The array that gets mapped
2. `mapper` (*Function*): The mapping method with the signature `(value, index, length, arr) => any`.

```javascript
import { arrayMap } from 'fast-loops'

const square = arrayMap([1, 2, 3, 4], value => value * value)

console.log(square)
// => [1, 4, 9, 16]
```

### `arrayReduce(arr, reducer, accumulator)` <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.38kb-brightgreen.svg">

Reduces an array based on the accumulator.<br>
Similar to `Array.prototype.reduce`.

1. `arr` (*Array*): The array that gets reduced
2. `reducer` (*Function*): The reducer method with the signature `(accumulator, value, index, length, arr) => accumulator`.
3. `accumulator` (*any*): The initial accumulator value

```javascript
import { arrayReduce } from 'fast-loops'

const sum = arrayReduce([1, 2, 3, 4], (out, value) => out + value, 0)

console.log(sum)
// => 10
```

### `objectEach(obj, iterator)` <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.37kb-brightgreen.svg">

Iterates over each key in the object.

1. `obj` (*Object*): The object to iterate over
2. `iterator` (*Function*): The iterator method with the signature `(value, key, obj) => void`

```javascript
import { objectEach } from 'fast-loops'

objectEach({ 1: 10, 2: 20, 3: 30 }, console.log)
// 10, 1, { 1: 10, 2: 20, 3: 30 }
// 20, 2, { 1: 10, 2: 20, 3: 30 }
// 30, 3, { 1: 10, 2: 20, 3: 30 }
```

### `objectFilter(obj, filter)` <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.38kb-brightgreen.svg">

Filters an object's keys according to the filter criteria.

1. `obj` (*Object*): The object that gets filtered
2. `filter` (*Function*): The filter method with the signature `(value, key, obj) => boolean`.

```javascript
import { objectFilter } from 'fast-loops'

const filter = (value, key) => value > 20 && parseInt(key) % 2 !== 0
const biggerThan20AndOddKey = objectFilter({ 1: 10, 2: 20, 3: 30, 4: 40 }, filter)

console.log(biggerThan20AndOddKey)
// => { 3: 30 }
```

### `objectFind(obj, query)` <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.37kb-brightgreen.svg">

Tries to find a key-value pair that matches the query.<br>
Returns the matching key or `undefined` if none matches.<br>
It's like `Array.prototype.find` but for objects.

1. `obj` (*Object*): The object that gets queried
2. `query` (*Function*): The query method with the signature `(value, key, obj) => boolean`.

```javascript
import { objectFind } from 'fast-loops'

const query = (value, key) => value > 20 && parseInt(key) % 2 === 0
const biggerThan20AndEvenKey = objectFilter({ 1: 10, 2: 20, 3: 30, 4: 40 }, query)

console.log(biggerThan20AndEvenKey)
// => "4"
```

### `objectReduce(obj, reducer, accumulator)` <img alt="gzipped size" src="https://img.shields.io/badge/gzipped-0.37kb-brightgreen.svg">

Reduces an object based on the accumulator.

1. `obj` (*Object*): The object that gets reduced
2. `reducer` (*Function*): The reducer method with the signature `(accumulator, value, key, obj) => accumulator`.
3. `accumulator` (*any*): The initial accumulator value

```javascript
import { objectReduce } from 'fast-loops'

const sumOfValues = objectReduce({ 1: 10, 2: 20, 3: 30 }, (out, value) => out + value, 0)

console.log(sumOfValues)
// => 60
```

## Direct Imports
While we support the `module` key to support Tree Shaking, you might still want to import single methods without any overhead.
You can import every method using the full path to the method resource.

```javascript
import objectReduce from 'fast-loops/lib/objectReduce'
```

## License
fast-loops is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
