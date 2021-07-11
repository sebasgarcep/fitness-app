import { TabActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Headline } from 'react-native-paper';

import Container from '../components/Container';
import ExerciseCard from '../components/ExerciseCard';
import FloatingActionButton from '../components/FloatingActionButton';
import IncompleteExercisePlanBanner from '../components/IncompleteExercisePlanBanner';
import { View } from '../components/Themed';
import { useDailyExercisePlan } from '../store/selectors';
import { ScreenStackParamList } from '../types';

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



export default function DailyExerciseScreen({
    navigation,
}: StackScreenProps<ScreenStackParamList, 'DailyExerciseScreen'>) {
    const date = new Date("2000-01-01");
    const dailyExercisePlan = useDailyExercisePlan(date);
    return (
        <Container>
            <IncompleteExercisePlanBanner />
            {dailyExercisePlan.length > 0 ? (
                <React.Fragment>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <Headline style={styles.headline}>Today's Exercise Plan</Headline>
                        {dailyExercisePlan.map(exercise => (
                            <ExerciseCard key={exercise.id} exercise={exercise} />
                        ))}
                    </ScrollView>
                    <FloatingActionButton
                        icon="clock-outline"
                        label="Begin Exercise"
                        onPress={() => navigation.navigate("ExerciseTrackerScreen")}
                    />
                </React.Fragment>
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
        paddingBottom: 60,
    },
    headline: {
        marginBottom: 20,
    },
});
