import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Caption, Card, FAB, Headline, Paragraph, Subheading, Title } from 'react-native-paper';

import { View } from '../components/Themed';
import { exerciseTargets } from '../constants';
import { useDeleteExercise } from '../store/actions';
import { useExercisePlan } from '../store/selectors';
import { Exercise, ExerciseTarget, SettingsTabParamList } from '../types';
import { groupBy } from '../utils';

type ExerciseCardProps = {
    data: Exercise,
};

function ExerciseCard({ data }: ExerciseCardProps) {
    const navigation = useNavigation<StackNavigationProp<SettingsTabParamList, 'ExercisePlanScreen'>>();
    const deleteExercise = useDeleteExercise();
    return (
        <Card
            elevation={5}
            style={styles.card}
        >
            <Card.Cover source={{ uri: data.img }} />
            <Card.Content>
                <View style={{ marginVertical: 20 }}>
                    <Title>{data.name}</Title>
                    {!!data.comments && (
                        <Paragraph>{data.comments}</Paragraph>
                    )}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Caption>Sets</Caption>
                        <Subheading>{data.sets}</Subheading>
                    </View>
                    {!!data.reps && (
                        <View style={{ flex: 1 }}>
                            <Caption>Reps</Caption>
                            <Subheading>{data.reps}</Subheading>
                        </View>
                    )}
                    {!!data.time && (
                        <View style={{ flex: 1 }}>
                            <Caption>Time</Caption>
                            <Subheading>{data.time}s</Subheading>
                        </View>
                    )}
                    <View style={{ flex: 1 }}>
                        <Caption>Rest</Caption>
                        <Subheading>{data.rest}s</Subheading>
                    </View>
                </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
                <Button icon="pencil" onPress={() => navigation.navigate("EditExerciseScreen", { id: data.id })}>
                    Edit
                </Button>
                <Button icon="delete" onPress={() => deleteExercise(data.id)}>
                    Delete
                </Button>
            </Card.Actions>
        </Card>
    );
}

type ExercisePlanByTargetProps = {
    target: ExerciseTarget,
    plan: Exercise[],
};

function ExercisePlanByTarget({ target, plan }: ExercisePlanByTargetProps) {
    const targetLabel = exerciseTargets.find(item => item.id === target)!.label;
    return (
        <React.Fragment>
            <Headline>{targetLabel}</Headline>
            {plan.map(item => <ExerciseCard key={item.id} data={item} />)}
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
}: StackScreenProps<SettingsTabParamList, 'ExercisePlanScreen'>) {
    const exercisePlan = useExercisePlan();
    const exercisePlanGroupedByTarget = groupBy<Exercise, ExerciseTarget>(exercisePlan, item => item.target);
    const exerciseTargets = Array.from(exercisePlanGroupedByTarget.keys()).sort();

    const toCreateExercise = () => {
        navigation.navigate("CreateExerciseScreen")
    };

    return (
        <View style={styles.container}>
            {exerciseTargets.length > 0 ? (
                <ScrollView contentContainerStyle={styles.scroll}>
                    {exerciseTargets.map(item => (
                        <ExercisePlanByTarget
                            key={item}
                            target={item}
                            plan={exercisePlanGroupedByTarget.get(item)!}
                        />
                    ))}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerEmptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        padding: 20,
        paddingBottom: 50,
    },
    card: {
        marginBottom: 20,
    },
    cardActions: {
        justifyContent: 'space-between',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
