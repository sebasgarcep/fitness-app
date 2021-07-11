import { TabActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Headline } from 'react-native-paper';
import IncompleteExercisePlanBanner from '../components/IncompleteExercisePlanBanner';

import { View } from '../components/Themed';
import { useExercisePlan } from '../store/selectors';
import { ExerciseTabParamList } from '../types';

function EmptyExercisePlan() {
    const navigation = useNavigation<StackNavigationProp<ExerciseTabParamList, 'ExerciseTabScreen'>>();
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

export default function ExerciseTabScreen() {
    const exercisePlan = useExercisePlan();
    return (
        <View style={styles.container}>
            <IncompleteExercisePlanBanner />
            {exercisePlan.length > 0 ? (
                null
            ) : (
                <EmptyExercisePlan />
            )}
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
});
