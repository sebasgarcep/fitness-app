import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Caption, Headline } from 'react-native-paper';

import Container from '../components/Container';
import ExerciseCard from '../components/ExerciseCard';
import IncompleteExercisePlanBanner from '../components/IncompleteExercisePlanBanner';
import { View } from '../components/Themed';
import { useExercisePlan } from '../store/selectors';
import { exerciseTargets } from '../constants';
import { Exercise, ExerciseTarget, ScreenStackParamList } from '../types';
import { groupBy } from '../utils';
import FloatingActionButton from '../components/FloatingActionButton';

type ExercisePlanByTargetProps = {
    target: ExerciseTarget,
    plan: Exercise[],
};

function ExercisePlanByTarget({ target, plan }: ExercisePlanByTargetProps) {
    const targetLabel = exerciseTargets.find(item => item.id === target)!.label;
    return (
        <React.Fragment>
            <Headline>{targetLabel}</Headline>
            {plan.map(item => <ExerciseCard key={item.id} actions exercise={item} />)}
        </React.Fragment>
    );
}

type ExercisePlanProps = {
    plan: Exercise[],
};

function ExercisePlan({ plan }: ExercisePlanProps) {
    const planGroupedByTarget = groupBy(plan, item => item.target);
    const planTargets = Array.from(planGroupedByTarget.keys()).sort();
    return (
        <React.Fragment>
            {planTargets.map(item => (
                <ExercisePlanByTarget
                    key={item}
                    target={item}
                    plan={planGroupedByTarget.get(item)!}
                />
            ))}
        </React.Fragment>
    );
}

function EmptyExercisePlan() {
    return (
        <View style={styles.containerEmptyState}>
            <Avatar.Icon
                icon="weight-lifter"
                size={90}
            />
            <Headline>
                Your Exercise Plan is Empty
            </Headline>
            <Caption>
                Press on the "Add Exercise" button
            </Caption>
        </View>
    );
}

export default function ExercisePlanScreen({
    navigation,
}: StackScreenProps<ScreenStackParamList, 'ExercisePlanScreen'>) {
    const exercisePlan = useExercisePlan();

    const toCreateExercise = () => {
        navigation.navigate("CreateExerciseScreen")
    };

    return (
        <Container>
            <IncompleteExercisePlanBanner />
            {exercisePlan.length > 0 ? (
                <ScrollView contentContainerStyle={styles.scroll}>
                    <ExercisePlan
                        plan={exercisePlan}
                    />
                </ScrollView>
            ) : (
                <EmptyExercisePlan />
            )}
            <FloatingActionButton
                icon="plus"
                label="Add Exercise"
                onPress={toCreateExercise}
            />
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
        paddingBottom: 60,
    },
});
