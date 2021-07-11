import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Caption, Card, Headline, Paragraph, Subheading, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { View } from '../components/Themed';
import { exerciseTargets } from '../constants';
import { useDeleteExercise } from '../store/actions';
import { Exercise, ExerciseTarget, ScreenStackParamList } from '../types';
import { groupBy } from '../utils';

type ExerciseCardProps = {
    actions?: boolean,
    data: Exercise,
};

function ExerciseCard({ actions, data }: ExerciseCardProps) {
    const navigation = useNavigation<StackNavigationProp<ScreenStackParamList>>();
    const deleteExercise = useDeleteExercise();
    return (
        <Card elevation={5} style={styles.card}>
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
            {actions && (
                <Card.Actions style={styles.cardActions}>
                    <Button icon="pencil" onPress={() => navigation.navigate("EditExerciseScreen", { id: data.id })}>
                        Edit
                    </Button>
                    <Button icon="delete" onPress={() => deleteExercise(data.id)}>
                        Delete
                    </Button>
                </Card.Actions>
            )}
        </Card>
    );
}

type ExercisePlanByTargetProps = {
    headers?: boolean,
    actions?: boolean,
    target: ExerciseTarget,
    plan: Exercise[],
};

function ExercisePlanByTarget({ headers, actions, target, plan }: ExercisePlanByTargetProps) {
    const targetLabel = exerciseTargets.find(item => item.id === target)!.label;
    return (
        <React.Fragment>
            {headers && <Headline>{targetLabel}</Headline>}
            {plan.map(item => <ExerciseCard key={item.id} actions={actions} data={item} />)}
        </React.Fragment>
    );
}

export type ExercisePlanProps = {
    headers?: boolean,
    actions?: boolean,
    plan: Exercise[],
};

export default function ExercisePlan({ headers, actions, plan }: ExercisePlanProps) {
    const planGroupedByTarget = groupBy(plan, item => item.target);
    const planTargets = Array.from(planGroupedByTarget.keys()).sort();
    return (
        <React.Fragment>
            {planTargets.map(item => (
                <ExercisePlanByTarget
                    key={item}
                    target={item}
                    headers={headers}
                    actions={actions}
                    plan={planGroupedByTarget.get(item)!}
                />
            ))}
        </React.Fragment>
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