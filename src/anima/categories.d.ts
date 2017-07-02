import TimelineLine from 'gsap';

interface Timeline<T> {
  of(vars?: any): T;
  ap(): void;
  map(): void;
  fmap(): void;
  bind(): void;
}
