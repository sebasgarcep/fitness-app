import { LoginAction, Session } from '../../types';
import { withDispatch } from './utils';

export const useLogin = withDispatch((session: Session): LoginAction => ({
    type: 'LOGIN',
    session,
}));