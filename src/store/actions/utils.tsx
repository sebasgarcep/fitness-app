import { useDispatch } from 'react-redux';

export function withDispatch<T extends (...args: any[]) => any>(callback: T): (...funcArgs: Parameters<T>) => ReturnType<T> {
    return (...args: Parameters<T>) => {
        const dispatch = useDispatch();
        return dispatch(callback(...args));
    };
}