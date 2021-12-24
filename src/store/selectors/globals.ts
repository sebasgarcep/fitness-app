import { useSelector } from "./utils";

export function useRandomSeed() {
    return useSelector(state => state.globals.randomSeed);
}

export function useGlobalTheme() {
    return useSelector(state => state.globals.theme);
}