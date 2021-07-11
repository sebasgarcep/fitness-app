import { TabActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import random from 'random';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Headline } from 'react-native-paper';

import Container from '../components/Container';
import ExerciseCard from '../components/ExerciseCard';
import IncompleteExercisePlanBanner from '../components/IncompleteExercisePlanBanner';
import { View } from '../components/Themed';
import { exerciseTargets } from '../constants';
import { useExercisePlan, useRandomSeed } from '../store/selectors';
import { ScreenStackParamList } from '../types';
import { groupBy } from '../utils';

function EmptyExercisePlan() {
    const navigation = useNavigation<StackNavigationProp<ScreenStackParamList, 'DailyExerciseScreen'>>();
    return (
        <View style={styles.containerEmptyState}>
            <Avatar.Icon
                icon="weight-lifter"
                size={90}
            />
            <Headline>
                Your Exercise Plan is Empty
            </Headline>
            <Button onPress={() => navigation.dispatch(TabActions.jumpTo("SettingsTab"))}>
                Go to Settings
            </Button>
        </View>
    );
}

function getDateAsString(date: Date) {
    return date.toISOString().slice(0, 10);
}

function useDailyExercisePlan() {
    const plan = useExercisePlan();
    const planByTarget = groupBy(plan, item => item.target);
    const seed = useRandomSeed();
    const date = getDateAsString(new Date());
    const rng = random.clone(`${seed}/${date}`);
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

export default function DailyExerciseScreen() {
    const dailyExercisePlan = useDailyExercisePlan();
    return (
        <Container>
            <IncompleteExercisePlanBanner />
            {dailyExercisePlan.length > 0 ? (
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Headline style={styles.headline}>Today's Exercise Plan</Headline>
                    {dailyExercisePlan.map(exercise => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </ScrollView>
            ) : (
                <EmptyExercisePlan />
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    containerEmptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        padding: 20,
    },
    headline: {
        marginBottom: 20,
    },
});
