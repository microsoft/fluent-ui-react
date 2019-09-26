export default class DebugData {
  constructor(
    public readonly componentName: string,
    public readonly siteVariables: Object[],
    public readonly componentVariables: Object[],
    public readonly componentStyles: Record<string, Object[]>,
  ) {}
}
