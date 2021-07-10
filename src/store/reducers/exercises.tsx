import { Action, ExerciseState } from "../../types";

const initialState: ExerciseState = {
    plan: [],
};

export default function exercises(state: ExerciseState = initialState, action: Action) {
    switch (action.type) {
        case 'CREATE_EXERCISE': {
            return {
                ...state,
                plan: [
                    ...state.plan,
                    action.data,
                ],
            };
        }
        case 'EDIT_EXERCISE': {
            return {
                ...state,
                plan: state.plan.map(item => item.id === action.data.id ? action.data : item),
            };
        }
        case 'DELETE_EXERCISE': {
            return {
                ...state,
                plan: state.plan.filter(item => item.id !== action.id),
            };
        }
        default: {
            return state;
        }
    }
}