import { Exercise } from "../../types";
import { useSelector } from "./utils";

export function useExercisePlan(): Exercise[] {
    return useSelector(state => state.exercises.plan);
}

export function useExercise(id: string | undefined): Exercise | undefined {
    return useSelector(state => state.exercises.plan.find(item => item.id === id));
}