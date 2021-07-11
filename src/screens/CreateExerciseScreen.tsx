import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Exercise, ScreenStackParamList } from '../types';
import ExerciseForm from '../components/ExerciseForm';
import { useCreateExercise } from '../store/actions';

export default function CreateExerciseScreen({
    navigation,
}: StackScreenProps<ScreenStackParamList, 'CreateExerciseScreen'>) {
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
