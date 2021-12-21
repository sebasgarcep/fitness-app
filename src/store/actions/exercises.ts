import {
    BeginExerciseTrackerAction,
    CompleteExerciseTrackerStepAction,
    CreateExerciseAction,
    DeleteExerciseAction,
    EditExerciseAction,
    Exercise,
    ProgressExerciseTrackerStepAction,
    SkipExerciseTrackerStepAction,
} from '../../types';
import { toDateString } from '../../utils';
import { withDispatch } from './utils';

export const useCreateExercise = withDispatch((exercise: Exercise): CreateExerciseAction => ({
    type: 'CREATE_EXERCISE',
    data: exercise,
}));

export const useEditExercise = withDispatch((exercise: Exercise): EditExerciseAction => ({
    type: 'EDIT_EXERCISE',
    data: exercise,
}));

export const useDeleteExercise = withDispatch((id: string): DeleteExerciseAction => ({
    type: 'DELETE_EXERCISE',
    id,
}));

export const useBeginExerciseTracker = withDispatch((date: Date): BeginExerciseTrackerAction => ({
    type: 'BEGIN_EXERCISE_TRACKER',
    id: toDateString(date),
}));

export const useCompleteExerciseTrackerStep = withDispatch((date: Date): CompleteExerciseTrackerStepAction => ({
    type: 'COMPLETE_EXERCISE_TRACKER_STEP',
    id: toDateString(date),
}));

export const useSkipExerciseTrackerStep = withDispatch((date: Date): SkipExerciseTrackerStepAction => ({
    type: 'SKIP_EXERCISE_TRACKER_STEP',
    id: toDateString(date),
}));

export const useProgressExerciseTrackerStep = withDispatch((date: Date, progress: number): ProgressExerciseTrackerStepAction => ({
    type: 'PROGRESS_EXERCISE_TRACKER_STEP',
    id: toDateString(date),
    progress,
}));