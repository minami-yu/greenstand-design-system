export type FlatToken = {
  path: string;
  type?: string;
  rawValue: unknown;
  description?: string;
};

export function flattenDtcgTokens(
  node: Record<string, unknown>,
  prefix = ''
): FlatToken[] {
  const results: FlatToken[] = [];

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;

    const path = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && '$value' in value) {
      const token = value as Record<string, unknown>;
      results.push({
        path,
        type: token.$type as string | undefined,
        rawValue: token.$value,
        description: token.$description as string | undefined
      });
      continue;
    }

    if (value && typeof value === 'object') {
      results.push(...flattenDtcgTokens(value as Record<string, unknown>, path));
    }
  }

  return results;
}

export function getByPath(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, source);
}
