import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Exercise, SettingsTabParamList } from '../types';
import ExerciseForm from '../components/ExerciseForm';
import { useCreateExercise } from '../store/actions';

export default function CreateExerciseScreen({
    navigation,
}: StackScreenProps<SettingsTabParamList, 'CreateExerciseScreen'>) {
    const createExercise = useCreateExercise();

    const onSubmit = (data: Exercise) => {
        createExercise(data);
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ExerciseForm onSubmit={onSubmit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        marginBottom: 20,
    },
});
