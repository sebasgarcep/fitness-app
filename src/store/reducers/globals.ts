import { Action, GlobalState } from "../../types";

const initialState: GlobalState = {
    randomSeed: 'asdfghjkl',
    theme: null,
};

export default function globals(state: GlobalState = initialState, action: Action) {
    switch (action.type) {
        case 'SET_THEME_ACTION': {
            return {
                ...state,
                theme: action.theme,
            };
        }
        default: {
            return state;
        }
    }
}