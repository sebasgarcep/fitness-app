/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { IconButton } from 'react-native-paper';

import colors from '../constants/colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../types';
import { ExerciseTabNavigator, MealTabNavigator, SettingsTabNavigator } from './ScreenStackNavigator';

/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    return (
        <BottomTab.Navigator
            initialRouteName="ExerciseTab"
            tabBarOptions={{ activeTintColor: colors[colorScheme].tint }}
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