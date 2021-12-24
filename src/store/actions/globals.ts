import { SetThemeAction } from "../../types";
import { withDispatch } from "./utils";

export const useSetTheme = withDispatch((theme: null | 'light' | 'dark'): SetThemeAction => ({
    type: 'SET_THEME_ACTION',
    theme,
}));