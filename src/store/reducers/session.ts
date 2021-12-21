import { Action, SessionState } from "../../types";

const initialState: SessionState = {
    session: null,
};

export default function meals(state: SessionState = initialState, action: Action) {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                session: action.session,
            };
        }
        default: {
            return state;
        }
    }
}