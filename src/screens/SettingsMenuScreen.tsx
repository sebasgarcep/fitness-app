import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Alert } from 'react-native';
import { List } from 'react-native-paper';

import Container from '../components/Container';
import { useLogout } from '../store/actions/session';
import { RootStackParamList, ScreenStackParamList } from '../types';

export default function SettingsMenuScreen({
    navigation,
}: StackScreenProps<ScreenStackParamList, 'SettingsMenuScreen'>) {
    const logout = useLogout();

    const onPressLogout = () => {
        Alert.alert("Logout", "Do you wish to logout?", [
            {
                text: "Yes",
                onPress: () => {
                    logout();
                    const rootNavigation = navigation as any as StackNavigationProp<RootStackParamList, 'Root'>;
                    rootNavigation.replace("Login");
                },
            },
            {
                text: "No",
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
                title="Logout"
                description="Plan the elements of your routine"
                onPress={onPressLogout}
                left={props => <List.Icon {...props} icon="dumbbell" />}
            />
        </Container>
    );
}