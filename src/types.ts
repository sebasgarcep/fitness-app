export type ExerciseTarget = 'cardio' | 'quads' | 'glutes' | 'push' | 'pull' | 'core';

export type Exercise = {
    id: string,
    target: ExerciseTarget,
    name: string,
    img: string,
    sets: number,
    reps?: number,
    time?: number,
    rest: number,
    comments: string,
};

export type ExerciseStepStatus = 'pending' | 'progress' | 'skipped' | 'completed';

export type ExerciseStep =
    | { id: string, status: ExerciseStepStatus, type: 'time', exercise: string, total: number, progress: number }
    | { id: string, status: ExerciseStepStatus, type: 'reps', exercise: string, total: number }
    | { id: string, status: ExerciseStepStatus, type: 'rest', total: number, progress: number }
;

export type ExerciseTracker = {
    plan: Record<string, Exercise>,
    steps: ExerciseStep[],
};

/**
 * App State
 */

export type ExerciseState = {
    plan: Exercise[],
    tracker: Record<string, ExerciseTracker>,
};

export type GlobalState = {
    randomSeed: string,
    theme: null | 'light' | 'dark',
};

export type RootState = {
    exercises: ExerciseState,
    globals: GlobalState,
};

/**
 * Actions
 */

export type CreateExerciseAction = {
    type: 'CREATE_EXERCISE',
    data: Exercise,
};

export type EditExerciseAction = {
    type: 'EDIT_EXERCISE',
    data: Exercise,
};

export type DeleteExerciseAction = {
    type: 'DELETE_EXERCISE',
    id: string,
};

export type BeginExerciseTrackerAction = {
    type: 'BEGIN_EXERCISE_TRACKER',
    id: string,
};

export type CompleteExerciseTrackerStepAction = {
    type: 'COMPLETE_EXERCISE_TRACKER_STEP',
    id: string,
};

export type SkipExerciseTrackerStepAction = {
    type: 'SKIP_EXERCISE_TRACKER_STEP',
    id: string,
};

export type ProgressExerciseTrackerStepAction = {
    type: 'PROGRESS_EXERCISE_TRACKER_STEP',
    id: string,
    progress: number,
};

export type SetThemeAction = {
    type: 'SET_THEME_ACTION',
    theme: null | 'light' | 'dark',
};

export type Action =
    | CreateExerciseAction
    | EditExerciseAction
    | DeleteExerciseAction
    | BeginExerciseTrackerAction
    | CompleteExerciseTrackerStepAction
    | SkipExerciseTrackerStepAction
    | ProgressExerciseTrackerStepAction
    | SetThemeAction
;

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
    Root: undefined,
    NotFound: undefined,
};

export type BottomTabParamList = {
    ExerciseTab: undefined,
    SettingsTab: undefined,
};

export type ScreenStackParamList = {
    DailyExerciseScreen: undefined,
    ExerciseTrackerScreen: undefined,
    SettingsMenuScreen: undefined,
    ExercisePlanScreen: undefined,
    CreateExerciseScreen: undefined,
    EditExerciseScreen: { id: string },
};