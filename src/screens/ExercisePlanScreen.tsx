import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Caption, FAB, Headline } from 'react-native-paper';

import Container from '../components/Container';
import ExercisePlan from '../components/ExercisePlan';
import IncompleteExercisePlanBanner from '../components/IncompleteExercisePlanBanner';
import { View } from '../components/Themed';
import { useExercisePlan } from '../store/selectors';
import { ScreenStackParamList } from '../types';

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
                        headers
                        actions
                        plan={exercisePlan}
                    />
                </ScrollView>
            ) : (
                <EmptyExercisePlan />
            )}
            <FAB
                icon="plus"
                label="Add Exercise"
                onPress={toCreateExercise}
                style={styles.fab}
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
