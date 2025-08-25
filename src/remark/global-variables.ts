// Code inspired by: https://github.com/rhysd/remark-emoji/blob/master/index.ts

import { findAndReplace, type Find, type Replace } from 'mdast-util-find-and-replace';
import type { Root, Nodes, Text } from 'mdast';

const RE_KEYWORD = /@[a-z._]+@/g;

/**
 * Configuration of remark-emoji plugin.
 */
export interface GlobalVariablesOptions {
  /**
   * The global variable tree that will be used to lookup and replace tags.
   *
   * @defaultValue {}
   */
  vars?: object;
  /**
   * The HTML element to use when replacing tags.
   *
   * @defaultValue 'span'
   */
  element?: string;
}

const DEFAULT_SETTINGS: GlobalVariablesOptions = {
  vars: {},
  element: 'span'
};

const plugin: Plugin<[(GlobalVariablesOptions | null | undefined)?], Root> = options => {
  const settings: GlobalVariablesOptions = Object.assign({}, DEFAULT_SETTINGS, options);

  function lookupVar(keyword: string, vars: object): { leaf: object; value: string | undefined } {
    if (keyword == null) {
      return { leaf: {}, value: '<NULL-KEYWORD>' };
    }
    const keySegments = keyword.trim().replaceAll('@', '').split('.');
    let cursor = vars;
    let prevCursor = null;
    for (const segment of keySegments) {
      if (cursor == null) {
        break;
      }
      prevCursor = cursor;
      cursor = cursor[segment];
    }
    return { leaf: prevCursor, value: cursor == null ? undefined : String(cursor) };
  }

  function getValueWithAlternativesFromLookup(keyword: string) {
    let lastKeyOfKeyword: string[] | string = keyword.split('.');
    lastKeyOfKeyword = lastKeyOfKeyword[lastKeyOfKeyword.length - 1];
    const props = { keyword };
    const lookup = lookupVar(keyword, settings.vars);
    for (const [key, value] of Object.entries(lookup.leaf)) {
      const parts = key.split('$');
      if (parts?.length < 2) {
        continue;
      }
      if (parts[0] != lastKeyOfKeyword) {
        continue;
      }
      props[parts[1]] = value;
    }
    return { value: lookup.value, alternatives: props };
  }

  function makeHtmlElement(element: string, content: string, props?: object): Text {
    // Creating HTML node in Markdown node is undocumented.
    // https://github.com/syntax-tree/mdast-util-math/blob/e70bb824dc70f5423324b31b0b68581cf6698fe8/index.js#L44-L55
    return {
      type: 'text',
      value: content,
      data: {
        hName: element,
        hProperties: props,
        hChildren: [{ type: 'text', value: content }],
      },
    };
  }

  function replaceGlobalVariables(match: string): string | false | Text {
    const keyword = match.slice(1, -1);
    const lookupData = getValueWithAlternativesFromLookup(keyword);
    return makeHtmlElement(settings.element,  lookupData.value, lookupData.alternatives);
  }

  const replacers: [Find, Replace][] = [[RE_KEYWORD, replaceGlobalVariables]];

  function transformer(tree: Nodes): void {
    findAndReplace(tree, replacers);
  }

  return transformer;
};

export default plugin;