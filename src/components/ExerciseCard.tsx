import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Caption, Card, Paragraph, Subheading, Title } from 'react-native-paper';

import { View } from '../components/Themed';
import { useDeleteExercise } from '../store/actions';
import { Exercise, ScreenStackParamList } from '../types';

export type ExerciseCardProps = {
    actions?: boolean,
    exercise: Exercise,
};

export default function ExerciseCard({ actions, exercise }: ExerciseCardProps) {
    const navigation = useNavigation<StackNavigationProp<ScreenStackParamList>>();
    const deleteExercise = useDeleteExercise();
    return (
        <Card elevation={5} style={styles.card}>
            <Card.Cover source={{ uri: exercise.img }} />
            <Card.Content>
                <View style={{ marginVertical: 20 }}>
                    <Title>{exercise.name}</Title>
                    {!!exercise.comments && (
                        <Paragraph>{exercise.comments}</Paragraph>
                    )}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Caption>Sets</Caption>
                        <Subheading>{exercise.sets}</Subheading>
                    </View>
                    {!!exercise.reps && (
                        <View style={{ flex: 1 }}>
                            <Caption>Reps</Caption>
                            <Subheading>{exercise.reps}</Subheading>
                        </View>
                    )}
                    {!!exercise.time && (
                        <View style={{ flex: 1 }}>
                            <Caption>Time</Caption>
                            <Subheading>{exercise.time}s</Subheading>
                        </View>
                    )}
                    <View style={{ flex: 1 }}>
                        <Caption>Rest</Caption>
                        <Subheading>{exercise.rest}s</Subheading>
                    </View>
                </View>
            </Card.Content>
            {actions && (
                <Card.Actions style={styles.cardActions}>
                    <Button icon="pencil" onPress={() => navigation.navigate("EditExerciseScreen", { id: exercise.id })}>
                        Edit
                    </Button>
                    <Button icon="delete" onPress={() => deleteExercise(exercise.id)}>
                        Delete
                    </Button>
                </Card.Actions>
            )}
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
    },
    cardActions: {
        justifyContent: 'space-between',
    },
});