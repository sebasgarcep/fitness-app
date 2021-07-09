import { Action } from "../../types";

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