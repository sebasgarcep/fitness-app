import { Action, MealState } from "../../types";

const initialState: MealState = {
    plan: [],
};

export default function meals(state: MealState = initialState, action: Action) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}