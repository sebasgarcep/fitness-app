import { Action, ExerciseState, ExerciseStepStatus, ExerciseTracker } from "../../types";

const initialState: ExerciseState = {
    // FIXME: Empty plan as soon as view is finished
    plan: [
        {
            id: 'exercise-1',
            name: 'Standard Push-ups',
            img: 'http://prod.static9.net.au/_/media/network/images/2018/12/14/13/19/push_up_woman_th.jpg',
            comments: '',
            target: 'push',
            reps: 10,
            rest: 60,
            sets: 1,
        },
        {
            id: 'exercise-2',
            name: 'Jumping Jacks',
            img: 'https://verv.com/wp-content/uploads/2019/08/jumping_jacks-e1564412474145-1024x494.jpg',
            comments: 'Perform at high intensity',
            target: 'cardio',
            time: 50,
            rest: 60,
            sets: 1,
        },
    ],
    // FIXME: Empty tracker as soon as view is finished, make sure it is created automatically
    tracker: {
        "2000-01-01": {
            plan: {
                "exercise-1": {
                    id: 'exercise-1',
                    name: 'Standard Push-ups',
                    img: 'http://prod.static9.net.au/_/media/network/images/2018/12/14/13/19/push_up_woman_th.jpg',
                    comments: '',
                    target: 'push',
                    reps: 10,
                    rest: 60,
                    sets: 1,
                },
                "exercise-2": {
                    id: 'exercise-2',
                    name: 'Jumping Jacks',
                    img: 'https://verv.com/wp-content/uploads/2019/08/jumping_jacks-e1564412474145-1024x494.jpg',
                    comments: 'Perform at high intensity',
                    target: 'cardio',
                    time: 50,
                    rest: 60,
                    sets: 1,
                },
            },
            steps: [
                { id: "step-1", status: "pending", type: "reps", exercise: "exercise-1", total: 10 },
                { id: "step-2", status: "pending", type: "rest", total: 60, progress: 0 },
                { id: "step-3", status: "pending", type: "time", exercise: "exercise-2", total: 50, progress: 0 },
                { id: "step-4", status: "pending", type: "rest", total: 60, progress: 0 },
            ],
        },
    },
};

function updateTrackerStepStatus(prevTracker: ExerciseTracker, position: number, status: ExerciseStepStatus): ExerciseTracker {
    const tracker = { ...prevTracker };
    tracker.steps = [...tracker.steps];
    tracker.steps[position] = { ...tracker.steps[position], status };
    return tracker;
}

function updateTrackerStepProgress(prevTracker: ExerciseTracker, position: number, progress: number): ExerciseTracker {
    const tracker = { ...prevTracker };
    tracker.steps = [...tracker.steps];
    if (tracker.steps[position].type === "reps") { return tracker; }
    tracker.steps[position] = { ...tracker.steps[position], progress } as any;
    return tracker;
}

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
        case 'BEGIN_EXERCISE_TRACKER': {
            let tracker = state.tracker[action.id];
            if (
                !tracker ||
                tracker.steps.length <= 0 ||
                tracker.steps[0].status !== "pending"
            ) {
                return state;
            }
            tracker = updateTrackerStepStatus(tracker, 0, "progress");
            return {
                ...state,
                tracker: {
                    ...state.tracker,
                    [action.id]: tracker,
                },
            };
        }
        case 'COMPLETE_EXERCISE_TRACKER_STEP': {
            let tracker = state.tracker[action.id];
            if (!tracker) { return state; }
            const position = tracker.steps.findIndex(item => item.status === "progress");
            if (position === -1) { return state; }
            tracker = updateTrackerStepStatus(tracker, position, "completed");
            if (tracker.steps.length > position + 1) {
                tracker = updateTrackerStepStatus(tracker, position + 1, "progress");
            }
            return {
                ...state,
                tracker: {
                    ...state.tracker,
                    [action.id]: tracker,
                },
            };
        }
        case 'SKIP_EXERCISE_TRACKER_STEP': {
            let tracker = state.tracker[action.id];
            if (!tracker) { return state; }
            const position = tracker.steps.findIndex(item => item.status === "progress");
            if (position === -1) { return state; }
            tracker = updateTrackerStepStatus(tracker, position, "skipped");
            if (tracker.steps.length > position + 1) {
                tracker = updateTrackerStepStatus(tracker, position + 1, "progress");
            }
            return {
                ...state,
                tracker: {
                    ...state.tracker,
                    [action.id]: tracker,
                },
            };
        }
        case 'PROGRESS_EXERCISE_TRACKER_STEP': {
            let tracker = state.tracker[action.id];
            if (!tracker) { return state; }
            const position = tracker.steps.findIndex(item => item.status === "progress");
            if (position === -1) { return state; }
            tracker = updateTrackerStepProgress(tracker, position, action.progress);
            return {
                ...state,
                tracker: {
                    ...state.tracker,
                    [action.id]: tracker,
                },
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