import { Action, ExerciseState } from "../../types";

const initialState: ExerciseState = {
    plan: [
        // FIXME: Remove this mock data once persistence is implemented
        {
            id: 'exercise-1',
            type: 'glutes',
            name: 'Forward Lunges w/ Dumbbells',
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.R9_KDThk0hu8M4dnn3TlTwAAAA%26pid%3DApi&f=1',
            rounds: 3,
            reps: 20,
            comments: '10lbs Dumbbells',
        },
        {
            id: 'exercise-2',
            type: 'core',
            name: 'Standard Plank',
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qLEkzaH-zwxVTpDg3vFJ4QAAAA%26pid%3DApi&f=1',
            rounds: 3,
            time: 45,
            comments: '',
        },
    ],
};

export default function exercises(state: ExerciseState = initialState, action: Action) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}