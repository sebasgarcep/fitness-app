import { CreateExerciseAction, Exercise } from "../../types"
import { withDispatch } from "./utils"

export const useCreateExercise = withDispatch((exercise: Exercise): CreateExerciseAction => ({
    type: 'CREATE_EXERCISE',
    data: exercise,
}));