export interface ITextVariables {
  [key: string]: string | number

  importantWeight: number
}

const textVariables = (): ITextVariables => {
  return {
    importantWeight: 600,
  }
}

export default textVariables
