import { Action } from "../actions";

export type ExerciseState = {
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

const initialState: ExerciseState = {
    types: [],
    plan: [],
};

export default function exercises(state: ExerciseState = initialState, action: Action) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}