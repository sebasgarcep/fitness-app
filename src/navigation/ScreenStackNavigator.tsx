import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { ScreenStackParamList } from '../types';
import DailyExerciseScreen from '../screens/DailyExerciseScreen';
import SettingsMenuScreen from '../screens/SettingsMenuScreen';
import ExercisePlanScreen from '../screens/ExercisePlanScreen';
import CreateExerciseScreen from '../screens/CreateExerciseScreen';
import EditExerciseScreen from '../screens/EditExerciseScreen';
import ExerciseTrackerScreen from '../screens/ExerciseTrackerScreen';

function createScreenStackNavigator(initialRouteName: keyof ScreenStackParamList) {
    const ScreenStack = createStackNavigator<ScreenStackParamList>();
     
    return function ScreenStackNavigator() {
        return (
            <ScreenStack.Navigator initialRouteName={initialRouteName}>
                <ScreenStack.Screen
                    name="DailyExerciseScreen"
                    component={DailyExerciseScreen}
                    options={{ headerTitle: 'Exercise' }}
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
                <ScreenStack.Screen
                    name="ExerciseTrackerScreen"
                    component={ExerciseTrackerScreen}
                    options={{ headerTitle: "Exercise Tracker" }}
                />
            </ScreenStack.Navigator>
        );
    }
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
export const ExerciseTabNavigator = createScreenStackNavigator("DailyExerciseScreen");
export const SettingsTabNavigator = createScreenStackNavigator("SettingsMenuScreen");