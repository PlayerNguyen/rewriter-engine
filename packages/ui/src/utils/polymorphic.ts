import type { ComponentPropsWithRef, ElementType, ReactElement } from 'react';

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

export type AsProp<T extends ElementType> = {
  as?: T;
};

export type PolymorphicProps<T extends ElementType, Props = {}> = Props &
  AsProp<T> &
  Omit<ComponentPropsWithRef<T>, keyof (Props & AsProp<T>)>;

export type PolymorphicComponent<Props = {}> = <T extends ElementType = 'div'>(
  props: PolymorphicProps<T, Props> & { ref?: PolymorphicRef<T> },
) => ReactElement | null;
