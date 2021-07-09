import { Action } from "../../types";

export type MealState = {
    types: Array<{
        id: string,
        name: string,
        img: string,
    }>,
    plan: Array<{
        id: string,
        type: string,
        rounds: number,
        reps?: number,
        time?: number,
    }>,
};

const initialState: MealState = {
    types: [],
    plan: [],
};

export default function meals(state: MealState = initialState, action: Action) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}