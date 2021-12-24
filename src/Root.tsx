import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReactReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReactNativePaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { persistor, store } from './store';

export default function Root() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <ReactReduxProvider store={store}>
                <PersistGate persistor={persistor}>
                    <RootWithRedux />
                </PersistGate>
            </ReactReduxProvider>
        );
    }
}

function RootWithRedux() {
    const colorScheme = useColorScheme();
    return (
        <ReactNativePaperProvider theme={colorScheme === 'dark' ?  DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        </ReactNativePaperProvider>
    );
}
