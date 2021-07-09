/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { IconButton } from 'react-native-paper';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ExerciseTabScreen from '../screens/ExerciseTabScreen';
import MealTabScreen from '../screens/MealTabScreen';
import SettingsMenuScreen from '../screens/SettingsMenuScreen';
import ExercisePlanScreen from '../screens/ExercisePlanScreen';
import CreateExerciseScreen from '../screens/CreateExerciseScreen';
import { BottomTabParamList, ExerciseTabParamList, MealTabParamList, SettingsTabParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="ExerciseTab"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <BottomTab.Screen
                name="ExerciseTab"
                component={ExerciseTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon icon="dumbbell" color={color} />,
                    tabBarLabel: "Exercises",
                }}
            />
            <BottomTab.Screen
                name="MealTab"
                component={MealTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon icon="food-variant" color={color} />,
                    tabBarLabel: "Meals",
                }}
            />
            <BottomTab.Screen
                name="SettingsTab"
                component={SettingsTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon icon="cog" color={color} />,
                    tabBarLabel: "Settings",
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { icon: React.ComponentProps<typeof IconButton>['icon']; color: string }) {
    return <IconButton size={25} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ExerciseTabStack = createStackNavigator<ExerciseTabParamList>();

function ExerciseTabNavigator() {
    return (
        <ExerciseTabStack.Navigator>
            <ExerciseTabStack.Screen
                name="ExerciseTabScreen"
                component={ExerciseTabScreen}
                options={{ headerTitle: 'Exercises' }}
            />
        </ExerciseTabStack.Navigator>
    );
}

const MealTabStack = createStackNavigator<MealTabParamList>();

function MealTabNavigator() {
    return (
        <MealTabStack.Navigator>
            <MealTabStack.Screen
                name="MealTabScreen"
                component={MealTabScreen}
                options={{ headerTitle: 'Meals' }}
            />
        </MealTabStack.Navigator>
    );
}


const SettingsTabStack = createStackNavigator<SettingsTabParamList>();

function SettingsTabNavigator() {
    return (
        <SettingsTabStack.Navigator>
            <SettingsTabStack.Screen
                name="SettingsMenuScreen"
                component={SettingsMenuScreen}
                options={{ headerTitle: 'Settings' }}
            />
            <SettingsTabStack.Screen
                name="ExercisePlanScreen"
                component={ExercisePlanScreen}
                options={{ headerTitle: 'Exercise Plan' }}
            />
            <SettingsTabStack.Screen
                name="CreateExerciseScreen"
                component={CreateExerciseScreen}
                options={{ headerTitle: 'Create Exercise' }}
            />
        </SettingsTabStack.Navigator>
    );
}
