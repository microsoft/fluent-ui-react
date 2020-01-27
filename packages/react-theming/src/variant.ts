import { TokenDictShorthand } from './resolveTokens';

type TokenSet = { [tokenValue: string]: TokenDictShorthand };

export class Variant {
  public tokenSets: TokenSet = {};

  /**
   * `value` returns the tokens that should be evaluated for the render pass of the component
   *
   * @param props props used to render component
   */
  tokens(prop: any): any {
    return this.tokenSets[JSON.stringify(prop)] || {};
  }

  static boolean(tokens: TokenDictShorthand) {
    const result = new Variant();
    result.tokenSets[JSON.stringify(false)] = {};
    result.tokenSets[JSON.stringify(true)] = tokens;
    return result;
  }

  static identity(): Variant {
    return new Variant();
  }
}
