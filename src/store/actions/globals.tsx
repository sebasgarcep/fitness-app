import { NoopAction } from '../../types';
import { withDispatch } from './utils';

export const useNoopAction = withDispatch((): NoopAction => {
    return { type: 'NOOP' };
});