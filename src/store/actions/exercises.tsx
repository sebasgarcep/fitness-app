import { CreateExerciseAction, DeleteExerciseAction, EditExerciseAction, Exercise } from "../../types"
import { withDispatch } from "./utils"

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