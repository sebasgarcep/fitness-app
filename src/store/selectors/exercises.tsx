import { useSelector } from "react-redux";

import { Exercise, RootState } from "../../types";

export function useExercisePlan(): Exercise[] {
    return useSelector<RootState, Exercise[]>(state => state.exercises.plan);
}