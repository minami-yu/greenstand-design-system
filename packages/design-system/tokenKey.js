/** Converts a single token segment from kebab-case to camelCase. */
export function kebabToCamel(key) {
  if (!key.includes('-')) {
    return key;
  }

  return key.replace(/-([a-z0-9])/gi, (_, char) => char.toUpperCase());
}

/** Recursively camelCases object keys in resolved theme output. */
export function camelCaseKeys(node) {
  if (Array.isArray(node)) {
    return node.map(camelCaseKeys);
  }

  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [kebabToCamel(key), camelCaseKeys(value)])
    );
  }

  return node;
}

/** Converts a dot path of token segments to camelCase segments. */
export function camelCasePath(path) {
  return path.split('.').map(kebabToCamel).join('.');
}
