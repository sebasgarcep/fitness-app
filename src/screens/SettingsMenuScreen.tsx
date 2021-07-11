import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { List } from 'react-native-paper';

import Container from '../components/Container';
import { ScreenStackParamList } from '../types';

export default function SettingsMenuScreen({
    navigation,
}: StackScreenProps<ScreenStackParamList, 'SettingsMenuScreen'>) {
    return (
        <Container>
            <List.Item
                title="Exercise Plan"
                description="Plan the elements of your routine"
                onPress={() => navigation.navigate("ExercisePlanScreen")}
                left={props => <List.Icon {...props} icon="dumbbell" />}
            />
            <List.Item
                title="Meal Plan"
                description="Choose the dishes you want to eat"
                onPress={() => {}}
                left={props => <List.Icon {...props} icon="food-variant" />}
            />
        </Container>
    );
}