import random from 'random';

import { exerciseTargets } from '../../constants';
import { Exercise, ExerciseTracker } from "../../types";
import { groupBy, toDateString } from "../../utils";
import { useRandomSeed } from "./globals";
import { useSelector } from "./utils";

export function useExercisePlan(): Exercise[] {
    return useSelector(state => state.exercises.plan);
}

export function useDailyExercisePlan(date: Date): Exercise[] {
    const plan = useExercisePlan();
    const seed = useRandomSeed();
    const planByTarget = groupBy(plan, item => item.target);
    const dateString = toDateString(date);
    const rng = random.clone(`${seed}/${dateString}`);
    return exerciseTargets
        .filter(item => planByTarget.has(item.id))
        .map(item => {
            const exercises = planByTarget.get(item.id)!;
            const index = rng.int(0, exercises.length - 1);
            const order = item.id === "cardio" ? -1 : rng.float();
            return { id: order, data: exercises[index] };
        })
        .sort((a, b) => a.id - b.id)
        .map(item => item.data);
}

export function useExerciseTracker(date: Date): ExerciseTracker | undefined {
    const dateString = toDateString(date);
    return useSelector(state => state.exercises.tracker[dateString]);
}

export function useExercise(id: string | undefined): Exercise | undefined {
    return useSelector(state => state.exercises.plan.find(item => item.id === id));
}