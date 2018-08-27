// ========================================================
// Utilities
// ========================================================

export type Extendable<T> = T & {
  [key: string]: any
}

// ========================================================
// Props
// ========================================================

export type ItemShorthand = React.ReactNode | object | (React.ReactNode | object)[]
export type ReactChildren = React.ReactNodeArray | React.ReactNode
