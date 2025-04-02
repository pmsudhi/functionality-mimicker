
import { useMemo } from 'react';

export function useMemoizedData<T>(
  data: T[],
  processFunction?: (data: T[]) => any,
  dependencies: any[] = []
) {
  return useMemo(() => {
    if (!data || data.length === 0) return [];
    if (processFunction) return processFunction(data);
    return data;
  }, [data, ...dependencies]);
}
