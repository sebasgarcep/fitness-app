import { Session } from '../../types';
import { useSelector } from './utils';

export function useSession(): Session | null {
    return useSelector(state => {
        const { session } = state.session;
        
        if (!session || Date.now() >= session.expiresAt) {
            return null;
        }

        return session;
    });
}