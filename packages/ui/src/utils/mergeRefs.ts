import type { Ref } from 'react';

type PossibleRef<T> = Ref<T> | null | undefined;

export function mergeRefs<T>(...refs: PossibleRef<T>[]): Ref<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    }
  };
}
