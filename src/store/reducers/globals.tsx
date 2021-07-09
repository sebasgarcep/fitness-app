import { Action } from "../actions";

export type GlobalState = {
    randomSeed: string,
};

const initialState: GlobalState = {
    randomSeed: 'asdfghjkl',
};

export default function globals(state: GlobalState = initialState, action: Action) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}