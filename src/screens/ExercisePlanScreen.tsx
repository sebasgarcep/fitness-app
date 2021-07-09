import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';

import { View } from '../components/Themed';
import { useExercisePlan } from '../store/selectors';
import { SettingsTabParamList } from '../types';

export default function ExercisePlanScreen({
    navigation,
}: StackScreenProps<SettingsTabParamList, 'ExercisePlanScreen'>) {
    const exercisePlan = useExercisePlan();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                {exercisePlan.map(item => (
                    <Card
                        key={item.id}
                        elevation={5}
                        style={styles.card}
                    >
                        <Card.Cover source={{ uri: item.img }} />
                        <Card.Title title={item.name} subtitle={item.type} />
                        <Card.Actions style={styles.cardActions}>
                            <Button icon="delete" onPress={() => {}}>
                                Delete
                            </Button>
                        </Card.Actions>
                    </Card>
                ))}
            </ScrollView>
            <FAB
                icon="plus"
                label="Add Exercise"
                onPress={() => navigation.push("CreateExerciseScreen")}
                style={styles.fab}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        padding: 20,
        paddingBottom: 50,
    },
    card: {
        marginBottom: 20,
    },
    cardActions: {
        flexDirection: 'row-reverse',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
