import { useSelector as useReduxSelector } from "react-redux";

import { RootState } from "../../types";

export function useSelector<T extends (state: RootState) => any>(callback: T) {
    return useReduxSelector<RootState, ReturnType<T>>(callback);
}