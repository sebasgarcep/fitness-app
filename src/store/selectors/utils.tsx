import { useSelector as useReduxSelector } from "react-redux";

import { RootState } from "../../types";

export const useSelector: <T extends (state: RootState) => any>(callback: T) => ReturnType<T> = useReduxSelector;