import { exampleSourcesContext } from '../../../utils'

interface SourceCodeData {
  path: string
  code: string
  originalCode: string
}

export enum SourceCodeType {
  normal = 'normal',
  shorthand = 'shorthand',
}

export const examplePathPatterns: { [key in SourceCodeType]: string } = {
  normal: '',
  shorthand: '.shorthand',
}

class SourceCodeManager {
  private readonly data: { [key in SourceCodeType]: SourceCodeData } = {
    normal: {} as SourceCodeData,
    shorthand: {} as SourceCodeData,
  }

  public codeType: SourceCodeType

  constructor(private sourceCodePath: string) {
    const prioritizedCodeTypes = [SourceCodeType.shorthand, SourceCodeType.normal] // order is relevant
    prioritizedCodeTypes.forEach(sourceCodeType => {
      this.setDataForCodeType(sourceCodeType)
    })

    this.codeType =
      prioritizedCodeTypes.find(codeType => this.isCodeValidForType(codeType)) ||
      SourceCodeType.shorthand
  }

  public set currentCode(currentCode: string) {
    this.currentCodeData.code = currentCode
  }

  public get currentCode(): string {
    return this.currentCodeData.code
  }

  public get currentPath(): string {
    return this.currentCodeData.path
  }

  public get originalCodeHasChanged(): boolean {
    return this.currentCodeData.code !== this.currentCodeData.originalCode
  }

  public isCodeValidForType(codeType: SourceCodeType): boolean {
    return this.data[codeType].code != null
  }

  public resetToOriginalCode(): void {
    this.currentCodeData.code = this.currentCodeData.originalCode
  }

  private get currentCodeData(): SourceCodeData {
    return this.data[this.codeType]
  }

  private set currentCodeData(codeData: SourceCodeData) {
    this.data[this.codeType] = codeData
  }

  private setDataForCodeType(sourceCodeType: SourceCodeType): void {
    const path = this.sourceCodePath + examplePathPatterns[sourceCodeType]
    const code = this.safeRequire(path)

    if (!code) {
      // Returning as there are no examples provided for this type
      // - e.g. there is no children API example for component
      return
    }

    this.data[sourceCodeType] = {
      path,
      code,
      originalCode: code,
    }
  }

  private safeRequire = (path: string): string | undefined => {
    try {
      const filename = `${path.replace(/^components\//, './')}.source.json`

      return exampleSourcesContext(filename).js
    } catch (e) {
      return undefined
    }
  }
}

export default SourceCodeManager
