export class ClassCache {
  private cache = new WeakMap();

  public get(theme: {}, arg1: string): any {
    const obj = this.cache.get(theme);
    if (!obj) {
      return null;
    }
    return obj[arg1] || null;
  }

  public set(theme: {}, arg1: string, val: {}) {
    let themeEntry;
    if (this.cache.get(theme)) {
      themeEntry = this.cache.get(theme);
    } else {
      themeEntry = {};
      this.cache.set(theme, themeEntry);
    }
    themeEntry[arg1] = val;
  }

  public getOrSet(theme: {}, key: string, cacheEntry: any): any {
    const existing = this.get(theme, key);
    if (existing !== undefined && existing !== null) {
      return existing;
    }
    this.set(theme, key, cacheEntry);
    return cacheEntry;
  }
}

export class VariantBasedCacheKeyStrategy {
  private computed: string;

  constructor(private variants: string[] = [], private props: any = {}) {}

  public toString() {
    if (this.computed) {
      return this.computed;
    }
    const computedRaw: any = {};
    this.variants.slice().forEach(v => (computedRaw[v] = this.props[v]));
    this.computed = JSON.stringify(computedRaw);
    return this.computed;
  }
}
