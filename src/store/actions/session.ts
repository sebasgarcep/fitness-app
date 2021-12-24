import { LoginAction, LogoutAction, Session } from '../../types';
import { withDispatch } from './utils';

export const useLogin = withDispatch((session: Session): LoginAction => ({
    type: 'LOGIN',
    session,
}));

export const useLogout = withDispatch((): LogoutAction => ({
    type: 'LOGOUT',
}));