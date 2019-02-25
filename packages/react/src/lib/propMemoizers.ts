const equal = require('shallowequal')
const deepEqual = require('fast-deep-equal')

class TrieNode {
  public readonly key: string

  public readonly value: any

  // we keep a reference to parent
  public parent?: TrieNode = null

  // we have hash of children
  public readonly children = {}

  // check to see if the node is at the end
  public data?: any

  public isEnd() {
    return this.data != null
  }

  constructor(key: string, value: any) {
    // the "key" value will be the prop name
    this.key = key
    this.value = value
  }
}

// implement Trie with just a simple root with null value.
export class Trie {
  private readonly root = new TrieNode(null, null)

  // inserts a word into the trie.
  // time complexity: O(k), k = word length
  public insert(props: Object, data: any) {
    let node = this.root // we start at the root

    const propsKeys = Object.keys(props).sort()

    // for every prop in the object
    for (let i = 0; i < propsKeys.length; i++) {
      const currentKey = propsKeys[i]

      // check to see if prop node exists in children.
      if (!node.children[currentKey]) {
        // if it doesn't exist, we then create it.
        const newNode = new TrieNode(currentKey, props[currentKey])
        // we also assign the parent to the child node.
        newNode.parent = node

        node.children[currentKey] = [newNode]
      }

      const nextNodes = node.children[currentKey] as TrieNode[]
      let matchedNextNode = nextNodes.find(node => node.value === props[currentKey])

      if (!matchedNextNode) {
        matchedNextNode = nextNodes.find(node => node.value === props[currentKey])
      }

      if (!matchedNextNode) {
        // create node with missing value
        const newNode = new TrieNode(currentKey, props[currentKey])
        newNode.parent = node

        node.children[currentKey].push(newNode)

        matchedNextNode = newNode
      }

      // proceed to the next depth in the trie.
      node = matchedNextNode

      // finally, we check to see if it's the last word.
      if (i === propsKeys.length - 1) {
        // if it is, we set the end flag to true.
        node.data = data
      }
    }
  }

  // check if it contains a whole word.
  // time complexity: O(k), k = word length
  public contains(props: Object) {
    let node = this.root
    const propsKeys = Object.keys(props).sort()

    // for every character in the word
    for (let i = 0; i < propsKeys.length; i++) {
      const currentKey = propsKeys[i]

      // check to see if character node exists in children.
      if (node.children[currentKey]) {
        const nextNodes = node.children[currentKey] as TrieNode[]

        let matchedNode = nextNodes.find(nextNode => nextNode.value === props[currentKey])

        if (!matchedNode) {
          matchedNode = nextNodes.find(nextNode => equal(nextNode.value, props[currentKey]))
        }

        if (matchedNode) {
          node = matchedNode
        } else {
          return false
        }
      } else {
        // doesn't exist, return false since it's not a valid word.
        return false
      }
    }

    // we finished going through all the words, but is it a whole word?
    return node.data
  }
}

export class DeepEqual {
  private readonly store: any[] = []

  public contains(props: Object) {
    for (const stored of this.store) {
      const storeProps = stored.props
      if (deepEqual(storeProps, props)) {
        return stored.data
      }
    }

    return false
  }

  public insert(props: Object, data: any) {
    this.store.unshift({ props, data })
  }
}

class Nothing {
  public contains(props: Object) {
    return false
  }

  public insert(props: Object, data: any) {}
}

export default Nothing
