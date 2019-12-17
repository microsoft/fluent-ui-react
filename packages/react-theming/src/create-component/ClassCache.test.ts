import { ClassCache, VariantBasedCacheKeyStrategy } from './ClassCache';

describe('ClassCache', () => {
  it('allows access via theme and string', () => {
    const c = new ClassCache();
    const val = {};
    const theme = {};
    c.set(theme, 'foo-bar-baz', val);
    expect(c.get(theme, 'foo-bar-baz')).toBe(val);
  });

  it('allows access via theme and multiple strings', () => {
    const c = new ClassCache();
    const val = {};
    const theme = {};
    c.set(theme, 'foo-bar-baz', val);
    c.set(theme, 'foo-bar', {});
    expect(c.get(theme, 'foo-bar-baz')).toBe(val);
  });

  it('returns null if entry not found', () => {
    const c = new ClassCache();
    expect(c.get({}, '')).toBeNull();
  });

  describe('getOrSet', () => {
    it('allows for passing in of a default value', () => {
      const c = new ClassCache();
      const cacheEntry = {};
      const theme = {};
      const key = '';
      const fetchedEntry: any = c.getOrSet(theme, key, cacheEntry);
      expect(fetchedEntry).toBe(cacheEntry);
      expect(c.get(theme, key)).toBe(cacheEntry);
    });
  });

  describe('with automative cache key computation', () => {
    it('handles cache key computation', () => {
      const c = new ClassCache();
      const val = {};
      const theme = {};
      c.set(theme, new VariantBasedCacheKeyStrategy(['a', 'b', 'c'], {}).toString(), val);
      expect(c.get(theme, new VariantBasedCacheKeyStrategy(['a', 'b', 'c'], {}).toString())).toBe(
        val,
      );
    });
  });
});
