/**
 * App State
 */

export type Exercise = {
    id: string,
    type: 'cardio' | 'quads' | 'glutes' | 'push' | 'pull' | 'core',
    name: string,
    img: string,
    rounds: number,
    reps?: number,
    time?: number,
    comments: string,
};

export type ExerciseState = {
    plan: Exercise[],
};

export type RootState = {
    exercises: ExerciseState,
};

/**
 * Actions
 */

export type CreateExerciseAction = {
    type: 'CREATE_EXERCISE',
    data: Exercise,
};

export type NoopAction = { type: 'NOOP' };

export type Action =
    | NoopAction
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
    MealTab: undefined,
    SettingsTab: undefined,
};

export type ExerciseTabParamList = {
    ExerciseTabScreen: undefined,
};

export type MealTabParamList = {
    MealTabScreen: undefined,
};

export type SettingsTabParamList = {
    SettingsMenuScreen: undefined,
    ExercisePlanScreen: undefined,
    CreateExerciseScreen: undefined,
};
