import { catchError, map, Observable, of, startWith } from 'rxjs';

export type AsyncData<D> =
  | { state: 'loading' }
  | { state: 'loaded'; data: D }
  | { state: 'error'; err: unknown };

export const toAsyncData = <D>(
  source$: Observable<D>
): Observable<AsyncData<D>> =>
  source$.pipe(
    map((data) => ({ state: 'loaded' as const, data })),
    catchError((err) => of({ state: 'error' as const, err: err as unknown })),
    startWith({ state: 'loading' as const })
  );
