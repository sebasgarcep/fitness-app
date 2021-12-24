import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Alert } from 'react-native';
import { List } from 'react-native-paper';

import Container from '../components/Container';
import { useSetTheme } from '../store/actions/globals';
import { ScreenStackParamList } from '../types';

export default function SettingsMenuScreen({
    navigation,
}: StackScreenProps<ScreenStackParamList, 'SettingsMenuScreen'>) {
    const setTheme = useSetTheme();

    const onPressSetTheme = () => {
        Alert.alert("Change theme", "Which theme do you want to set as the application theme?", [
            {
                text: "System default",
                onPress: () => setTheme(null),
            },
            {
                text: "Light mode",
                onPress: () => setTheme('light'),
            },
            {
                text: "Dark mode",
                onPress: () => setTheme('dark'),
            },
        ]);
    };

    return (
        <Container>
            <List.Item
                title="Exercise Plan"
                description="Plan the elements of your routine"
                onPress={() => navigation.navigate("ExercisePlanScreen")}
                left={props => <List.Icon {...props} icon="dumbbell" />}
            />
            <List.Item
                title="Choose Theme"
                description="Select a visual theme for the application"
                onPress={onPressSetTheme}
                left={props => <List.Icon {...props} icon="heart" />}
            />
        </Container>
    );
}