import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ExerciseTabScreen from '../screens/ExerciseTabScreen';
import MealTabScreen from '../screens/MealTabScreen';
import SettingsMenuScreen from '../screens/SettingsMenuScreen';
import ExercisePlanScreen from '../screens/ExercisePlanScreen';
import CreateExerciseScreen from '../screens/CreateExerciseScreen';
import EditExerciseScreen from '../screens/EditExerciseScreen';
import { ScreenStackParamList } from '../types';

function createScreenStackNavigator(initialRouteName: keyof ScreenStackParamList) {
    const ScreenStack = createStackNavigator<ScreenStackParamList>();
     
    return function ScreenStackNavigator() {
        return (
            <ScreenStack.Navigator initialRouteName={initialRouteName}>
                <ScreenStack.Screen
                    name="ExerciseTabScreen"
                    component={ExerciseTabScreen}
                    options={{ headerTitle: 'Exercises' }}
                />
                <ScreenStack.Screen
                    name="MealTabScreen"
                    component={MealTabScreen}
                    options={{ headerTitle: 'Meals' }}
                />
                <ScreenStack.Screen
                    name="SettingsMenuScreen"
                    component={SettingsMenuScreen}
                    options={{ headerTitle: 'Settings' }}
                />
                <ScreenStack.Screen
                    name="ExercisePlanScreen"
                    component={ExercisePlanScreen}
                    options={{ headerTitle: 'Exercise Plan' }}
                />
                <ScreenStack.Screen
                    name="CreateExerciseScreen"
                    component={CreateExerciseScreen}
                    options={{ headerTitle: 'Create Exercise' }}
                />
                <ScreenStack.Screen
                    name="EditExerciseScreen"
                    component={EditExerciseScreen}
                    options={{ headerTitle: 'Edit Exercise' }}
                />
            </ScreenStack.Navigator>
        );
    }
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
export const ExerciseTabNavigator = createScreenStackNavigator("ExerciseTabScreen");
export const MealTabNavigator = createScreenStackNavigator("MealTabScreen");
export const SettingsTabNavigator = createScreenStackNavigator("SettingsMenuScreen");