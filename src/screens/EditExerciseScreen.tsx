import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Exercise, ScreenStackParamList } from '../types';
import ExerciseForm from '../components/ExerciseForm';
import { useEditExercise } from '../store/actions';

export default function EditExerciseScreen({
    navigation,
    route,
}: StackScreenProps<ScreenStackParamList, 'EditExerciseScreen'>) {
    const editExercise = useEditExercise();

    const onSubmit = (data: Exercise) => {
        editExercise(data);
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ExerciseForm id={route.params.id} onSubmit={onSubmit} />
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
