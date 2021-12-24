import { Action, SessionState } from "../../types";

const initialState: SessionState = {
    session: null,
};

export default function session(state: SessionState = initialState, action: Action) {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                session: action.session,
            };
        }
        case 'LOGOUT': {
            return initialState;
        }
        default: {
            return state;
        }
    }
}