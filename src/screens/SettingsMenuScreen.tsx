import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { View } from '../components/Themed';
import { SettingsTabParamList } from '../types';

export default function SettingsMenuScreen({
    navigation,
}: StackScreenProps<SettingsTabParamList, 'SettingsMenuScreen'>) {
    return (
        <View style={styles.container}>
            <List.Item
                title="Exercise Plan"
                description="Plan the elements of your routine"
                onPress={() => navigation.push("ExercisePlanScreen")}
                left={props => <List.Icon {...props} icon="dumbbell" />}
            />
            <List.Item
                title="Meal Plan"
                description="Choose the dishes you want to eat"
                onPress={() => {}}
                left={props => <List.Icon {...props} icon="food-variant" />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
