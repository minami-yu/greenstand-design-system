/** Converts a single token segment from kebab-case to camelCase. */
export function kebabToCamel(key: string): string {
  if (!key.includes('-')) {
    return key;
  }

  return key.replace(/-([a-z0-9])/gi, (_, char) => char.toUpperCase());
}

/** Converts a dot path of token segments to camelCase segments. */
export function camelCasePath(path: string): string {
  return path.split('.').map(kebabToCamel).join('.');
}

/** Dot path for catalog display (no `t.` / `theme.` prefix). */
export function formatTokenPath(path: string): string {
  return camelCasePath(path);
}

/** Bracket access for spacing/sizing catalogs, e.g. `space['400']`, `size['200']`. */
export function formatTokenBracketPath(path: string): string {
  const segments = camelCasePath(path).split('.');
  const [root, ...rest] = segments;

  if (!root || rest.length === 0) {
    return camelCasePath(path);
  }

  return `${root}['${rest.join('.')}']`;
}

/** Code-style access path for scale tokens, e.g. `size[200]`, `space['050']`. */
export function formatTokenAccessPath(path: string): string {
  const segments = camelCasePath(path).split('.');

  return segments.reduce((access, segment, index) => {
    if (index === 0) {
      return segment;
    }

    if (/^\d+$/.test(segment) && !/^0\d/.test(segment)) {
      return `${access}[${segment}]`;
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(segment)) {
      return `${access}.${segment}`;
    }

    return `${access}['${segment}']`;
  });
}

/** Builds dot/bracket access for compiled theme paths. */
export function formatThemeAccess(root: string, path: string): string {
  const segments = camelCasePath(path).split('.');

  return segments.reduce((access, segment, index) => {
    const needsBracket = !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(segment);

    if (index === 0) {
      return needsBracket ? `${root}['${segment}']` : `${root}.${segment}`;
    }

    return needsBracket ? `${access}['${segment}']` : `${access}.${segment}`;
  }, root);
}
