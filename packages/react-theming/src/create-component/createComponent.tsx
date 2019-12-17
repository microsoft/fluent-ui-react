import * as React from 'react';
import { ProviderContext } from '../components/ThemeProvider/Provider';
import { mergeCss } from '@uifabric/merge-styles';
import { VariantBasedCacheKeyStrategy, ClassCache } from './ClassCache';

// TODO:
// 1. how do we know the slots for component?
// 2. how do we tackle enum props (not just booleans)
// 3. final decision on styles living in theme (sync with JD)
// 4. type safety (props which are variants should be typed)
// 5. props which are variants should not be spreaded on the root
// 6. merging multiple variants styles should be predictable - maybe resolved...
// 7. merging is not correct (spreading is not enough, it should be deep merge)
// 8. How would it work for composition (Menu + MenuItem)
// 9. support inline-style calculation based on a prop
// 10. how to cache the styles

/**
 * Solvable:
 * 6, 9
 *
 * Possible blockers:
 * P0: 3, 8, 10
 * P1: 4, 5, 7
 *
 * Solved:
 * 1, 2
 */

const getProps = (cssMap: any, props: any, slots: any = {}) => {
  const newProps = {
    ...props,
    slotProps: props.slotProps || {},
    slots: { ...props.slots, ...slots },
  };
  Object.keys(cssMap).forEach(slotName => {
    if (!newProps.slotProps[slotName]) {
      newProps.slotProps[slotName] = {};
    }
    newProps.slotProps[slotName].className = `${newProps.slotProps[slotName].className ||
      ''} ${cssMap[slotName] || ''}`;
  });

  return newProps;
};

export const getClassName = (
  cache: ClassCache,
  theme: any,
  componentProps: any,
  componentName: string,
  cssRenderer: (args: any) => string = mergeCss,
) => {
  const stylesAdditions: any = {};
  const variantNames: string[] = [];

  const componentStyles =
    theme &&
    theme.components &&
    theme.components[componentName] &&
    theme.components[componentName].styles
      ? theme.components[componentName].styles({
          typography: theme.typography,
          colors: theme.colors,
        })
      : {};

  const slotNames: string[] = Object.keys(componentStyles);

  if (
    theme &&
    theme.components &&
    theme.components[componentName] &&
    theme.components[componentName].variants
  ) {
    Object.keys(theme.components[componentName].variants).forEach(variantName => {
      stylesAdditions[variantName] = {};
      variantNames.push(variantName);
      Object.keys(theme.components[componentName].variants[variantName]).forEach(enumValue => {
        const variant: any = {};
        stylesAdditions[variantName][enumValue] = variant;

        Object.keys(theme.components[componentName].variants[variantName][enumValue]).forEach(
          slotName => {
            if (!slotNames.find(s => s === slotName)) {
              slotNames.push(slotName);
            }
            variant[slotName] =
              theme.components[componentName].variants[variantName][enumValue][slotName];
          },
        );
      });
    });
  }

  const mergedSlotStyles: any = {};

  slotNames.forEach(slotName => {
    mergedSlotStyles[slotName] = componentStyles[slotName] || {};
    // eslint-disable-next-line array-callback-return
    variantNames.map(v => {
      if (
        componentProps[v] !== undefined &&
        stylesAdditions[v] !== undefined &&
        stylesAdditions[v][componentProps[v]] !== undefined
      ) {
        mergedSlotStyles[slotName] = {
          ...mergedSlotStyles[slotName],
          ...stylesAdditions[v][componentProps[v]][slotName],
        };
      }
    });
  });

  const mutableCacheEntry: any = {};
  const cacheKey = new VariantBasedCacheKeyStrategy(variantNames, componentProps);
  const cacheEntry = cache.getOrSet(theme, cacheKey.toString(), mutableCacheEntry);

  if (cacheEntry !== mutableCacheEntry) {
    return cacheEntry;
  }
  slotNames.forEach(slotName => {
    mutableCacheEntry[slotName] = cssRenderer(mergedSlotStyles[slotName]);
  });
  return mutableCacheEntry;
};

export const createComponent = (
  displayName: string,
  BaseComponent: any,
  settings = { slots: {} },
) => {
  const cache = new ClassCache();
  return (props: any) => {
    const theme = (React.useContext(ProviderContext) as any)!;
    const cssMap = getClassName(cache, theme, props, displayName);
    const newProps = getProps(cssMap, props, settings.slots);
    return <BaseComponent {...newProps} />;
  };
};
