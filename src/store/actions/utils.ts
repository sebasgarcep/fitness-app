import { useDispatch } from 'react-redux';

export function withDispatch<T extends (...args: any[]) => any>(callback: T): () => (...funcArgs: Parameters<T>) => ReturnType<T> {
    return () => {
        const dispatch = useDispatch();
        return (...args: Parameters<T>) => {
            return dispatch(callback(...args));   
        };
    };
}