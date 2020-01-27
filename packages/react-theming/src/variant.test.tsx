import React from 'react';

import { _composeFactory, _tokensFromOptions } from './compose';
import { ITheme } from './theme.types';
import { Variant } from './variant';

const compose = _composeFactory(() => makeBlankTheme());

const reifyTheme = (partial: Partial<ITheme>): ITheme => {
  const result = { components: {}, ...partial };

  return result as ITheme;
};

const makeBlankTheme = (): ITheme => {
  return reifyTheme({});
};

const baseComponent = () => {
  // In a function so that side effects from compose don't affect the next run
  const c: React.FunctionComponent<{}> = (props: {}) => {
    return <div />;
  };
  return c;
};

describe('compose', () => {
  describe('variants', () => {
    describe('tokens', () => {
      it('does not resolve tokens when variant not rendered', () => {
        const myTokens = jest.fn();
        const component = compose(baseComponent(), {
          variants: { test: Variant.boolean(myTokens) },
        });
        (component as any)({ test: false });
        expect(myTokens).not.toHaveBeenCalled();
      });

      it.skip('resolves tokens', () => {
        const myTokens = { test: () => jest.fn() };
        const component = compose(baseComponent(), {
          variants: { test: Variant.boolean(myTokens) },
        });
        (component as any)({ test: true });
        expect(myTokens).toHaveBeenCalled();
      });

      it.skip('renders styles with token values', () => {
        let called = false;
        const myStyles = (tokens: any) => {
          expect(tokens).toEqual({ foo: 'bar' });
          called = true;
          return {};
        };
        const myVariantTokens = {
          foo: () => 'bar',
        };
        const component = compose(baseComponent(), {
          styles: myStyles,
          tokens: {
            foo: () => 'foo',
          },
          variants: { test: Variant.boolean(myVariantTokens) },
        });
        (component as any)({ test: true });
        expect(called).toBeTruthy();
      });
    });

    describe('_tokensFromOptions', () => {
      it('returns all tokens from options', () => {
        expect(_tokensFromOptions([{ tokens: { a: 'b' } }, { tokens: { c: 'd' } }], {})).toEqual({
          a: 'b',
          c: 'd',
        });
      });

      it('does not return tokens from unused props', () => {
        const options = [{ variants: { a: Variant.boolean({ x: 'x' }) } }];
        expect(_tokensFromOptions(options, { x: false })).toEqual({});
      });

      it('returns options from used props', () => {
        const options = [{ variants: { a: Variant.boolean({ x: 'x' }) } }];
        expect(_tokensFromOptions(options, { a: true })).toEqual({ x: 'x' });
      });

      it('prefers variant tokens over plain tokens', () => {
        const options = [{ tokens: { x: 'y' }, variants: { a: Variant.boolean({ x: 'x' }) } }];
        expect(_tokensFromOptions(options, { a: true })).toEqual({ x: 'x' });
      });

      it('prefers variant tokens from earlier compositions over plain tokens from later composition', () => {
        const options = [{ variants: { a: Variant.boolean({ x: 'x' }) } }, { tokens: { x: 'y' } }];
        expect(_tokensFromOptions(options, { a: true })).toEqual({ x: 'x' });
      });
    });
  });
});
