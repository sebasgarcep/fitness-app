/**
 * App State
 */

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

export type ExerciseState = {
    plan: Exercise[],
};

export type GlobalState = {
    randomSeed: string,
};

export type MealType = 'breakfast' | 'lunch' | 'dinner';

export type Meal = {
    id: string,
    type: MealType,
    name: string,
    img: string,
    rounds: number,
    reps?: number,
    time?: number,
};

export type MealState = {
    plan: Meal[],
};

export type RootState = {
    exercises: ExerciseState,
    globals: GlobalState,
    meals: MealState,
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

export type Action =
    | CreateExerciseAction
    | EditExerciseAction
    | DeleteExerciseAction
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

export type ScreenStackParamList = {
    ExerciseTabScreen: undefined,
    MealTabScreen: undefined,
    SettingsMenuScreen: undefined,
    ExercisePlanScreen: undefined,
    CreateExerciseScreen: undefined,
    EditExerciseScreen: { id: string },
};
