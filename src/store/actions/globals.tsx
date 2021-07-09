import { withDispatch } from './utils';

export type NoopAction = { type: 'NOOP' };
export const useNoopAction = withDispatch((): NoopAction => {
    return { type: 'NOOP' };
});