/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ExerciseTabScreen from '../screens/ExerciseTabScreen';
import MealTabScreen from '../screens/MealTabScreen';
import SettingsTabScreen from '../screens/SettingsTabScreen';
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
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="MealTab"
            component={MealTabNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="SettingsTab"
            component={SettingsTabNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
            }}
        />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
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
            options={{ headerTitle: 'Exercise Tab Title' }}
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
            options={{ headerTitle: 'Meal Tab Title' }}
        />
    </MealTabStack.Navigator>
  );
}


const SettingsTabStack = createStackNavigator<SettingsTabParamList>();

function SettingsTabNavigator() {
  return (
    <SettingsTabStack.Navigator>
        <SettingsTabStack.Screen
            name="SettingsTabScreen"
            component={SettingsTabScreen}
            options={{ headerTitle: 'Settings Tab Title' }}
        />
    </SettingsTabStack.Navigator>
  );
}
